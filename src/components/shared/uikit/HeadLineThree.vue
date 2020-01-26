<template>
  <h3>
    <slot />
  </h3>
</template>
<script>
export default {
  name: 'HeadLineThree'
}
</script>
<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

h3 {
  color: $black;
  font-size: $h3-headline;
  line-height: $lh-h3-headline;
  font-weight: $font-bold;
}
</style>
