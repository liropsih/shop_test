<template>
  <div class="cats-edit">
    <div class="page-title center-align pb-3">
      <h5>{{ title }}</h5>
    </div>
    <div class="row">
      <form class="col s6 offset-s3 mb-5">
        <!-- CATS -->
        <div class="input-field col s12">
          <select id="cats" @change="catIdx = $event.target.value" ref="cats">
            <option value="" disabled selected>Выбрать категорию</option>
            <option v-for="(cat, idx) in cats" :key="idx" :value="idx">
              {{ cat.name }}
            </option>
          </select>
          <label>Категория</label>
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
            v-if="catIdx"
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
            v-if="catIdx"
            @click.prevent="modalOpen('cat')"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
        <div class="col s12" v-if="addForm">
          <p>Добавить категорию</p>
          <div class="row mb-0">
            <div class="input-field col s12">
              <input type="text" id="title" v-model="addedCat" />
              <label for="title">Название категории</label>
            </div>
            <div class="col s12 mt-3">
              <button
                class="btn waves-effect waves-light red lighten-1"
                @click.prevent="create(addedCat)"
              >
                Сохранить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div class="col s12" v-if="updateForm && updatedCat">
          <p>Редактировать категорию</p>
          <div class="row mb-0">
            <div class="input-field col s12">
              <input type="text" id="title" v-model="updatedCat.name" />
              <label for="title">Название категории</label>
            </div>
            <div class="col s12 mt-3">
              <button
                class="btn waves-effect waves-light red lighten-1"
                @click.prevent="update(updatedCat)"
              >
                Сохранить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- SUBCATS -->
      <form class="col s6 offset-s3">
        <div class="input-field col s12">
          <select
            id="subcats"
            @change="subcatIdx = $event.target.value"
            ref="subcats"
            :disabled="!subcats"
          >
            <option value="" disabled selected>Выбрать подкатегорию</option>
            <option v-for="(subcat, idx) in subcats" :key="idx" :value="idx">
              {{ subcat.name }}
            </option>
          </select>
          <label>Подкатегория</label>
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
            @click.prevent="subAdd"
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
            v-if="subcatIdx"
            @click.prevent="subEdit"
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
            v-if="subcatIdx"
            @click.prevent="modalOpen('subcat')"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
        <div class="col s12" v-if="subAddForm">
          <p>Добавить подкатегорию</p>
          <div class="row mb-0">
            <div class="input-field col s12">
              <input type="text" id="title" v-model="addedSubCat" />
              <label for="title">Название подкатегории</label>
            </div>
            <div class="col s12 mt-3">
              <button
                class="btn waves-effect waves-light red lighten-1"
                @click.prevent="create(addedSubCat, cats[catIdx].id)"
              >
                Сохранить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div class="col s12" v-if="subUpdateForm && updatedSubCat">
          <p>Редактировать подкатегорию</p>
          <div class="row mb-0">
            <div class="input-field col s12">
              <input type="text" id="title" v-model="updatedSubCat.name" />
              <label for="title">Название подкатегории</label>
            </div>
            <div class="col s12 mt-3">
              <button
                class="btn waves-effect waves-light red lighten-1"
                @click.prevent="update(updatedSubCat, cats[catIdx].id)"
              >
                Сохранить
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <!-- MODAL -->
      <div id="removeModal" class="modal" ref="removeModal">
        <div class="modal-content">
          <h4>
            Подтвердить удаление
            {{
              (removeCatOrSubcat == "cat" && "категории") ||
              (removeCatOrSubcat == "subcat" && "подкатегории")
            }}
          </h4>
          <p v-if="removeCatOrSubcat == 'cat'">
            Категория "{{ catIdx && cats[catIdx] && cats[catIdx].name }}" будет
            удалена вместе с относящимися к ней подкатегориями и их товарами.
          </p>
          <p v-if="removeCatOrSubcat == 'subcat'">
            Категория "{{
              subcatIdx && subcats[subcatIdx] && subcats[subcatIdx].name
            }}" будет удалена вместе с относящимися к ней товарами.
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
            @click.prevent="remove(removedId())"
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
  name: 'AdminCatsEdit',
  data: () => ({
    catIdx: 0,
    subcats: null,
    subcatIdx: 0,
    updateForm: false,
    subUpdateForm: false,
    updatedCat: {},
    updatedSubCat: {},
    addForm: false,
    subAddForm: false,
    addedCat: '',
    addedSubCat: '',
    removeModal: {},
    removeCatOrSubcat: null
  }),
  computed: {
    ...mapGetters(['cats']),
    title() {
      return this.$route.meta.title
    }
  },
  async mounted() {
    await this.getCats()
    this.selectInit()
    this.modalInit()
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  watch: {
    async cats() {
      if (this.catIdx) {
        this.subcats = { ...this.cats[this.catIdx] }.children
        await M.updateTextFields()
        await M.FormSelect.init(this.$refs.subcats)
      }
    },
    async catIdx() {
      if (this.UpdateForm) {
        this.updatedCat = { ...this.cats[this.catIdx] }
      }
      this.subcats = { ...this.cats[this.catIdx] }.children
      // this.subAddForm = false
      // this.subUpdateForm = false
      await M.updateTextFields()
      await M.FormSelect.init(this.$refs.subcats)
      // }
    },
    async subcatIdx() {
      if (this.subupdateForm) {
        this.updatedSubCat = { ...this.subcats[this.subcatIdx] }
      }
    }
  },
  methods: {
    ...mapActions(['getCats', 'setMessage', 'setError']),
    add() {
      this.subAddForm = false
      this.subUpdateForm = false
      this.updateForm = false
      this.addForm = true
    },
    edit() {
      this.subAddForm = false
      this.subUpdateForm = false
      this.addForm = false
      this.updatedCat = { ...this.cats[this.catIdx] }
      this.updateForm = true
      setTimeout(() => {
        M.updateTextFields()
      })
    },
    subAdd() {
      this.updateForm = false
      this.addForm = false
      this.subUpdateForm = false
      this.subAddForm = true
    },
    subEdit() {
      this.updateForm = false
      this.addForm = false
      this.subAddForm = false
      this.updatedSubCat = { ...this.subcats[this.subcatIdx] }
      this.subUpdateForm = true
      setTimeout(() => {
        M.updateTextFields()
      })
    },
    async create(name, parentId) {
      try {
        const message = await $axios.post('/api/cat/add', { name, parentId })
        this.addedCat = ''
        this.addedSubCat = ''
        this.setMessage(message)
        await this.getCats()
        this.selectInit()
        setTimeout(() => {
          M.updateTextFields()
        })
        this.addForm = false
        this.subAddForm = false
      } catch (e) {
        this.setError(e)
      }
    },
    async update(updatedCat) {
      try {
        const message = await $axios.post('/api/cat/update', updatedCat)
        this.setMessage(message)
        await this.getCats()
        this.selectInit()
        setTimeout(() => {
          M.updateTextFields()
        })
        this.updateForm = false
        this.subUpdateForm = false
      } catch (e) {
        this.setError(e)
      }
    },
    async remove(id) {
      try {
        this.addForm = false
        this.subAddForm = false
        this.updateForm = false
        this.subUpdateForm = false
        // const { id } = this.cats[this.catIdx]
        const message = await $axios.post('/api/cat/remove', { id })
        this.setMessage(message)
        await this.getCats()
        this.selectInit()
        setTimeout(() => {
          M.updateTextFields()
        })
      } catch (e) {
        this.setError(e)
      }
    },
    selectInit() {
      M.FormSelect.init(this.$refs.cats)
      M.FormSelect.init(this.$refs.subcats)
    },
    modalInit() {
      M.Modal.init(this.$refs.removeModal)
      this.removeModal = M.Modal.getInstance(this.$refs.removeModal)
    },
    modalOpen(CatOrSubcat) {
      this.removeCatOrSubcat = CatOrSubcat
      this.removeModal.open()
    },
    removedId() {
      if (this.removeCatOrSubcat == 'cat') { return this.cats[this.catIdx].id }
      else if (this.removeCatOrSubcat == 'subcat') { return this.subcats[this.subcatIdx].id }
    }
  }
}
</script>