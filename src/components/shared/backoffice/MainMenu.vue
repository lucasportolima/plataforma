<template>
  <div class="main-menu" @click="toggleMenu">
    <router-link :to="{ name: 'home'}">
      <i class="icon-ic_dashboard" /> {{ $t("partner.partners") }}
    </router-link>
    <router-link :to="{ name: 'news'}">
      <i class="icon-ic_file_manager" /> {{ $t("news.title") }}
    </router-link>
    <router-link :to="{ name: 'assessments'}">
      <i class="icon-like" /> {{ $t("assessments.title") }}
    </router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainMenu',

  methods: {
    ...mapActions(['toggleMenu'])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
.main-menu {
  width: 220px;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 100px;
  left: 0;
  background-color: $neutral-color-4;
  overflow-x: hidden;
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  a {
    height: 80px;
    color: $neutral-color-1;
    line-height: 80px;
    font-weight: $font-bold;
    padding-left: 20px;
    i {
      vertical-align: middle;
      padding-right: 10px;
      &:before {
        font-size: 24px;
      }
    }
    i:last-of-type {
      position: relative;
      top: -3px;
    }
    &.router-link-exact-active {
      color: $main-color-1;
      border-right: 4px solid $main-color-1;
    }
  }
}
</style>
