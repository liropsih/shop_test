<template>
  <div class="brands-edit">
    <div class="page-title center-align pb-3">
      <h5>{{ title }}</h5>
    </div>
    <div class="row">
      <form class="col s12 m12 l6 offset-l3" @submit.prevent="submitHandler">
        <div class="input-field col s12">
          <select
            id="brands"
            @change="brandIdx = $event.target.value"
            ref="brands"
          >
            <option value="" disabled selected>Выбрать брэнд</option>
            <option v-for="(brand, idx) in brands" :key="idx" :value="idx">
              {{ brand.name }}
            </option>
          </select>
          <label>Брэнд</label>
        </div>
        <div class="col s12">
          <button
            class="
              btn-floating btn-small
              waves-effect waves-light
              red
              lighten-1
              mr-2
            "
            @click.prevent="add"
          >
            <i class="material-icons">add</i>
          </button>
          <button
            class="
              btn-floating btn-small
              waves-effect waves-light
              red
              lighten-1
              mr-2
            "
            v-if="brandIdx"
            @click.prevent="edit"
          >
            <i class="material-icons">edit</i>
          </button>
          <button
            class="
              btn-floating btn-small
              waves-effect waves-light
              red
              lighten-1
              mr-2
            "
            v-if="brandIdx"
            @click.prevent="removeModal.open()"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
        <div class="col s12" v-if="addForm">
          <p>Добавить брэнд</p>
          <div class="row mb-0">
            <div class="input-field col s12">
              <input type="text" id="title" v-model="addedBrand" />
              <label for="title">Название брэнда</label>
            </div>
            <div class="col s12 mt-3">
              <button
                class="btn waves-effect waves-light red lighten-1"
                @click.prevent="create"
              >
                Сохранить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div class="col s12" v-if="updateForm && updatedBrand">
          <p>Редактировать брэнд</p>
          <div class="row mb-0">
            <div class="input-field col s12">
              <input type="text" id="title" v-model="updatedBrand.name" />
              <label for="title">Название брэнда</label>
            </div>
            <div class="col s12 mt-3">
              <button
                class="btn waves-effect waves-light red lighten-1"
                @click.prevent="update"
              >
                Сохранить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div id="removeModal" class="modal" ref="removeModal">
        <div class="modal-content">
          <h4>Подтвердить удаление брэнда</h4>
          <p>
            Брэнд "{{ brandIdx && brands[brandIdx] && brands[brandIdx].name }}"
            будет удалён вместе с относящимися к нему товарами.
          </p>
          <p>Вы уверены, что хотите это сделать?</p>
        </div>
        <div class="modal-footer">
          <a
            href="#"
            @click.prevent="removeModal.close()"
            class="modal-close waves-effect waves-green btn-flat"
            >Отменить</a
          >
          <a
            href="#"
            @click.prevent="remove"
            class="modal-close waves-effect waves-green btn-flat"
            >Подтведить</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from '@/http'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AdminBrandsEdit',
  data: () => ({
    brandIdx: 0,
    updateForm: false,
    updatedBrand: {},
    addForm: false,
    addedBrand: '',
    removeModal: {}
  }),
  computed: {
    ...mapGetters(['brands']),
    title() {
      return this.$route.meta.title
    }
  },
  async mounted() {
    await this.getBrands()
    this.selectInit()
    this.modalInit()
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  watch: {
    brandIdx() {
      if (this.updateForm) {
        this.updatedBrand = { ...this.brands[this.brandIdx] }
      }
    }
  },
  methods: {
    ...mapActions(['getBrands', 'setMessage', 'setError']),
    add() {
      this.updateForm = false
      this.addForm = true
    },
    edit() {
      this.addForm = false
      this.updatedBrand = { ...this.brands[this.brandIdx] }
      this.updateForm = true
      setTimeout(() => {
        M.updateTextFields()
      })
    },
    async create() {
      try {
        const message = await $axios.post('/api/brand/add', { name: this.addedBrand })
        this.addedBrand = ''
        this.setMessage(message)
        await this.getBrands()
        this.selectInit()
        setTimeout(() => {
          M.updateTextFields()
        })
        this.addForm = false
      } catch (e) {
        this.setError(e)
      }
    },
    async update() {
      try {
        const message = await $axios.post('/api/brand/update', this.updatedBrand)
        this.setMessage(message)
        await this.getBrands()
        this.selectInit()
        setTimeout(() => {
          M.updateTextFields()
        })
        this.updateForm = false
      } catch (e) {
        this.setError(e)
      }
    },
    async remove() {
      try {
        const { id } = this.brands[this.brandIdx]
        const message = await $axios.post('/api/brand/remove', { id })
        this.setMessage(message)
        await this.getBrands()
        this.selectInit()
        setTimeout(() => {
          M.updateTextFields()
        })
      } catch (e) {
        this.setError(e)
      }
    },
    selectInit() {
      M.FormSelect.init(this.$refs.brands)
    },
    modalInit() {
      M.Modal.init(this.$refs.removeModal)
      this.removeModal = M.Modal.getInstance(this.$refs.removeModal)
    }
  }
}
</script>