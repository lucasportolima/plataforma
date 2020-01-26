<template>
  <div class="middle-right">
    <ul>
      <li>
        <div>
          <img src="~@/assets/images/portrait.svg" alt="">
        </div>
      </li>
      <li>
        <div>
          <img src="~@/assets/images/electronics.svg" alt="">
        </div>
      </li>
      <li>
        <div>
          <img src="~@/assets/images/clicker.svg" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MiddleRight',

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

.middle-right {
  height: 100%;

  ul {
    margin-top: 40px;

    li {
      div {
        position: relative;

        img {
          width: 100px;
          position: absolute;
          left: 0;
        }
      }
    }

    li:nth-of-type(2) {
      div {
        img {
          top: 130px;
        }
      }
    }

    li:nth-of-type(3) {
      div {
        img {
          top: 260px;
        }
      }
    }
  }
}
</style>
