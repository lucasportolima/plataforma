<template>
  <div class="user-authentication">
    <head-line-one>
      {{ $t("login.user-authentication_title") }}
    </head-line-one>
    <form :autocomplete="autoComplete" @submit.prevent="signIn">
      <b-field :label="labelUsername" :class="{'is-danger': validation.hasError('username')}">
        <b-input
          v-model.lazy="username"
          @blur="$validate('username')"
        />
        <p v-if="validation.hasError('username')" class="help is-danger">
          {{ $t("error-input.username-error") }}
        </p>
      </b-field>
      <b-field :label="labelPassword" :class="{'is-danger': validation.hasError('password')}">
        <b-input
          v-model.lazy="password"
          @blur="$validate('password')"
          type="password"
          password-reveal
        />
        <p v-if="validation.hasError('password')" class="help is-danger">
          {{ $t("error-input.password-error") }}
        </p>
      </b-field>
      <button :disabled="invalidForm" class="button button-primary" type="submit">
        {{ $t("login.user-authentication_button") }}
      </button>
    </form>
    <b-loading :is-full-page="false" :active.sync="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HeadLineOne from '@/components/shared/uikit/HeadLineOne.vue'
import AuthService from '@/network/services/auth/auth-service'
import LoginService from '@/network/services/login/login-service'

export default {
  name: 'UserAuthentication',

  components: {
    HeadLineOne
  },

  data () {
    return {
      labelUsername: this.$t('login.user-authentication_labeluser'),
      labelPassword: this.$t('login.user-authentication_labelpassword'),
      isLoading: false,
      username: '',
      password: '',
      autoComplete: undefined
    }
  },

  computed: {
    invalidForm () {
      return !this.validation.isPassed('username') || !this.validation.isPassed('password')
    }
  },

  validators: {
    username (value) {
      return this.$validator.value(value).required()
    },
    password (value) {
      return this.$validator.value(value).required()
    }
  },

  methods: {
    ...mapActions(['setUserName']),

    activeAutoComplete () {
      this.autoComplete = 'on'
    },

    async signIn () {
      this.toggleLoading()

      const payload = {
        username: this.username,
        password: this.password
      }

      try {
        const response = await LoginService.post(payload)
        AuthService.setToken(response.headers.authorization)
        AuthService.setMe(response.data)
        this.setUserName(this.username)
        this.$router.push({ name: 'home' })
      } catch (error) {
        const key = _.get(error.response.data, 'message', 'LOGIN_FAILED')
        const message = this.$t(`login.${key}`)
        this.$snackbar.open({
          message,
          type: 'is-danger'
        })
      } finally {
        this.toggleLoading()
      }
    },

    toggleLoading () {
      this.isLoading = !this.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/forms";
@import "~@/assets/stylesheets/buttons";

.user-authentication {
  position: relative;

  /deep/ h1 {
    margin: 0 0 20px;
  }

  .link-reset-password {
    text-align: right;
    a {
      font-size: $caption;
      line-height: $lh-caption;
      color: $neutral-color-1;
    }
  }
}

//Responsive Mode
@media (max-width: 768px) {
  .user-authentication .link-reset-password {
    text-align: left;
  }
}
</style>
