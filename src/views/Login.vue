<template>
  <div class="login">
    <main>
      <section class="login-section">
        <img class="login-section_logo" src="~@/assets/images/logo.svg" alt="Embracon">
        <div class="login-section_box">
          <user-authentication />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import UserAuthentication from '@/components/login/UserAuthentication.vue'

export default {
  name: 'Login',

  components: {
    UserAuthentication
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.login {
  height: 100%;
  display: flex;
  background: url(~@/assets/images/bg_login.jpg) top right no-repeat
    $secondary-color-1;
  background-size: cover;

  main {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $white;
    border-left: 20px solid $main-color-1;
    box-sizing: border-box;
    width: 550px;

    .login-section {
      margin: 0 0 0 45%;
      display: block;
      width: 100%;
      max-width: 600px;

      .login-section_logo {
        margin: 25px 0 25px 0px;
      }

      .login-section_box {
        background: $white;
        box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.15);
        max-width: 450px;
        padding: 40px;
        width: 100%;
        min-height: 404px;
      }
    }
  }
}

//Responsive mode
@media (max-width: 768px) {
  .login {
    background: $secondary-color-1;
  }
  .login main {
    height: 380px;
    width: 100%;
    border-top: 10px solid $main-color-1;
    padding: 0 30px;
    border-left: 0;
  }
  .login main .login-section {
    margin: 0 auto;
  }
  .login main .login-section .login-section_box {
    margin: 0 auto;
  }
  .login main .login-section .login-section_logo {
    max-width: 200px;
    margin: 40px auto;
    display: block;
  }
}
</style>
