<template>
  <div class="navbar-fixed">
    <nav class="navbar">
      <div class="nav-wrapper row mb-0">
        <div class="col s5 m5 l3">
          <router-link to="/" class="hide-on-med-and-down">
            <i class="large material-icons">shop_two</i>
          </router-link>
          <ul class="hide-on-large-only">
            <li>
              <a href="#" @click.prevent="SidenavTrigger()"
                ><i class="material-icons">menu</i></a
              >
            </li>
          </ul>
        </div>
        <div class="col s2 m2 l6 h-100 center">
          <Search class="hide-on-med-and-down" />
          <router-link to="/" class="hide-on-large-only">
            <i class="large material-icons">shop_two</i>
          </router-link>
        </div>
        <div class="col s5 m5 l3 right">
          <ul class="right">
            <!-- Dropdown Cart -->
            <li v-if="isLoggedIn">
              <a
                class="dropdown-trigger no-autoinit"
                href="#!"
                data-target="dropdownCart"
                ref="dropdownCart"
              >
                <i class="material-icons">shopping_cart</i>
              </a>
              <ul id="dropdownCart" class="dropdown-content">
                <li>
                  <div class="d-flex s-beetween">
                    <i class="material-icons hover-red">delete</i>
                    <a href="#!" class="black-text"> ТОВАР </a>
                    <div class="count d-flex s-center">
                      <i class="material-icons hover-red">expand_more</i>
                      <span>1</span>
                      <i class="material-icons hover-red">expand_less</i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex s-beetween">
                    <i class="material-icons hover-red">delete</i>
                    <a href="#!" class="black-text"> ТОВАР </a>
                    <div class="count d-flex s-center">
                      <i class="material-icons hover-red">expand_more</i>
                      <span>1</span>
                      <i class="material-icons hover-red">expand_less</i>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="d-flex s-beetween">
                    <i class="material-icons hover-red">delete</i>
                    <a href="#!" class="black-text"> ТОВАР </a>
                    <div class="count d-flex s-center">
                      <i class="material-icons hover-red">expand_more</i>
                      <span>1</span>
                      <i class="material-icons hover-red">expand_less</i>
                    </div>
                  </div>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="#!" class="black-text d-flex s-left"
                    ><i class="material-icons hover-red">shopping_basket </i
                    >Оформить заказ</a
                  >
                </li>
              </ul>
            </li>
            <!-- Dropdown Profile -->
            <li>
              <a
                class="dropdown-trigger no-autoinit"
                href="#!"
                data-target="dropdownProfile"
                ref="dropdownProfile"
              >
                <span class="hide-on-small-and-down">{{
                  username || "Авторизация"
                }}</span>
                <!-- <i class="material-icons right">person</i> -->
                <i class="material-icons right">input</i>
              </a>
              <ul id="dropdownProfile" class="dropdown-content">
                <li v-if="isAdmin">
                  <router-link
                    :to="{ name: 'AdminDashboard' }"
                    class="black-text"
                  >
                    <i class="material-icons">dashboard</i>Админ-панель
                  </router-link>
                </li>
                <li v-if="isAdmin" class="divider"></li>
                <li v-if="!isLoggedIn">
                  <router-link to="/login" class="black-text">
                    <i class="material-icons">person</i>Вход
                  </router-link>
                </li>
                <li v-if="!isLoggedIn">
                  <router-link to="/registration" class="black-text">
                    <i class="material-icons">person_add</i>Регистрация
                  </router-link>
                </li>
                <li v-if="isLoggedIn">
                  <router-link to="/profile" class="black-text">
                    <i class="material-icons">person</i>Профиль
                  </router-link>
                </li>
                <li v-if="isLoggedIn" class="divider"></li>
                <li v-if="isLoggedIn">
                  <a href="#!" class="black-text" @click.prevent="logout">
                    <i class="material-icons">assignment_return</i>Выйти
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  components: { Search },
  computed: {
    ...mapGetters(['isLoggedIn', 'isAdmin', 'username', 'cart'])
  },
  mounted() {
    // this.getCart()
    M.Dropdown.init(this.$refs.dropdownProfile, {
      constrainWidth: false,
      coverTrigger: false
    })
    M.Dropdown.init(this.$refs.dropdownCart, {
      constrainWidth: false,
      coverTrigger: false
    })
  },
  methods: {
    ...mapActions(['SidenavTrigger', 'getCart']),
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/?message=logout')
    },
  }
}
</script>