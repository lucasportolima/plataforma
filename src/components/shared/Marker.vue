<template>
  <div class="marker">
    <img src="~@/assets/images/tag.svg" alt="">
    <span>{{ year }}</span>
  </div>
</template>

<script>
export default {
  name: 'CustomMarker',

  computed: {
  },

  props: {
    year: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      name: 'lucas'
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.marker {
  background-image: url('../../assets/images/tag.svg');
  display: inline-block;
  padding: 1px 5px;
  position: relative;

  span {
    color: $gray-1;
    font-weight: bold;
    position: relative;
    top: -39px;
    right: -3px;
  }
}
</style>
