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
