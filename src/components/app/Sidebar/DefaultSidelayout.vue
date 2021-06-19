<template>
  <ul>
    <!-- LINKS -->
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="link.url"
      custom
      v-slot="{ navigate, href, isActive, isExactActive }"
    >
      <li>
        <collapse
          v-if="!loading && link.cats"
          :title="link.title"
          :isActive="link.exact ? isExactActive : isActive"
        >
          <!-- CATS -->
          <router-link
            v-for="cat in link.cats"
            :key="cat.id"
            :to="`${link.url}/${cat.id}`"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <li>
              <collapse
                v-if="cat.children"
                :title="cat.name"
                :isActive="isActive"
              >
                <!-- SUBCATS -->
                <router-link
                  v-for="scat in cat.children"
                  :key="scat.id"
                  :to="`${link.url}/${cat.id}/${scat.id}`"
                  custom
                  v-slot="{ navigate, href, isActive }"
                >
                  <li>
                    <a
                      :href="href"
                      @click="navigate"
                      class="collapse-header waves-effect waves-red"
                      :class="isActive && 'active'"
                      >{{ scat.name }}
                    </a>
                  </li>
                </router-link>
              </collapse>
              <a
                v-else
                :href="href"
                @click="navigate"
                class="collapse-header waves-effect waves-red"
                :class="isActive && 'active'"
                >{{ cat.name }}
              </a>
            </li>
          </router-link>
        </collapse>
        <a
          v-else
          :href="href"
          @click="navigate"
          class="collapse-header waves-effect waves-red"
          :class="(link.exact ? isExactActive : isActive) && 'active'"
          >{{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
import $axios from '@/http'
import Collapse from '@/components/Collapse.vue'

export default {
  name: 'default-sidelayout',
  components: { Collapse },
  data: () => ({
    loading: true,
    links: [
      { id: 0, title: 'Каталог', url: '/items', cats: [] },
      { id: 1, title: 'Акции', url: '/sale' }
    ]
  }),
  async mounted() {
    await this.getCats()
    this.loading = false
  },
  methods: {
    ...mapActions(['setError']),
    async getCats() {
      try {
        const { data } = await $axios.get('/api/cat')
        this.links.forEach(l => (l.url == '/items') && (l.cats = data.cats))
      } catch (e) {
        this.setError(e)
      }
    }
  }
}
</script>