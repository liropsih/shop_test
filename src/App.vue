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
import messages from '@/utils/messages'

export default {
  name: 'App',
  components: {
    EmptyLayout, MainLayout
  },
  computed: {
    ...mapGetters(['error', 'message']),
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    queryMessage() {
      return this.$route.query.message
    }
  },
  watch: {
    error(error) {
      if (error) {
        this.$error(error)
      }
    },
    message(message) {
      if (message) {
        this.$message(message)
      }
    },
    queryMessage(queryMessage) {
      if (messages[queryMessage]) {
        this.$message(messages[queryMessage])
      }
    }
  }
}
</script>
