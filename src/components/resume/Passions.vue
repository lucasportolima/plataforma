<template>
  <div class="passions">
    <h2 v-if="isMobile">
      <i class="icon-audio" />
      {{ $t('topics.passions') }}
    </h2>
    <standard-view-container
      :title="$t('topics.passions')"
      :icon="{ 'icon-audio': true }"
      :topic="'passions'"
    >
      <template>
        <ul v-if="!isMobile">
          <li data-balloon-length="medium" aria-label="Família & Amigos" data-balloon-pos="up">
            <i class="icon-family" />
          </li>
          <li>
            <i class="icon-music" />
          </li>
          <li>
            <i class="icon-naruto" />
          </li>
          <li>
            <i class="icon-cinema" />
          </li>
          <li>
            <i class="icon-book" />
          </li>
          <li>
            <i class="icon-batman" />
          </li>
          <li>
            <i class="icon-death-star" />
          </li>
          <li>
            <i class="icon-fitness" />
          </li>
          <li>
            <i class="icon-beer" />
          </li>
          <li>
            <i class="icon-soccer" />
          </li>
          <li>
            <i class="icon-coder" />
          </li>
        </ul>
        <ul class="ul__passions" v-if="isMobile">
          <li>
            <ul class="columns is-mobile">
              <li class="column is-3" data-balloon-length="medium" aria-label="Família & Amigos" data-balloon-pos="up">
                <i class="icon-family" />
              </li>
              <li class="column is-3">
                <i class="icon-music" />
              </li>
              <li class="column is-3">
                <i class="icon-naruto" />
              </li>
              <li class="column is-3">
                <i class="icon-cinema" />
              </li>
            </ul>
          </li>
          <li>
            <ul class="columns is-mobile">
              <li class="column is-3">
                <i class="icon-book" />
              </li>
              <li class="column is-3">
                <i class="icon-batman" />
              </li>
              <li class="column is-3">
                <i class="icon-death-star" />
              </li>
              <li class="column is-3">
                <i class="icon-fitness" />
              </li>
            </ul>
          </li>
          <li>
            <ul class="columns is-mobile">
              <li class="column is-4">
                <i class="icon-beer" />
              </li>
              <li class="column is-4">
                <i class="icon-soccer" />
              </li>
              <li class="column is-4">
                <i class="icon-coder" />
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </standard-view-container>
  </div>
</template>

<script>
import { StandardViewContainer } from '@/components/shared/uikit'
import { mapGetters } from 'vuex'

export default {
  name: 'Passions',

  components: {
    StandardViewContainer
  },

  computed: {
    ...mapGetters({
      isMobile: 'isMobile'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.passions {
  width: 100vw;
  height: 60px;
  background-color: var(--blue-shadow);
  padding: 10px 35px;
  transition: background-color 2s;

  /deep/.view-container {
    h2 {
      color: var(--background-color);
      width: fit-content;
      float: left;
      position: relative;
      top: 8px;

      i::before {
        color: var(--background-color);
      }
    }
  }

  /deep/.active {
    h2 {
      color: var(--background-color) !important;
      font-size: $h2-desktop-resume !important;
      i {
        &::before {
          color: var(--background-color) !important;
          font-size: $h2-desktop-resume !important;
        }
      }
    }
  }

  ul {
    display: inline-flex;
    margin: 0 0 0 50px;

    li {
      width: 40px;
      height: 40px;
      background-color: var(--background-color);
      border-radius: 5px;
      margin-left: 57.5px;
      transition: background-color 2s;
      cursor: pointer;

      i {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        height: 100%;
        font-size: 24px;
        color: var(--blue-shadow);
        transition: color 2s;
      }
    }

    li:first-of-type {
      margin-left: 0px;
    }

    [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
      text-align: center !important;
    }

    [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after {
      color: var(--background-color);
      text-align: center !important;
      font-weight: bold;
      background-color: var(--font-color);
    }

    [aria-label][data-balloon-pos]:before {
      border-top-color: var(--font-color);
    }

  }
}

// Mobile
@media only screen and (max-width: 400px) {
  .passions {
    height: 100%;

    h2 {
      text-transform: uppercase;
      font-weight: bold;
      color: var(--background-color);
      font-size: $h2-desktop-resume;
      transition: color 2s, font-size 1s;
      text-align: center;
      margin: 10px;

      i {
        font-weight: bold;
        font-size: $h2-desktop-resume;
        margin-right: 10px;
        transition: color 2s, font-size 1s;
      }

      i::before {
        transition: color 2s;
        color: var(--background-color);
      }
    }

    /deep/.view-container {
      ul {
        background-color: var(--background-color);
        margin: 0px;
        display: block;
        border-radius: 5px !important;

        li {
          width: 100%;
          margin: 0px;

          ul {
            margin: 0;
            display: inline-flex;
            width: 100%;

            li {
              display: inline-flex;
              width: fit-content !important;
              margin: auto;
            }
          }
        }
      }

      .ul__passions {
        padding: 5px 0px 10px 0px;
      }
    }
  }
}
</style>
