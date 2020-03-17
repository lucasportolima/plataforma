<template>
  <standard-view-container
    :title="$t('topics.skills')"
    :icon="{'icon-clicker': true}"
    :topic="'skills'"
  >
    <template>
      <BulmaAccordion
        class="my-accordion"
        dropdown
        :icon="'caret'"
        :caret-animation="{
          duration: '.6s',
          timerFunc: 'ease-in-out'
        }"
        :slide="{
          duration: '.9s',
          timerFunc: 'ease'
        }"
      >
        <!-- The wrapper component for all the items -->
        <BulmaAccordionItem class="my-accordion-item">
          <h4 slot="title">
            Front-end
          </h4>
        </BulmaAccordionItem>
        <!-- add as many of these items as you need - fill them with content via the slots -->
        <BulmaAccordionItem class="my-accordion-item">
          <h4 slot="title">
            Back-end
          </h4>
          <div slot="content" class="my-accordion-item-content">
            <ul>
              <li>
                <p>Node JS</p>
                <progress class="progress" value="45" max="100" />
              </li>
              <li>
                <p>Java</p>
                <progress class="progress" value="60" max="100" />
              </li>
              <li>
                <p>Python</p>
                <progress class="progress" value="75" max="100" />
              </li>
            </ul>
          </div>
        </BulmaAccordionItem>
        <BulmaAccordionItem class="my-accordion-item">
          <h4 slot="title">
            Design
          </h4>
          <p slot="content">
            boo
          </p>
          <button class="button is-primary" slot="footer">
            Click Me!
          </button>
        </BulmaAccordionItem>
      </BulmaAccordion>
    </template>
  </standard-view-container>
</template>

<script>
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'
import { StandardViewContainer } from '@/components/shared/uikit'

export default {
  name: 'Skills',

  components: {
    BulmaAccordion,
    BulmaAccordionItem,
    StandardViewContainer
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

.my-accordion {
  margin-top: 25px;
  width: calc(100% - 5px);
  float: right;

  .my-accordion-item {
    background-color: var(--background-color);
    border-bottom: 1px solid var(--font-color);
    transition: background-color 2s, border-bottom-color 2s;

    ul {
      li {
        p {
          margin-bottom: 10px;
          color: var(--font-color);
          transition: color 2s;
        }
      }

      li:not(:last-of-type) {
        margin-bottom: 15px;
      }
    }

    progress {
      background-color: var(--primary-gray-color);
      border: 1px solid var(--secondary-blue-color);
      transition: background-color 2s, border 2s;
    }

    progress::-moz-progress-bar {
      background: var(--primary-gray-color);
      border: 1px solid var(--secondary-blue-color);
      box-shadow: inset 25px 0px 60px -15px var(--secondary-blue-color), 25px 0px 60px -15px var(--secondary-blue-color);
      transition: background-color 2s, border 2s, box-shadow 2s;
    }

    progress::-webkit-progress-bar {
      background: var(--primary-gray-color);
      border: 1px solid var(--secondary-blue-color);
      box-shadow: inset 25px 0px 60px -15px var(--secondary-blue-color), 25px 0px 60px -15px var(--secondary-blue-color);
      transition: background-color 2s, border 2s, box-shadow 2s;
    }

    progress::-moz-progress-value {
      border-radius: 0px;
      background-color: var(--secondary-blue-color);
      transition: background-color 2s;
    }

    progress::-webkit-progress-value {
      border-radius: 0px;
      background: var(--secondary-blue-color);
      transition: background-color 2s;
    }
  }
}
</style>

<style lang="scss">
@import "~@/assets/stylesheets/styleguide";

.my-accordion {
  box-shadow: none !important;

  .card {
    box-shadow: none !important;

    .card-header{
      box-shadow: none !important;
      cursor: pointer !important;

      .card-header-title {
        color: var(--font-color) !important;
        font-weight: bold !important;
        transition: color 2s;
      }

      .card-header-icon {
        color: var(--font-color) !important;
        font-weight: bold !important;
      }
    }

    .card-content {
      padding-top: 0.5rem !important;
    }
  }
}
</style>
