<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~buefy/dist/buefy.css";
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/icons";

html,
body {
  width: 100%;
  height: 100%;
}

body {
  font-family: $font-primary !important;
  color: $neutral-color-1;
  font-size: $body-1;
  line-height: $lh-body-1;
}

.view-mobile {
  display: none;
}

.container {
  margin: 0 auto;
  position: relative;
}

@media screen and (min-width: 1280px) {
  .container {
      max-width: 1152px;
      width: 100%;
  }
}

@media screen and (min-width: 1472px) {
  .container {
      max-width: 1495px;
      width: 100%;
  }
}

@media (max-width: 1023px) {
  .view-mobile {
    display: inline;
  }
  .view-desktop {
    display: none;
  }
}

#app {
  height: 100%;
}
</style>
