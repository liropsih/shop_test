<template>
  <div class="empty-layout grey darken-1">
    <router-view />
  </div>
</template>

<script>
// import messages from '@/utils/messages'

export default {
  name: "empty-layout",
  // computed: {
  //   error() {
  //     return this.$store.getters.error
  //   }
  // },
  // watch: {
  //   error(error) {
  //     if (this.$store.getters.error) { 
  //       this.$error(error || 'Что-то пошло не так') 
  //     }
  //   }
  // }
}
</script>

