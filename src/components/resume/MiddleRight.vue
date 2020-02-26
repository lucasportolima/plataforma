<template>
  <div class="middle-right">
    <ul>
      <li>
        <div>
          <i class="icon-portrait" />
        </div>
      </li>
      <li>
        <div>
          <i class="icon-electronics" />
        </div>
      </li>
      <li>
        <div>
          <i class="icon-clicker" />
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

        i {
          font-size: 100px;
          position: absolute;
          left: 0;
          cursor: pointer;
        }
      }
    }

    li:nth-of-type(2) {
      div {
        i {
          top: 130px;
        }
      }
    }

    li:nth-of-type(3) {
      div {
        i {
          top: 260px;
        }
      }
    }
  }
}
</style>
