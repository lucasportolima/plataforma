<template>
  <div class="hero-head">
    <nav class="navbar">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="~@/assets/images/LogoLucas.svg" alt="Logo">
        </div>
        <div v-if="isMobile" class="navbar-item navbar-item-mobile">
          <div
            class="dropdown dropdown-languages is-right"
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
        </div>
        <div v-if="isMobile" class="navbar-item navbar-item-mobile switch-themes">
          <toggle-button
            v-if="modeSelect !== undefined"
            v-model="modeSelect"
            :labels="{ checked: 'Dark', unchecked: 'Light' }"
            :switch-color="{ checked: '#2e4959', unchecked: '#546874' }"
            :color="{ checked: '#2b2b2b', unchecked: '#e8e8e8' }"
            :width="60"
            :height="22"
            :font-size="11"
            :speed="500"
          />
        </div>

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
          <span v-if="!isMobile" class="navbar-item">
            <div
              class="dropdown dropdown-languages is-right"
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
          <span v-if="!isMobile" class="navbar-item switch-themes">
            <toggle-button
              v-if="modeSelect !== undefined"
              v-model="modeSelect"
              :labels="{ checked: 'Dark', unchecked: 'Light' }"
              :switch-color="{ checked: '#2e4959', unchecked: '#546874' }"
              :color="{ checked: '#2b2b2b', unchecked: '#e8e8e8' }"
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
      modeSelected: 'getModeSelected',
      isDarkModeSelected: 'isDarkModeSelected',
      isMobile: 'isMobile'
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
    },
    '$store.state.device.isMobile' () {
      if (!this.isMobile) {
        this.showNav = false
      }
    }
  },

  mounted () {
    this.modeSelect = this.isDarkModeSelected
  },

  data () {
    return {
      showNav: false,
      showDropdownLanguages: false,
      modeSelect: undefined
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

// Default (Desktop)
.hero-head {
  position: fixed;
  width: 100%;
  z-index: 10;
  border-bottom: 1px solid var(--font-color);
  transition: border-bottom-color 2s;

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
          z-index: 10;
        }
      }

      .navbar-burger {
        span {
          height: 2px;
          width: 18px;
          color: var(--background-color);
          transition: color 2s;
        }

        span:nth-of-type(2) {
          margin-top: 1px;
        }

        span:nth-of-type(3) {
          margin-top: 2px;
        }
      }
    }
  }

  .navbar-menu {
    .navbar-end {
      .navbar-item {
        color: #e8e8e8;
        font-weight: bold;
        cursor: pointer;
      }

      .navbar-item:hover {
        font-size: 17px;
      }
    }
  }

  .navbar-menu.is-active {
    background: var(--blueShadow) none repeat scroll 0% 0%;
    box-shadow: inset 99px 99px 1000px -100px #111111;
    opacity: 0.9;
    transition: background-color 2s;

    .navbar-item {
      text-align: center;
    }
  }

  .dropdown-languages {
    .dropdown-trigger {
      .label-dropdown-trigger {
        background: none;
        border: none;
        color: #e8e8e8;
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

  .switch-themes {
    // toggle style modes
    /deep/.v-switch-core {
      transition: background-color 2s !important;
    }

    /deep/.v-switch-label {
      color: var(--font-color) !important;
      font-weight: bold;
      transition: color 2s;
    }

    /deep/.v-switch-button {
      transition: transform 500ms ease 0s, background-color 2s !important;
    }
  }
}

// Mobile
@media only screen and (max-width: 400px) {
  .hero-head {
    width: 100vw;

    .navbar {
      .navbar-brand {
        .navbar-burger:hover {
          background-color: rgba(0, 0, 0, 0) !important;
        }

        .navbar-item {
          img {
            left: -10px;
          }
        }

        .navbar-item:visited {
          background-color: red;
        }

        .navbar-item-mobile {
          position: absolute;
          height: 52px;
        }

        .navbar-item-mobile:nth-child(2) {
          right: 120px;

          .dropdown-languages {
            cursor: pointer;
          }
        }

        .navbar-item-mobile:nth-child(3) {
          right: 40px;
        }
      }
    }

    .dropdown-languages {
      .dropdown-menu {
        .dropdown-content {
          .dropdown-item {
            span {
              font-weight: bold;
              margin: 0;
            }
            img {
              position: relative;
              left: 0;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
