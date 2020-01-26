<template>
  <div class="contact">
    <h2>Contact</h2>
    <ul>
      <li class="columns">
        <div class="column is-2">
          <img src="~@/assets/images/place.svg" alt="">
        </div>
        <div class="column is-10">
          <p>Brasilia-DF Brasil</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          lp
        </div>
        <div class="column is-10">
          <p>61-995352846</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          lp
        </div>
        <div class="column is-10">
          <p>lucasportolima@live.com</p>
        </div>
      </li>
    </ul>
    <hr>
    <ul>
      <li class="columns">
        <div class="column is-2">
          lp
        </div>
        <div class="column is-10">
          <p>linkedin</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          lp
        </div>
        <div class="column is-10">
          <p>github</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          lp
        </div>
        <div class="column is-10">
          <p>blog</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          lp
        </div>
        <div class="column is-10">
          <p>portifolio</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Contact',

  computed: {
  },

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.contact {
  h2 {
    text-transform: uppercase;
    font-weight: bold;
    color: $blue-1;
    font-size: $h2-desktop-resume;
  }

  ul {
    margin-top: 25px;

    li {
      height: 30px;

      img {
        width: 20px;
        position: relative;
        left: 5px;
      }

      p {
        color: $font-color;
        line-height: 22px;
        text-align: justify;
        position: relative;
        left: -40px;
      }
    }
  }

  hr {
    width: 80%;
    margin: 40px auto 0px auto;
    background: rgba($color: $font-color, $alpha: 0.6)
  }
}
</style>
