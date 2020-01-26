<template>
  <h1>
    <slot />
  </h1>
</template>
<script>
export default {
  name: 'HeadLineOne'
}
</script>
<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

h1 {
  color: $black;
  font-size: $h1-headline;
  line-height: $lh-h1-headline;
  font-weight: $font-bold;
  letter-spacing: 1px;
}
</style>
