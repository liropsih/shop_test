<template>
  <div>
    <Loader v-if="loading" />
    <div class="main-layout" v-else>
      <Navbar />
      <div>
        <Sidebar />
        <main>
          <transition name="component-fade" mode="out-in">
            <router-view />
          </transition>
        </main>
      </div>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
import Footer from "@/components/app/Footer"
import messages from '@/utils/messages'

export default {
  name: "main-layout",
  components: { Navbar, Sidebar, Footer },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters(['isLoggedIn']),
    message() {
      return this.$route.query.message
    }
  },
  watch: {
    // error(error) {
    //   this.$error(messages[error] || 'Что-то пошло не так')
    // },
    message(message) {
      this.$message(messages[message])
    }
  },
  async mounted() {
    if (this.isLoggedIn) {
      await this.authCheck()
    }
    this.loading = false
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    ...mapActions(['authCheck'])
  }
}
</script>
