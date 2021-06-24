<template>
  <div>
    <a
      class="dropdown-trigger no-autoinit"
      href="#"
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
          ><i class="material-icons hover-red">shopping_basket </i>Оформить
          заказ</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cart'])
  },
  mounted() {
    this.dropdownInit()
    this.getCart()
  },
  methods: {
    ...mapActions(['getCart']),
    dropdownInit() {
      M.Dropdown.init(this.$refs.dropdownCart, {
        constrainWidth: false,
        coverTrigger: false
      })
    }
  }
}
</script>