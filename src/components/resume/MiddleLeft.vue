<template>
  <div class="middle-left">
    <ul>
      <li>
        <div>
          <img src="~@/assets/images/audio.svg" alt="">
        </div>
      </li>
      <li>
        <div>
          <img src="~@/assets/images/study.svg" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MiddleLeft',

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

.middle-left {
  height: 100%;

  ul {
    margin-top: 100px;

    li {
      div {
        position: relative;

        img {
          width: 120px;
          position: absolute;
          right: 0;
        }
      }
    }

    li:last-of-type {
      div {
        img {
          top: 160px;
        }
      }
    }
  }
}
</style>
