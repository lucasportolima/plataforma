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
        <div
          class="navbar-burger"
          @click="showNav = !showNav"
          :class="{ 'is-active': showNav }"
        >
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
          <span class="navbar-item">
            About
          </span>
          <span class="navbar-item">
            Path
          </span>
          <span class="navbar-item">
            Blog
          </span>
          <span class="navbar-item">
            <div
              class="dropdown is-right"
              :class="{ 'is-active': showDropdownLanguages }"
            >
              <div class="dropdown-trigger">
                <span
                  class="label-dropdown-trigger"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="showDropdownLanguages = !showDropdownLanguages"
                >
                  <div
                    class="icon is-small"
                    :class="{ 'br-flag': locale === 'PT' }"
                  >
                    <img
                      v-if="locale === 'PT'"
                      src="~@/assets/images/brazil-flag.svg"
                      alt="pt"
                    >
                    <img
                      v-if="locale === 'EN'"
                      src="~@/assets/images/england.svg"
                      alt="en"
                    >
                    <img
                      v-if="locale === 'FR'"
                      src="~@/assets/images/france.svg"
                      alt="fr"
                    >
                  </div>
                  <span>
                    {{ locale }}
                  </span>
                </span>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="changeLanguage('pt')">
                    <img
                      class="br-flag"
                      src="~@/assets/images/brazil-flag.svg"
                      alt="pt"
                    >
                    <span>PT</span>
                  </a>
                  <a class="dropdown-item" @click="changeLanguage('en')">
                    <img src="~@/assets/images/england.svg" alt="en">
                    <span>EN</span>
                  </a>
                  <a class="dropdown-item" @click="changeLanguage('fr')">
                    <img src="~@/assets/images/france.svg" alt="fr">
                    <span>FR</span>
                  </a>
                </div>
              </div>
            </div>
          </span>
          <span class="navbar-item">
            <toggle-button
              v-model="modeSelect"
              :labels="{ checked: 'Dark', unchecked: 'Light' }"
              :switch-color="{ checked: '#337093', unchecked: '#4599ca' }"
              :color="{ checked: '#2b2b2b', unchecked: '#515151' }"
              :width="65"
              :height="25"
              :font-size="12"
              :speed="500"
            />
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CustomHeader',

  components: {},

  computed: {
    ...mapGetters({
      modeSelected: 'getModeSelected'
    }),

    locale () {
      return this.$root.$i18n.locale.toUpperCase()
    }
  },

  watch: {
    modeSelect () {
      this.modeSelect
        ? this.setStyleModeSelected('dark')
        : this.setStyleModeSelected('light')
    }
  },

  mounted () {
    this.modeSelected === 'dark'
      ? this.modeSelect = true
      : this.modeSelect = false
  },

  data () {
    return {
      showNav: false,
      showDropdownLanguages: false,
      modeSelect: this.modeSelected === 'dark'
    }
  },

  methods: {
    ...mapActions(['setStyleModeSelected']),

    changeLanguage (language) {
      this.toggleDropdownLanguages()
      localStorage.setItem('locale', language)
      this.$root.$i18n.locale = localStorage.getItem('locale')
        ? localStorage.getItem('locale')
        : 'en'
    },

    toggleDropdownLanguages () {
      this.showDropdownLanguages = !this.showDropdownLanguages
    }
  }
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
    background-color: var(--primary-gray-color);
    opacity: 0.9;
    box-shadow: inset 99px 99px 1000px -100px var(--secondary-blue-color);
    transition: background-color 2s, box-shadow 2s;

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

  .navbar-menu {
    .navbar-end {
      .navbar-item {
        color: $font-color;
        font-weight: bold;
        cursor: pointer;

        .dropdown {
          .dropdown-trigger {
            .label-dropdown-trigger {
              background: none;
              border: none;
              color: $font-color;
              font-weight: bold;
              font-size: 16px;

              .br-flag {
                width: 20px !important;
                position: relative;
                top: 2px;
                left: 2px;
              }

              div {
                img {
                  position: relative;
                  top: 2px;
                  left: -3px;
                }
              }
            }
            .label-dropdown-trigger:hover {
              font-size: 17px;

              .icon.is-small {
                width: 17px;
              }

              .br-flag {
                width: 21px !important;
              }
            }
          }
        }

        .dropdown-menu {
          .dropdown-content {
            height: 97px;
            width: 90px;
            float: right;

            .dropdown-item {
              color: var(--primary-gray-color);
              text-align: center;
              padding: 0px;
              transition: color 2s;

              span {
                margin-left: 7.5px;
                vertical-align: super;
              }

              img {
                width: 20px;
                height: 20px;
              }

              .br-flag {
                width: 25px;
                height: 25px;
              }
            }
          }
        }
      }
      .navbar-item:hover {
        font-size: 17px;
      }
    }
  }
}
</style>
