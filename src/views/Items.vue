<template>
  <div>
    <Loader v-if="loader" />
    <div class="row" v-else>
      <Filtration class="col s12 mb-3" @applyFilters="applyFilter" />

      <transition-group name="component-fade" mode="out-in">
        <ItemCard
          class="col s12 m6 l4 mb-3"
          v-for="item in items"
          :key="item.id"
          :item="item"
          :brandName="getBrandName(item.brandId)"
        />
      </transition-group>

      <Paginate
        v-if="pageCount > 1"
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
    loader: true
  }),
  computed: {
    ...mapGetters(['items', 'itemsCount', 'brands']),
    catId() { return +this.$route.params.catId },
    page: {
      get() { return +this.$route.query.page || 1 },
      set() { }
    },
    limit() { return +this.$route.query.limit || 12 },
    brandId() { return this.$route.query.brandId },
    searchValue() { return this.$route.query.searchValue },
    sale() { return this.$route.meta.sale },
    search() { return this.$route.meta.search },
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
    await this.setupPagination()
    this.loader = false
  },
  watch: {
    $route: 'setupPagination'
  },
  methods: {
    ...mapActions(['getBrands', 'getBrandsFilter', 'setBrandsFilter']),
    async getItems() {
      await this.$store.dispatch('getItems', {
        catId: this.catId,
        params: this.$route.query,
        sale: this.sale,
        search: this.search
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
        name: (this.sale && 'Sale') || (this.search && 'Search') || 'Items',
        params: { catId: this.catId },
        query: {
          page,
          limit: this.limit,
          brandId: this.brandId,
          searchValue: this.searchValue
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
        name: (this.sale && 'Sale') || (this.search && 'Search') || 'Items',
        params: { catId: this.catId },
        query: {
          page: 1,
          limit: this.limit,
          brandId: this.brandsFilter.map(b => b.id),
          searchValue: this.searchValue
        }
      })
      await this.getItems()
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
      this.pageCount = Math.ceil(this.itemsCount / this.limit)
    },
    getBrandName(brandId) {
      let brandName
      if (this.brands) {
        this.brands.forEach(brand => {
          (brandId == brand.id) && (brandName = brand.name)
        })
      }
      return brandName
    }
  }
}
</script>