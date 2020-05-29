<template>
  <div class="passions">
    <standard-view-container
      :title="$t('topics.passions')"
      :icon="{ 'icon-audio': true }"
      :topic="'passions'"
    >
      <template>
        <ul>
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
      </template>
    </standard-view-container>
  </div>
</template>

<script>
import { StandardViewContainer } from '@/components/shared/uikit'

export default {
  name: 'Passions',

  components: {
    StandardViewContainer
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
</style>
