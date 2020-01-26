<template>
  <div class="middle-center">
    <ul>
      <li>
        <div>
          <img src="~@/assets/images/work.svg" alt="">
        </div>
      </li>
      <li>
        <div>
          <img src="~@/assets/images/laptop.svg" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MiddleCenter',

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

.middle-center {
  ul {
    margin-top: 25px;

    li {
      div {
        width: 100%;

        img {
          width: 150px;
          margin: auto;
          display: block;
          right: 0;
        }
      }
    }

    li:last-of-type {
      div {
        img {
          width: 260px;
        }
      }
    }
  }
}
</style>
