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
      styleModeSelected: 'getStyleModeSelected',
      modeSelected: 'getModeSelected'
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
    this.setScrollBarStyle()
  },

  watch: {
    async '$store.state.resume.topicInFocus' (a) {
      await setTimeout(() => {
        this.setTopicInFocus('')
      }, 750)
    },
    styleModeSelected: function () {
      this.setAppStyle()
      this.setScrollBarStyle()
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
        '--secondary-blue-color': this.styleModeSelected.secondary.blue,
        '--background-color': this.styleModeSelected.primary.background,
        '--blue-shadow': this.styleModeSelected.primary.blueShadow,
        '--font-color': this.styleModeSelected.primary.fontColor
      }
    },

    setScrollBarStyle () {
      document.getElementsByTagName('html')[0].classList = []
      if (this.modeSelected === 'dark') {
        document.getElementsByTagName('html')[0].classList.add('dark-mode')
      } else {
        document.getElementsByTagName('html')[0].classList.add('light-mode')
      }
    }
  }
}
</script>

<style lang="scss">
@import "~buefy/dist/buefy.css";
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/icons";

.light-mode::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: $font-color;
  transition: background-color 2s;
}

.light-mode::-webkit-scrollbar-thumb {
  border-spacing: 10px 10px;
  background-color: #546874;
  transition: background-color 2s;
}

.dark-mode::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: $gray-1;
  transition: background-color 2s;
}

.dark-mode::-webkit-scrollbar-thumb {
  border-spacing: 10px 10px;
  background-color: #2e4959;
  transition: background-color 2s;
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
