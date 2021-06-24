<template>
  <div class="items-edit">
    <div class="page-title center-align pb-3">
      <h5>{{ title }}</h5>
    </div>
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="submitHandler">
        <div class="row">
          <div class="input-field col s12">
            <input type="number" id="id" v-model="id" />
            <label for="id">Идентификатор товара</label>
          </div>
          <div class="input-field col s12">
            <input type="text" id="name" v-model="name" />
            <label for="name">Наименование товара</label>
          </div>
          <div class="input-field col s12">
            <input type="number" id="price" v-model="price" />
            <label for="price">Цена (₽)</label>
          </div>
          <div class="col s12">
            <p>
              <label>
                <input type="checkbox" v-model="sale" />
                <span>Акция</span>
              </label>
            </p>
          </div>
          <div class="input-field col s12" v-if="sale">
            <input type="number" id="oldPrice" v-model="oldPrice" />
            <label for="oldPrice">Старая цена (₽)</label>
          </div>
          <div class="input-field col s12" v-if="sale">
            <input type="text" id="sale_tag" v-model="sale_tag" />
            <label for="sale_tag">Тэг для акции</label>
          </div>
          <div class="input-field col s12">
            <input type="text" id="count" v-model="count" />
            <label for="count">Количество</label>
          </div>
          <div class="input-field col s12">
            <select
              id="brands"
              @change="setBrand($event.target.value)"
              ref="brands"
            >
              <option
                v-for="brand in brands"
                :key="brand.id"
                :value="brand.id"
                :selected="brandId == brand.id"
              >
                {{ brand.name }}
              </option>
            </select>
            <label>Брэнд</label>
          </div>
          <div class="input-field col s12">
            <select id="cats" @change="setCat($event.target.value)" ref="cats">
              <option
                v-for="cat in cats"
                :key="cat.id"
                :value="cat.id"
                :selected="catId == cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
            <label>Категория</label>
          </div>
          <div class="input-field col s12">
            <select
              id="subcats"
              @change="setSubcat($event.target.value)"
              ref="subcats"
            >
              <option
                v-for="subcat in subcats"
                :key="subcat.id"
                :value="subcat.id"
                :selected="subcatId == subcat.id"
              >
                {{ subcat.name }}
              </option>
            </select>
            <label>Подкатегория</label>
          </div>
          <div class="file-field input-field col s12">
            <transition name="component-fade" mode="out-in">
              <div v-if="imgPreview" class="center-align mb-3">
                <img :src="imgPreview" class="uploading-image" />
              </div>
            </transition>
            <div class="btn waves-effect waves-light red lighten-1">
              <span>Изображение</span>
              <input type="file" @change="selectFile" />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path" type="text" />
            </div>
          </div>
          <div class="col s12">
            <p>Характеристики</p>
            <div class="row mb-0" v-for="(infoSingle, idx) in info" :key="idx">
              <div class="input-field col s12 m6">
                <input
                  type="text"
                  :id="`title-${idx}`"
                  v-model="info[idx].title"
                />
                <label :for="`title-${idx}`">Название свойства</label>
              </div>
              <div class="input-field col s12 m6">
                <input
                  type="text"
                  :id="`description-${idx}`"
                  v-model="info[idx].description"
                />
                <label :for="`description-${idx}`">Значение</label>
                <label
                  class="label-icon right pointer"
                  @click="removeInfo(idx)"
                >
                  <i class="material-icons">delete</i>
                </label>
              </div>
            </div>
          </div>
          <div class="col s12">
            <button
              class="
                btn-floating btn-small
                waves-effect waves-light
                red
                lighten-1
              "
              @click.prevent="addInfo()"
            >
              <i class="material-icons">add</i>
            </button>
          </div>
          <div class="col s12 mt-5">
            <button
              class="btn waves-effect waves-light red lighten-1"
              type="submit"
            >
              Сохранить
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $axios from '@/http'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AdminItemsEdit',
  props: {
    itemId: { type: Number } //удалить default
  },
  data: () => ({
    id: null,
    name: null,
    price: null,
    oldPrice: null,
    count: null,
    sale: false,
    sale_tag: null,
    brandId: null,
    catId: null,
    subcatId: null,
    img: null,
    info: [],
    subcats: null,
    imgPreview: null
  }),
  computed: {
    ...mapGetters(['brands', 'cats']),
    title() {
      return this.$route.meta.title
    }
  },
  async mounted() {
    await this.getBrands()
    await this.getCats()
    this.itemId && (this.id = this.itemId)
    this.id && await this.getItem(this.id)
    this.selectInit()
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  watch: {
    sale() {
      setTimeout(() => {
        M.updateTextFields()
      })
    },
    async id(id) {
      if (id) {
        await this.getItem(id)
        setTimeout(() => {
          M.updateTextFields()
        })
      }
    }
  },
  methods: {
    ...mapActions(['getBrands', 'getCats', 'setMessage', 'setError']),
    selectInit() {
      M.FormSelect.init(this.$refs.brands)
      M.FormSelect.init(this.$refs.cats)
      M.FormSelect.init(this.$refs.subcats)
    },
    setBrand(brands) {
      brands && (this.brandId = +brands)
    },
    async setCat(cats) {
      cats && (this.catId = +cats)
      this.subcats = this.cats.filter(cat => cat.id == this.catId)[0].children
      await M.updateTextFields()
      await M.FormSelect.init(this.$refs.subcats)
    },
    setSubcat(subcats) {
      subcats && (this.subcatId = +subcats)
    },
    selectFile(event) {
      this.img = event.target.files[0]
      this.imgPreview = URL.createObjectURL(this.img)
    },
    addInfo() {
      this.info.push({ title: '', description: '' })
    },
    removeInfo(idx) {
      this.info.splice(idx, 1)
    },
    async getItem(id) {
      try {
        const { data } = await $axios.get(`/api/item/detail/${id}`)
        this.name = data.name
        this.price = data.price
        this.oldPrice = data.oldPrice
        this.count = data.count
        this.sale = data.sale
        this.sale_tag = data.sale_tag
        this.brandId = data.brandId
        this.cats.forEach(cat => cat.children.forEach(subcat => {
          if (subcat.id == data.catId) { this.catId = subcat.parentId }
        }))
        await this.setCat(this.catId)
        this.subcatId = data.catId
        this.imgPreview = `${process.env.VUE_APP_API_URL}/${data.img}`
        this.info = data.info
      } catch (e) {
        this.setError(e)
      }
    },
    async submitHandler() {
      try {
        let data = new FormData()
        data.append('id', this.id)
        data.append('name', this.name)
        data.append('price', this.price)
        data.append('oldPrice', this.oldPrice || 0)
        data.append('sale', this.sale)
        data.append('sale_tag', this.sale_tag)
        data.append('count', this.count)
        data.append('catId', this.subcatId)
        data.append('brandId', this.brandId)
        !!this.img && data.append('img', this.img)
        !!this.info.length && data.append('info', JSON.stringify(this.info))
        const message = await $axios.post('/api/item/update', data)
        this.setMessage(message)
      } catch (e) {
        this.setError(e)
      }
    }
  }
}
</script>