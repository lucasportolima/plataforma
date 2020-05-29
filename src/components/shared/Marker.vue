<template>
  <div class="marker">
    <i class="icon-tag">
      <span>{{ year }}</span>
    </i>
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

  i {
    color: var(--secondary-blue-color);
    font-size: 45px;
    transition: color 2s;
  }

  span {
    color: var(--background-color);
    font-weight: bold;
    position: relative;
    top: -15px;
    right: 41px;
    font-size: 12px;
    transition: color 2s;
  }
}
</style>
