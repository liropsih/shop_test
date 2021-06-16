<template>
  <form @submit.prevent="searchHandler()" class="Search">
    <div class="input-field">
      <input v-model="searchValue" type="search" ref="search" required />
      <label class="label-icon" for="search"
        ><i class="material-icons">search</i></label
      >
      <i class="material-icons hide-on-med-and-down">close</i>
    </div>
  </form>
</template>

<script>
import $axios from '@/http'

export default {
  data: () => ({
    production: true,
    acDropdown: {},
    acItems: {},
    searchValue: '',
    selectedItem: '',
    autocomplete: {}
  }),
  watch: {
    async searchValue(value) {
      if (value.length >= this.autocomplete.options.minLength) {
        await this.getItems(value)
      }
    },
    async selectedItem(name) {
      await this.goToItem(name)
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.production = false
    }
    M.Autocomplete.init(this.$refs.search, {
      data: this.acDropdown,
      minLength: 3,
      limit: 10,
      onAutocomplete: item => this.selectedItem = item
    })
    this.autocomplete = M.Autocomplete.getInstance(this.$refs.search)
  },
  methods: {
    async getItems(value) {
      try {
        const { limit } = this.autocomplete.options
        const { data } = await $axios.get(`/api/item/search?name=${value}&limit=${limit}`)
        this.acItems = data.rows
        data.rows.forEach(item => {
          this.acDropdown[item.name] = this.production ? item.img : 'http://localhost:3000/' + item.img
        })
        return
      } catch (e) {
        throw e
      }
    },
    async goToItem(name) {
      try {
        let id
        this.acItems.forEach(item => {
          if (item.name = name) { id = item.id }
        })
        // var result = sample.filter(function (item) {
        //   return item.name == name
        // })
        // var result1 = sample.filter(item => item.name == name)
        this.$router.push(`/item/${id}`)
        return
      } catch (e) {
        throw e
      }
    },
    searchHandler() {
      this.$router.push(`/search?val=${this.searchValue}`)
    }
  }
}
</script>