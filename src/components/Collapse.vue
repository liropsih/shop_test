<template>
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
        :style="`--height: ${computedHeight}`"
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
    computedHeight: 'auto',
    isOpen: false,
  }),
  watch: {
    isOpen(val) {
      this.initHeight(this.$refs.collapse, val)
    },
    isActive(val) {
      !val && (this.isOpen = false)
    }
  },
  mounted() {
    this.isOpen = this.isActive
  },
  methods: {
    initHeight(el, val) {
      if (val) {
        el.style.visibility = 'hidden'
        el.style.display = 'block'
      }
      this.computedHeight = getComputedStyle(el).height
      if (val) {
        el.style.display = 'none'
        el.style.visibility = 'visible'
      }
    }
  }
}
</script>