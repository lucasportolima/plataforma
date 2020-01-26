<template>
  <div class="marvin-backoffice-stage">
    <header class="header columns is-mobile is-gapless">
      <div class="column">
        <div class="header__logo">
          <i class="icon-ic_menu" @click="toggleMenu" />
          <img class="header__logo--image" src="~@/assets/images/logo.svg" alt="">
        </div>
      </div>
      <div class="column has-text-right">
        <div class="header__login">
          <p class="header__login--name">
            {{ user }}
            <span class="header__login--profile">
              <a @click="logout">
                {{ $t("header.logout") }}
              </a>
            </span>
          </p>
          <img class="header__login--image" src="~@/assets/images/empty-user-photo.png" :alt="user">
        </div>
      </div>
    </header>
    <main class="main">
      <transition name="menu">
        <main-menu v-if="isMenuOpen" />
      </transition>
      <div class="main__content" :class="{'active-menu': isMenuOpen}">
        <section class="main__content--section">
          <slot name="main-backoffice" />
          <footer>
            <p>
              {{ $t("footer.text-embracon") }}
            </p>
          </footer>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AuthService from '@/network/services/auth/auth-service'
import MainMenu from '@/components/shared/backoffice/MainMenu.vue'
import LayoutEvents from '@/plugins/layout-events'
import Event from '@/plugins/event-bus'

export default {
  name: 'BackofficeStage',

  components: {
    MainMenu
  },

  mounted () {
    this.subscribeToDisplayMessage()
  },

  destroyed () {
    Event.unsubscribe(LayoutEvents.DISPLAY_MESSAGE)
  },

  computed: {
    ...mapGetters({
      isMenuOpen: 'isMenuOpen',
      user: 'userName'
    })
  },

  methods: {
    ...mapActions(['toggleMenu']),

    subscribeToDisplayMessage () {
      Event.subscribe(LayoutEvents.DISPLAY_MESSAGE, (payload) => {
        this.$snackbar.open({
          message: payload.message,
          type: payload.type
        })
      })
    },

    logout () {
      AuthService.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/forms";

.marvin-backoffice-stage {
  min-height: 100%;
  .header {
    align-items: center;
    padding: 11px 20px 17px 16px;
    box-sizing: border-box;
    margin-bottom: 0;
    @media (max-width: 768px) {
     padding: 10px 0;
    }
  }
  .main {
    height: 100%;
    .menu-leave-to,
    .menu-enter-active {
      margin-left: -220px;
    }
    .menu-enter-to {
      margin-left: 0;
    }
    .main__content {
      transition: 0.5s ease-in-out;
      &.active-menu {
        margin-left: 220px;
      }
      .main__content--section {
        min-height: 768px;
        @media (min-width: 1500px) {
          min-height: 920px;
        }
        footer {
          background: $neutral-color-4;
          align-items: center;
          p {
            text-align: center;
            padding: 43px 15px 41px;
            color: $neutral-color-5;
            font-size: $caption;
            line-height: $lh-caption;
            img {
              max-height: 17px;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}

.header__logo {
  i {
    cursor: pointer;
    &:before {
      font-size: 24px;
      vertical-align: middle;
    }
  }
  .header__logo--burger {
    vertical-align: middle;
    color: $neutral-color-1;
    font-size: 22px;
    margin-right: 20px;
  }
  .header__logo--image {
    vertical-align: middle;
    display: inline-block;
    max-height: 72px;
  }
}

.header__search {
  /deep/ .control {
    width: 100%;

    input {
      border-radius: 100px !important;
      padding: 10px 15px;
    }
  }
}

.header__login {
  padding: 4px 0 0 0;
  .header__login--name {
    display: inline-block;
    vertical-align: middle;
    color: $main-color-1;
    font-weight: $font-black;
    font-size: $body-1;
    line-height: $lh-body-1 + 2px;
    margin-right: 24px;
    span a {
      display: block;
      font-size: $body-2;
      line-height: $lh-body-2;
      font-weight: $font-normal;
      color: $neutral-color-1;

      &:hover {
        text-decoration: underline;
      }
    }

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 19px;
      margin-right: 20px;

      span {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }

  .header__login--image {
    vertical-align: middle;
    border-radius: 5px;
    max-width: 52px;
    display: inline-block;

    @media (max-width: 768px) {
      display: none;
    }
  }
}

//Responsive mode
@media (max-width: 768px) {
  .marvin-backoffice-stage .header .is-three-fifth {
    display: none;
  }
}
</style>
