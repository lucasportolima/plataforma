<template>
  <div class="middle-left">
    <ul>
      <li>
        <div>
          <i @click="setTopicInFocus('passions')" class="icon-audio" />
        </div>
      </li>
      <li>
        <div>
          <i @click="setTopicInFocus('education')" class="icon-study" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MiddleLeft',

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

.middle-left {
  height: 100%;

  ul {
    margin-top: 100px;

    li {
      div {
        position: relative;

        i {
          font-size: 160px;
          position: absolute;
          right: 0;
          top: -60px;
          cursor: pointer;
          transition: color 2s, font-size 1s;

          &::before {
            transition: color 2s;
            color: var(--font-color);
          }
        }

        i:hover {
          color: var(--secondary-blue-color);
          font-size: 176px;

          &::before {
            color: var(--secondary-blue-color) !important;
          }
        }
      }
    }

    li:last-of-type {
      div {
        i {
          top: 145px;
        }
      }
    }
  }
}
</style>
