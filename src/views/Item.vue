<template>
  <div>
    <Loader v-if="loading" />
    <div class="item-detail" v-else>
      <div class="page-title pb-3">
        <button
          class="waves-effect waves-light btn-small red lighten-1"
          @click="$router.go(-1)"
        >
          <i class="material-icons left">arrow_back</i>Вернуться назад
        </button>
        <h5>{{ `${brandName} - ${name}` }}</h5>
      </div>
      <div class="row">
        <div class="col s5 p-0 item-img">
          <img class="w-100 h-auto" :src="imgPreview" />
          <p class="tag" v-if="sale">{{ sale_tag }}</p>
        </div>
        <div class="col s7 pl-5 item-info">
          <div>
            <p class="mb-2">Цена:</p>
            <div class="price">
              <span class="current-price">{{ price }}₽</span>
            </div>
            <div class="old-price">
              <span class="sale" v-if="oldPrice && sale">
                <del>{{ oldPrice }}₽</del>
                <span>{{ Math.round((price / oldPrice) * 100) - 100 }}%</span>
              </span>
            </div>
            <p class="mb-2">Характеристики:</p>
            <div v-for="infoSingle in info" :key="infoSingle.id">
              <span
                ><b>{{ infoSingle.title }}: </b>
                {{ infoSingle.description }}</span
              >
            </div>
            <div class="to-cart" style="">
              <button
                @click.prevent
                class="waves-effect waves-light btn red lighten-1"
                :disabled="!count"
              >
                {{ count ? "В корзину" : "Нет в наличии" }}
              </button>
            </div>
            <div v-if="isAdmin">
              <router-link
                :to="{ name: 'AdminItemsEdit', query: { id } }"
                custom
                v-slot="{ navigate }"
              >
                <button
                  @click="navigate"
                  class="waves-effect waves-light btn red lighten-1"
                >
                  Редактировать <i class="material-icons right">edit</i>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from '@/http'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Item',
  data: () => ({
    loading: true,
    name: null,
    price: null,
    oldPrice: null,
    count: null,
    sale: false,
    sale_tag: null,
    brandId: null,
    info: [],
    imgPreview: null
  }),
  computed: {
    ...mapGetters(['brands', 'isAdmin']),
    id() { return +this.$route.params.id },
    brandName() {
      let brandname = ''
      if (this.brands && this.brandId) {
        this.brands.forEach(brand => {
          (this.brandId == brand.id) && (brandname = brand.name)
        })
      }
      return brandname
    }
  },
  async mounted() {
    await this.getBrands()
    await this.getItem()
    this.loading = false
  },
  watch: {
    $route: 'getItem'
  },
  methods: {
    ...mapActions(['getBrands', 'setError']),
    async getItem() {
      try {
        const { data } = await $axios.get(`/api/item/detail/${this.id}`)
        this.name = data.name
        this.price = data.price
        this.oldPrice = data.oldPrice
        this.count = data.count
        this.sale = data.sale
        this.sale_tag = data.sale_tag
        this.brandId = data.brandId
        this.imgPreview = `${process.env.VUE_APP_API_URL}/${data.img}`
        this.info = data.info
      } catch (e) {
        this.setError(e)
      }
    },
  }
}
</script>