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
export default {
  name: "main-layout",
  data: () => ({
    loading: false
  }),
  components: { Navbar, Sidebar, Footer },
  mounted() {
    M.AutoInit()
  }
}
</script>
