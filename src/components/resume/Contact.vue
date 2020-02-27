<template>
  <div class="contact">
    <h2><i class="icon-electronics" /> {{ $t('topics.contact') }}</h2>
    <ul>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-location" />
        </div>
        <div class="column is-10">
          <p>Brasilia-DF Brasil</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-phone" />
        </div>
        <div class="column is-10">
          <p>(61) 98482-2244</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-mail2" />
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
          <i class="icon-instagram" />
        </div>
        <div class="column is-10">
          <p>Instagram</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-linkedin2" />
        </div>
        <div class="column is-10">
          <p>linkedin</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-github" />
        </div>
        <div class="column is-10">
          <p>github</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-blog" />
        </div>
        <div class="column is-10">
          <p>blog</p>
        </div>
      </li>
      <li class="columns">
        <div class="column is-2">
          <i class="icon-drawer" />
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

    i {
      font-weight: bold;
      font-size: $h2-desktop-resume;
      margin-right: 10px;
    }

    i::before {
      color: $blue-1;
    }
  }

  ul {
    margin-top: 25px;
    margin-left: 7.5px;

    li {
      height: 30px;

      i {
        color: $font-color;
        position: relative;
        top: 2px;
        cursor: pointer;
        transition: color 2s;
      }

      p {
        color: $font-color;
        line-height: 22px;
        text-align: justify;
        position: relative;
        left: -40px;
        cursor: pointer;
        transition: color 2s;
      }
    }

    li:hover {
      i, p {
        color: $blue-2;
        font-weight: bold;
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
