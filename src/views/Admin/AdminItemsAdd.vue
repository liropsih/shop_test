<template>
  <div class="items-add">
    <div class="page-title center-align pb-3">
      <h5>{{ title }}</h5>
    </div>
    <div class="row">
      <form class="col s12 m12 l6 offset-l3" @submit.prevent="submitHandler">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" id="name" v-model="name" />
            <label for="name">Наименование товара</label>
          </div>
          <div class="input-field col s12">
            <input type="number" id="price" v-model="price" />
            <label for="price">Цена (₽)</label>
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
              <option value="" disabled selected>Выбрать брэнд</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
            <label>Брэнд</label>
          </div>
          <div class="input-field col s12">
            <select id="cats" @change="setCat($event.target.value)" ref="cats">
              <option value="" disabled selected>Выбрать категорию</option>
              <option v-for="cat in cats" :key="cat.id" :value="cat.id">
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
              :disabled="!catId"
            >
              <option value="" disabled selected>Выбрать подкатегорию</option>
              <option v-for="scat in subcats" :key="scat.id" :value="scat.id">
                {{ scat.name }}
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
  name: 'AdminItemsAdd',
  data: () => ({
    name: null,
    price: null,
    count: null,
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
    this.selectInit()
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
    clearData() {
      this.name = null
      this.price = null
      this.count = null
      this.img = null
      this.info = []
      this.imgPreview = null
    },
    async submitHandler() {
      try {
        let data = new FormData()
        data.append('name', this.name)
        data.append('price', this.price)
        data.append('count', this.count)
        data.append('catId', this.subcatId)
        data.append('brandId', this.brandId)
        data.append('img', this.img)
        !!this.info.length && data.append('info', JSON.stringify(this.info))
        const message = await $axios.post('/api/item/add', data)
        this.setMessage(message)
        this.clearData()
      } catch (e) {
        this.setError(e)
      }
    }
  }
}
</script>