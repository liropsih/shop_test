<template>
  <div class="page-title pb-3">
    <h5>{{ title }}</h5>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>