<template>
  <div>
    <router-link
      :to="{ name: 'Item', params: { id: item.id } }"
      custom
      v-slot="{ href, navigate }"
    >
      <a class="item" :href="href" @click="navigate">
        <div class="item-img">
          <img :src="`${api}/${item.img}`" />
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
            <span>{{ brandName }} - {{ item.name }}</span>
          </div>
          <span class="rating-stars" :class="`star${item.rating}`"></span>
          <div class="to-cart" style="">
            <button
              @click.prevent
              class="waves-effect waves-light btn red lighten-1"
              :disabled="!item.count"
            >
              {{ item.count ? "В корзину" : "Нет в наличии" }}
            </button>
          </div>
        </div>
      </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object
    },
    brandName: {
      type: String
    }
  },
  data: () => ({
    api: process.env.VUE_APP_API_URL
  })
}
</script>