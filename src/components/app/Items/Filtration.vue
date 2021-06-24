<template>
  <form v-if="!loading" @submit.prevent="applyFilters">
    <p>Фильтрация</p>
    <div class="input-field">
      <v-select
        multiple
        v-model="brandsFilter"
        :options="brands"
        label="name"
      />
    </div>
    <button
      class="waves-effect waves-light btn red lighten-1 m-1"
      type="submit"
    >
      Применить
    </button>
    <button
      class="waves-effect waves-light btn red lighten-1 m-1"
      @click.prevent="clear"
    >
      Сбросить
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters(['brands']),
    brandsFilter: {
      get() {
        return this.$store.getters.brandsFilter
      },
      set(brandsFilter) {
        this.setBrandsFilter(brandsFilter)
      }
    }
  },
  async mounted() {
    await this.getBrands()
    this.loading = false
  },
  methods: {
    ...mapActions(['getBrands', 'clearFilters', 'setBrandsFilter']),
    clear() {
      this.clearFilters()
      this.applyFilters()
    },
    applyFilters() {
      this.$emit('applyFilters')
    }
  }
}
</script>