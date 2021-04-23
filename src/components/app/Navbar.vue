<template>
  <div class="navbar-fixed">
    <nav class="navbar">
      <div class="nav-wrapper">
        <ul class="left hide-on-large-only">
          <li>
            <a href="#" @click.prevent="sideNavOpen()"
              ><i class="material-icons">menu</i></a
            >
          </li>
        </ul>
        <router-link to="/" class="brand-logo">
          <i class="large material-icons">shop_two</i>
        </router-link>

        <ul class="right">
          <li>
            <a
              class="dropdown-trigger no-autoinit"
              href="#!"
              data-target="dropdownCart"
              ref="dropdownCart"
            >
              <i class="material-icons">shopping_cart</i>
            </a>
            <!-- Dropdown Cart -->
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
          <!-- Dropdown Trigger -->
          <li>
            <a
              class="dropdown-trigger no-autoinit"
              href="#!"
              data-target="dropdownProfile"
              ref="dropdownProfile"
            >
              NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <!-- Dropdown Profile -->
            <ul id="dropdownProfile" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider"></li>
              <li>
                <a href="#!" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),
  mounted() {
    M.Dropdown.init(this.$refs.dropdownProfile, {
      constrainWidth: false,
      coverTrigger: false
    }),
    M.Dropdown.init(this.$refs.dropdownCart, {
        constrainWidth: false,
        coverTrigger: false
      })
  },
  methods: {
    sideNavOpen() {
      this.$store.state.sideNav.open()
    }
  }
}
</script>
