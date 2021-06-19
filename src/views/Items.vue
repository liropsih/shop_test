<template>
  <div>
    <Loader v-if="loader" />
    <div class="row" v-else>
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
import { mapGetters } from 'vuex'
import Filtration from '@/components/app/Items/Filtration'
import ItemCard from '@/components/app/Items/ItemCard'
export default {
  name: 'Items',
  components: { ItemCard, Filtration },
  data: () => ({
    page: 1,
    pageCount: 0,
    limit: 12,
    catId: '',
    brandId: '',
    loader: false
  }),
  computed: {
    ...mapGetters(['items', 'itemsCount', 'brands']),
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
    this.catId = +this.$route.params.id
    this.brandId = this.$route.query.brandId || ''
    this.page = +this.$route.query.page || 1
    this.limit = +this.$route.query.limit || 12
    await this.setupPagination()
    this.loader = false
  },
  methods: {
    toGet(data) {
      return Object.keys(data).map(key => {
        if (Array.isArray(data[key])) {
          return data[key].map((value) => `${key}=${value}`).join('&')
        } else { return `${key}=${data[key]}` }
      }).join('&')
    },

    async getItems() {
      const data = {
        brandId: this.brandId,
        page: this.page,
        limit: this.limit
      }
      const get = this.toGet(data)
      await this.$store.dispatch('getItems', {
        catId: this.catId,
        get
      })
      return get
    },

    async setupPagination() {
      if (this.brandId) {
        const id = this.toGet({ id: this.brandId })
        await this.$store.dispatch('getBrandsFilter', id)
      }
      await this.getItems()
      this.pageCount = Math.ceil(this.itemsCount / this.limit)
    },
    async pageChangeHandler(page) {
      this.brandId = this.brandsFilter.map(b => b.id)
      this.page = page
      const get = await this.getItems()
      this.$router.push(`?${get}`)
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    },

    async applyFilter() {
      this.brandId = this.brandsFilter.map(b => b.id)
      this.page = 1
      const get = await this.getItems()
      this.$router.push(`?${get}`)
      this.pageCount = Math.ceil(this.itemsCount / this.limit)
    }

  }
}
</script>