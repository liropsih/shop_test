<template>
  <div>
    <ul id="Sidenav" class="sidenav sidenav-fixed no-autoinit" ref="Sidenav">
      <li>
        <a href="#" class="p-0 SidenavClose hide-on-large-only" @click.prevent
          ><i
            class="material-icons right mr-3 hover-red"
            @click.prevent="SidenavTrigger()"
            >close</i
          ></a
        >
      </li>
      <li>
        <Search class="hide-on-large-only" />
      </li>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $axios from '@/http'
import Collapse from '@/components/Collapse.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'Sidebar',
  components: { Collapse, Search },
  data: () => ({
    loading: true,
    links: [
      { id: 0, title: 'Главная', url: '/', exact: 'true' },
      { id: 1, title: 'Каталог', url: '/items', cats: [] },
      { id: 2, title: 'Акции', url: '/sale' }
    ],
    Sidenav: {}
  }),
  computed: {
    ...mapGetters(['SidenavChangeState']),
    // layout() {
    //   return (this.$route.meta.layoutSide || 'empty') + '-layout'
    // }
  },
  async mounted() {
    this.SidenavInit(this.$refs.Sidenav)
    await this.getCats()
    this.loading = false
  },
  watch: {
    SidenavChangeState() {
      this.SidenavTrigger()
    },
    isOpen(val) {
      val ? this.Sidenav.close() : this.Sidenav.open()
    }
  },
  methods: {
    async getCats() {
      try {
        const { data } = await $axios.get('/api/cat')
        this.links.forEach(l => (l.url == '/items') && (l.cats = data.cats))
      } catch (e) {
        throw e
      }
    },
    SidenavInit(el) {
      M.Sidenav.init(el)
      this.Sidenav = M.Sidenav.getInstance(el)
    },
    SidenavTrigger() {
      this.Sidenav.isOpen ? this.Sidenav.close() : this.Sidenav.open()
    }
  }
}
</script>