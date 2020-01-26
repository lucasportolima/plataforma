<template>
  <nav class="breadcrumbs" v-if="links.length">
    <span v-for="link in links" :key="link.route">
      <i class="icon-ic_chevron_right" />
      <router-link :to="{ name: link.route}">
        {{ link.label }}
      </router-link>
    </span>
  </nav>
</template>
<script>
export default {
  name: 'Breadcrumbs',

  props: {
    links: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.breadcrumbs {
  i {
    color: $white;
    opacity: 0.5;
    font-size: 20px;
    &:before {
      vertical-align: bottom;
    }
  }

  a {
    color: $white;
    font-size: $body-1;
    line-height: $lh-body-1;
  }

  span:first-child {
    i {
      display: none;
    }
  }

  span:last-child {
    a {
      cursor: unset;
      pointer-events: none;
      font-weight: $font-bold;
    }
  }
}
</style>
