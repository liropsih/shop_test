<template>
  <div>
    <Loader v-if="loading" />
    <div class="main-layout" v-else>
      <Navbar />
      <div>
        <Sidebar />
        <main>
          <router-view />
        </main>
      </div>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
import Footer from "@/components/app/Footer"
import messages from '@/utils/messages'
export default {
  name: "main-layout",
  data: () => ({
    loading: true
  }),
  async mounted() {
    if (this.$store.getters.isLoggedIn) {
      await this.$store.dispatch('tokenVerify')
    }
    this.loading = false
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  components: { Navbar, Sidebar, Footer },
  computed: {
    error() {
      return this.$store.getters.error
    },
    message() {
      return this.$route.query.message
    }
  },
  watch: {
    error(error) {
      this.$error(messages[error] || 'Что-то пошло не так')
    },
    message(message) {
      this.$message(messages[message])
    }
  }
}
</script>
