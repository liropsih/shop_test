<template>
  <div>
    <div class="main-layout">
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
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
import Footer from "@/components/app/Footer"

export default {
  name: "main-layout",
  components: { Navbar, Sidebar, Footer }
}
</script>
