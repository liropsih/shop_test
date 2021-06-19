<template>
  <div class="Admin">
    <div class="page-title pb-3">
      <h4>Панель администратора</h4>
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
}
</script>