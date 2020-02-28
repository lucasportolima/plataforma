<template>
  <div class="middle-right">
    <ul>
      <li>
        <div>
          <i @click="setTopicInFocus('about-me')" class="icon-portrait" />
        </div>
      </li>
      <li>
        <div>
          <i @click="setTopicInFocus('contact')" class="icon-electronics" />
        </div>
      </li>
      <li>
        <div>
          <i @click="setTopicInFocus('skills')" class="icon-clicker" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MiddleRight',

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
          transition: color 2s, font-size 1s;

          &::before {
            transition: color 2s;
            color: $font-color;
          }
        }

        i:hover {
          color: $blue-2;
          font-size: 110px;

          &::before {
            color: $blue-2 !important;
          }
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
