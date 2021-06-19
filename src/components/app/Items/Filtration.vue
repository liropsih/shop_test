<template>
  <form v-if="!loader" @submit.prevent="applyFilters">
    <p>Фильтрация</p>
    <div class="input-field">
      <v-select
        multiple
        v-model="brandsFilter"
        :options="brands"
        label="name"
      />
    </div>
    <button class="waves-effect waves-light btn red lighten-1 m-1" type="submit">
      Применить
    </button>
    <button
      class="waves-effect waves-light btn red lighten-1 m-1"
      @click.prevent="clearFilters"
    >
      Сбросить
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    loader: true
  }),
  computed: {
    ...mapGetters(['brands']),
    brandsFilter: {
      get() {
        return this.$store.getters.brandsFilter
      },
      set(brandsFilter) {
        this.$store.dispatch('setBrandsFilter', brandsFilter)
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getBrands')
    this.loader = false
  },
  methods: {
    clearFilters() {
      this.$store.dispatch('clearFilters')
      this.applyFilters()
    },
    applyFilters() {
      this.$emit('applyFilters')
    }
  }
}
</script>