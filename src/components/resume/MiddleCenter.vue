<template>
  <div class="middle-center">
    <ul>
      <li>
        <div>
          <i class="icon-work" />
        </div>
      </li>
      <li>
        <div>
          <i class="icon-laptop" />
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

        i {
          font-size: 150px;
          text-align: center;
          display: block;
          right: 0;
          color: $font-color;
          cursor: pointer;
        }
      }
    }

    li:last-of-type {
      div {
        i {
          font-size: 260px;
        }
      }
    }
  }
}
</style>
