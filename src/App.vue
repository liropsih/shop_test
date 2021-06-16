<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'App',
  components: {
    EmptyLayout, MainLayout
  },
  computed: {
    ...mapGetters(['error']),
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  watch: {
    error(error) {
      if (error) {
        this.$error(error || 'Что-то пошло не так')
      }
    }
  }
}
</script>
