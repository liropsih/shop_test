<template>
  <div class="Admin">
    <div class="page-title pb-3">
      <h4>
        <router-link :to="{ name: 'AdminDashboard' }" class="black-text">
          Панель администратора
        </router-link>
      </h4>
    </div>
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>