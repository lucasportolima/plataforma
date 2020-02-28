<template>
  <div class="hero-head">
    <nav class="navbar">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="~@/assets/images/LogoLucas.svg" alt="Logo">
        </div>
        <!--
    Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
        <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
          <span />
          <span />
          <span />
        </div>
      </div>
      <!--
    Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end">
          <a class="navbar-item" href="/about">
            About
          </a>
          <a class="navbar-item" href="/path">
            Path
          </a>
          <a class="navbar-item" href="/blog">
            Blog
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'CustomHeader',

  components: {
  },

  computed: {
  },

  data () {
    return {
      showNav: false
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.hero-head {
  position: fixed;
  width: 100%;
  z-index: 10;
  border-bottom: 1px solid $font-color;

  .navbar {
    background-color: $gray-1;
    opacity: 0.9;
    box-shadow: inset 99px 99px 1000px -100px $blue-2;

    .navbar-brand {
      .navbar-item {
        img {
          width: 135px;
          position: fixed;
          top: -2px;
          max-height: none;
        }
      }
    }
  }
}
</style>
