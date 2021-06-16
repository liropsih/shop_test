<template>
  <div class="col s12 m6 l4 mb-3">
    <a class="item" href="#" @click.prevent>
      <div class="item-img">
        <img
          :src="`${api}/${item.img}`"
        />
        <p class="tag" v-if="item.sale">{{ item.sale_tag }}</p>
      </div>
      <div class="item-info">
        <div>
          <span class="price">
            <ins>{{ item.price }}₽</ins>
            <span class="sale" v-if="item.oldPrice && item.sale">
              <del>{{ item.oldPrice }}₽</del>
              <span
                >{{
                  Math.round((item.price / item.oldPrice) * 100) - 100
                }}%</span
              >
            </span>
          </span>
        </div>
        <div class="item-name">
          <span>{{ item.name }}</span>
        </div>
        <span class="rating-stars star3"></span>
        <div class="to-cart" style="">
          <a
            href="#"
            @click.prevent
            class="waves-effect waves-light btn red lighten-1"
            >В корзину</a
          >
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object
    }
  },
  data: () => ({
    api: process.env.VUE_APP_API_URL
  })
}
</script>