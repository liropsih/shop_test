<template>
  <!-- <div class="collapse" :class="isOpen && 'active'"> -->
  <div class="collapse" :class="isActive && 'active'">
    <a
      href="#"
      class="collapse-header waves-effect waves-red"
      @click.prevent="isOpen = !isOpen"
      >{{ title }}
      <span class="material-icons collapse-arrow" :class="isOpen && 'open'"
        >arrow_right</span
      >
    </a>
    <transition name="collapse">
      <ul
        class="collapse-body"
        :style="`--count: ${computedCount}; --height: ${computedHeight}`"
        v-show="isOpen"
        ref="collapse"
      >
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props: {
    title: {
      type: String
    },
    isActive: {
      type: Boolean
    }
  },
  data: () => ({
    computedCount: 0,
    computedHeight: 'auto',
    isOpen: false,
  }),
  watch: {
    isOpen(val) {
      if (!val) {this.initHeight(this.$refs.collapse)}
    },
    isActive(val) {
      if (!val) {
        this.isOpen = false
      }
    }
  },
  mounted() {
    this.isOpen = this.isActive
    this.initCount(this.$refs.collapse)
  },
  methods: {
    initCount(el) {
      this.computedCount = el.children.length
    },
    initHeight(el) {
      const height = getComputedStyle(el).height
      this.computedHeight = height
    }
  }
}
</script>