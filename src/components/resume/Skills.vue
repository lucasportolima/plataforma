<template>
  <div class="skills">
    <h2>Skills</h2>
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
  </div>
</template>

<script>
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'

export default {
  name: 'Skills',

  components: {
    BulmaAccordion,
    BulmaAccordionItem
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

.skills {
  h2 {
    text-transform: uppercase;
    font-weight: bold;
    color: $blue-1;
    font-size: $h2-desktop-resume;
  }

  .my-accordion {
    margin-top: 25px;
    width: calc(100% - 5px);
    float: right;

    .my-accordion-item {
      background-color: $gray-1;
      border-bottom: 1px solid $font-color;

      ul {
        li {
          p {
            margin-bottom: 10px;
            color: $font-color;
          }
        }

        li:not(:last-of-type) {
          margin-bottom: 15px;
        }
      }

      progress {
        background-color: $gray-1;
        border: 1px solid $blue-2;
      }

      progress::-moz-progress-bar {
        background: $gray-1;
        border: 1px solid $blue-2;
        box-shadow: inset 25px 0px 60px -15px $blue-2, 25px 0px 60px -15px $blue-2;
      }

      progress::-webkit-progress-bar {
        background: $gray-1;
        border: 1px solid $blue-2;
        box-shadow: inset 25px 0px 60px -15px $blue-2, 25px 0px 60px -15px $blue-2;
      }

      progress::-moz-progress-value {
        border-radius: 0px;
        background: $blue-2;
      }

      progress::-webkit-progress-value {
        border-radius: 0px;
        background: $blue-2;
      }
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

      p, h4, i {
        color: $font-color !important;
        font-weight: bold !important;
      }
    }

    .card-content {
      padding-top: 0.5rem !important;
    }
  }
}
</style>
