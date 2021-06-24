<template>
  <ul>
    <!-- LINKS -->
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="{ name: link.route }"
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
            :to="{ name: 'Items-catLink', params: { parentId: cat.id } }"
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
                  v-for="subcat in cat.children"
                  :key="subcat.id"
                  :to="{
                    name: 'Items',
                    params: { parentId: subcat.parentId, catId: subcat.id },
                  }"
                  custom
                  v-slot="{ navigate, href, isActive }"
                >
                  <li>
                    <a
                      :href="href"
                      @click="navigate"
                      class="collapse-header waves-effect waves-red"
                      :class="isActive && 'active'"
                      >{{ subcat.name }}
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
import { mapActions, mapGetters } from 'vuex'
import Collapse from '@/components/Collapse.vue'

export default {
  name: 'default-sidelayout',
  components: { Collapse },
  data: () => ({
    loading: true,
    links: [
      { id: 0, title: 'Каталог', route: 'Items-link', cats: [] },
      // { id: 1, title: 'Акции', route: 'Sale' }
    ]
  }),
  computed: {
    ...mapGetters(['cats'])
  },
  async mounted() {
    await this.getCats()
    this.links.forEach(l => (l.route == 'Items-link') && (l.cats = this.cats))
    this.loading = false
  },
  methods: {
    ...mapActions(['setError', 'getCats'])
  }
}
</script>