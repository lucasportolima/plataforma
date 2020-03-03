<template>
  <div id="app" :style="appStyle">
    <CustomHeader />
    <router-view />
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '@/components/shared/CustomHeader.vue'
import CustomFooter from '@/components/shared/CustomFooter.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    CustomHeader,
    CustomFooter
  },

  computed: {
    ...mapGetters({
      styleModeSelected: 'getStyleModeSelected'
    })
  },

  beforeCreate () {
    this.$root.$i18n.locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en'
  },

  created () {
    this.setTopicInFocus('')
  },

  mounted () {
    this.setAppStyle()
  },

  watch: {
    async '$store.state.resume.topicInFocus' (a) {
      await setTimeout(() => {
        this.setTopicInFocus('')
      }, 750)
    },
    styleModeSelected: function () {
      this.setAppStyle()
    }
  },

  data () {
    return {
      appStyle: {}
    }
  },

  methods: {
    ...mapActions(['setTopicInFocus']),

    setAppStyle () {
      this.appStyle = {
        '--primary-gray-color': this.styleModeSelected.primary.gray,
        '--primary-blue-color': this.styleModeSelected.primary.blue,
        '--secondary-gray-color': this.styleModeSelected.secondary.gray,
        '--secondary-blue-color': this.styleModeSelected.secondary.blue
      }
    }
  }
}
</script>

<style lang="scss">
@import "~buefy/dist/buefy.css";
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/icons";

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: $gray-1;
}

::-webkit-scrollbar-thumb {
  border-spacing: 10px 10px;
  -webkit-box-shadow: inset 0 0 1000px $gray-1;
  background-color: $blue-1;
}

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
