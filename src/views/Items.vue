<template>
  <div>
    <Loader v-if="loader" />
    <div v-else class="row">
      <Filtration class="col s12 mb-3" @applyFilters="applyFilter" />

      <ItemCard
        class="col s12 m6 l4 mb-3"
        v-for="item in items"
        :key="item.id"
        :item="item"
      />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперёд'"
        :container-class="'col s12 mb-3 pagination '"
        :page-class="'waves-effect'"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Filtration from '@/components/app/Items/Filtration'
import ItemCard from '@/components/app/Items/ItemCard'

export default {
  name: 'Items',
  components: { ItemCard, Filtration },
  data: () => ({
    pageCount: 0,
    loader: false
  }),
  computed: {
    ...mapGetters(['items', 'itemsCount']),
    catId() { return +this.$route.params.catId },
    page() { return +this.$route.query.page || 1 },
    limit() { return +this.$route.query.limit || 12 },
    brandId() { return this.$route.query.brandId },
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
    // this.paramsInit()
    // this.loader = false
    await this.setupPagination()
  },
  watch: {
    $route: 'setupPagination'
  },
  // async beforeRouteUpdate(to, from, next) {
  //   await this.setupPagination()
  //   next()
  // },
  methods: {
    ...mapActions(['getBrandsFilter', 'setBrandsFilter']),
    async getItems() {
      await this.$store.dispatch('getItems', {
        catId: this.catId,
        params: this.$route.query
      })
    },

    async setupPagination() {
      if (this.brandId) {
        await this.getBrandsFilter(this.brandId)
      }
      await this.getItems()
      this.pageCount = Math.ceil(this.itemsCount / this.limit)
    },

    async pageChangeHandler(page) {
      this.$router.push({
        name: 'Items',
        params: { catId: this.catId },
        query: {
          page,
          limit: this.limit,
          brandId: this.brandId,
        }
      })
      await this.getItems()
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    },

    async applyFilter() {
      this.$router.push({
        name: 'Items',
        params: { catId: this.catId },
        query: {
          page: 1,
          limit: this.limit,
          brandId: this.brandsFilter.map(b => b.id),
        }
      })
      await this.getItems()
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
      this.pageCount = Math.ceil(this.itemsCount / this.limit)
    }
  }
}
</script>