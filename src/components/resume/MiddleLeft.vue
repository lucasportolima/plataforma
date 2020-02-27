<template>
  <div class="middle-left">
    <ul>
      <li>
        <div>
          <i class="icon-audio" />
        </div>
      </li>
      <li>
        <div>
          <i class="icon-study" />
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

        i {
          font-size: 120px;
          position: absolute;
          right: 0;
          cursor: pointer;
          transition: color 2s, font-size 1s;

          &::before {
            transition: color 2s;
            color: $font-color;
          }
        }

        i:hover {
          color: $blue-2;
          font-size: 132px;

          &::before {
            color: $blue-2 !important;
          }
        }
      }
    }

    li:last-of-type {
      div {
        i {
          top: 160px;
        }
      }
    }
  }
}
</style>
