<template>
  <div class="middle-center">
    <ul>
      <li>
        <div>
          <i @click="setTopicInFocus('work-experience')" class="icon-work" />
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
import { mapActions } from 'vuex'

export default {
  name: 'MiddleCenter',

  computed: {
  },

  data () {
    return {
    }
  },

  methods: {
    ...mapActions(['setTopicInFocus'])
  }
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
          transition: color 2s, font-size 1s;

          &::before {
            transition: color 2s;
            color: $font-color;
          }
        }

        i:hover {
          color: $blue-2;
          font-size: 165px;

          &::before {
            color: $blue-2 !important;
          }
        }
      }
    }

    li:last-of-type {
      div {
        i {
          font-size: 260px;
        }

        i:hover {
          color: $blue-2;
          font-size: 286px;
        }
      }
    }
  }
}
</style>
