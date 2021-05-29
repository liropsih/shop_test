<template>
  <ul id="sideNav" class="sidenav sidenav-fixed no-autoinit" ref="sideNav">
    <li>
      <a href="#" class="p-0 sideNavClose hide-on-large-only" @click.prevent
        ><i
          class="material-icons right mr-3 hover-red"
          @click.prevent="sideNavClose()"
          >close</i
        ></a
      >
    </li>
    <li>
      <ul class="collapsible sidenav-collapsible">
        <router-link
          v-for="link in links"
          :key="link.id"
          :to="link.url"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <li
            :class="
              (link.exact ? isExactActive : isActive) && 'active' && 'open'
            "
          >
            <a
              v-if="link.cats"
              href="#"
              @click.prevent
              class="collapsible-header waves-effect waves-red"
              >{{ link.title }}
              <span class="material-icons">arrow_right</span>
            </a>
            <a
              v-else
              href="#"
              @click="navigate"
              class="collapsible-header waves-effect waves-red"
              >{{ link.title }}
            </a>
            <div class="collapsible-body">
              <!-- Каталоги -->
              <ul v-if="link.cats" class="collapsible">
                <router-link
                  v-for="cat in link.cats"
                  :key="cat.id"
                  :to="`${link.url}?${cat.id}`"
                  custom
                  v-slot="{ navigate, isActive }"
                >
                  <li :class="isActive && 'active'">
                    <a
                      v-if="cat.children"
                      href="#"
                      @click.prevent
                      class="collapsible-header waves-effect waves-red"
                      >{{ cat.name }}
                      <span class="material-icons">arrow_right</span>
                    </a>
                    <a
                      v-else
                      href="#"
                      @click="navigate"
                      class="collapsible-header waves-effect waves-red"
                      >{{ cat.name }}
                    </a>
                    <div class="collapsible-body">
                      <!-- Каталоги 2 уровня -->
                      <ul class="collapsible" v-if="cat.children">
                        <router-link
                          v-for="scat in cat.children"
                          :key="scat.id"
                          :to="`${link.url}?${cat.id}&${scat.id}`"
                          custom
                          v-slot="{ navigate, isActive }"
                        >
                          <li :class="isActive && 'active'">
                            <a
                              href="#"
                              @click="navigate"
                              class="collapsible-header waves-effect waves-red"
                              >{{ scat.name }}
                              <div class="collapsible-body"></div>
                            </a>
                          </li>
                        </router-link>
                      </ul>
                    </div>
                  </li>
                </router-link>
              </ul>
            </div>
          </li>
        </router-link>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    links: [
      { id: 0, title: 'Главная', url: '/', exact: 'true' },
      { id: 1, title: 'Каталог', url: '/items', cats: [] },
      { id: 2, title: 'Акции', url: '/sale' }
    ]
  }),
  async mounted() {
    const { cats } = await (await fetch('api/cat')).json()
    // this.cats = cats
    this.links.forEach(l => (l.url == '/items') && (l.cats = cats))
    this.$store.state.sideNav = M.Sidenav.init(this.$refs.sideNav)
    // M.Collapsible.init(document.querySelectorAll('.collapsible'))
    M.AutoInit()
  },
  methods: {
    sideNavClose() {
      this.$store.state.sideNav.close()
    }
  }
}
</script>
