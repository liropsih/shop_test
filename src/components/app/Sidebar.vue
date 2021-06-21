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
      <li v-if="sidelayout == 'default-sidelayout'">
        <Search class="hide-on-large-only" />
      </li>
      <li>
        <router-link
          class="collapse-header waves-effect waves-red"
          :to="{ name: 'Home' }"
          custom
          v-slot="{ navigate, href, isExactActive }"
        >
          <a @click="navigate" :href="href" :class="isExactActive && 'active'"
            >Главная</a
          >
        </router-link>
      </li>
      <li>
        <transition name="component-fade" mode="out-in">
          <component :is="sidelayout" />
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultSidelayout from '@/components/app/Sidebar/DefaultSidelayout.vue'
import AdminSidelayout from '@/components/app/Sidebar/AdminSidelayout.vue'
import Search from '@/components/Search.vue'
import $axios from '@/http'

export default {
  name: 'Sidebar',
  components: { DefaultSidelayout, AdminSidelayout, Search },
  data: () => ({
    Sidenav: {}
  }),
  computed: {
    ...mapGetters(['SidenavChangeState']),
    sidelayout() {
      return (this.$route.meta.sidelayout || 'default') + '-sidelayout'
    }
  },
  async mounted() {
    // let test = await $axios.get('/api/items', {
    //   query: {catId: '5'}
    // })
    // debugger

    this.SidenavInit(this.$refs.Sidenav)
  },
  watch: {
    SidenavChangeState() {
      this.SidenavTrigger()
    },
    isOpen(val) {
      val ? this.Sidenav.close() : this.Sidenav.open()
    }
  },
  destroyed() {
    this.Sidenav?.destroy && this.Sidenav.destroy()
  },
  methods: {
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