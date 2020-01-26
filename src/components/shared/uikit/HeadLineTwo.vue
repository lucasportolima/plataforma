<template>
  <h2>
    <slot />
  </h2>
</template>
<script>
export default {
  name: 'HeadLineTwo'
}
</script>
<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

h2 {
  color: $black;
  font-size: $h2-headline;
  line-height: $lh-h2-headline;
  font-weight: $font-bold;
}
</style>
