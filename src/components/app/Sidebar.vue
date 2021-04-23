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
      <router-link class="collapsible-header waves-effect waves-red" to="/"
        >Главная</router-link
      >
    </li>
    <li>
      <ul class="collapsible">
        <li>
          <a
            class="collapsible-header waves-effect waves-red"
            href="#"
            @click.prevent
            >Каталог<span class="material-icons">arrow_right</span></a
          >
          <div class="collapsible-body">
            <ul>
              <li v-for="cat in cats" :key="cat.id">
                <ul class="collapsible">
                  <li>
                    <router-link
                      :to="'/items?' + cat.id"
                      class="collapsible-header waves-effect waves-red"
                      >{{ cat.title
                      }}<span class="material-icons"
                        >arrow_right</span
                      ></router-link
                    >
                    <div class="collapsible-body">
                      <ul>
                        <li v-for="subcat in cat.subs" :key="subcat.id">
                          <router-link
                            :to="'/items?' + cat.id + '&' + subcat.id"
                            class="waves-effect waves-red"
                            >{{ subcat.title }}</router-link
                          >
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </li>
    <li>
      <router-link class="collapsible-header waves-effect waves-red" to="/sale">Акции</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    cats: [
      {
        id: 1, title: 'Компьютеры', subs: [
          { id: 1, title: 'Стационарные компьютеры' },
          { id: 2, title: 'Ноутбуки' },
          { id: 3, title: 'Моноблоки' },
          { id: 4, title: 'Комплектующие' }
        ]
      },
      { id: 2, title: 'Игровые приставки' },
      { id: 3, title: 'Телевизоры' },
      { id: 4, title: 'Телефоны' }
    ]
  }),
  mounted() {
    this.$store.state.sideNav = M.Sidenav.init(this.$refs.sideNav)
  },
  methods: {
    sideNavClose() {
      this.$store.state.sideNav.close()
    }
  }
}
</script>
