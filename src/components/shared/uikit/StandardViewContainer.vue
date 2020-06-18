<template>
  <div
    class="view-container"
    :class="{
      active: topicInFocus === topic,
      'view-container__skills': topic === 'skills'
    }"
    :ref="topic"
  >
    <h2 :class="{'h2__passions': topic === 'passions'}">
      <i :class="icon" />
      {{ title }}
    </h2>
    <div class="view-container__main">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StandardViewContainer',

  props: {
    title: {
      type: String,
      default: () => '',
      required: false
    },

    topic: {
      type: String,
      default: () => '',
      required: true
    },

    icon: {
      type: Object,
      default: () => {},
      required: false
    }
  },

  computed: {
    ...mapGetters({
      topicInFocus: 'getTopicInFocus'
    })
  },

  watch: {
    '$store.state.resume.topicInFocus' (topicName) {
      if (topicName) {
        this.$nextTick(function () {
          if (this.$refs[topicName]) {
            this.$refs[topicName].scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.view-container {
  h2 {
    text-transform: uppercase;
    font-weight: bold;
    color: var(--primary-blue-color);
    font-size: $h2-desktop-resume;
    transition: color 2s, font-size 1s;

    i {
      font-weight: bold;
      font-size: $h2-desktop-resume;
      margin-right: 10px;
      transition: color 2s, font-size 1s;
    }

    i::before {
      transition: color 2s;
      color: var(--primary-blue-color);
    }
  }
}

.view-container__skills {
  overflow: hidden;
}

.active {
  h2 {
    color: var(--secondary-blue-color);
    font-size: 30px !important;
    i {
      font-size: 30px !important;

      &::before {
        color: var(--secondary-blue-color) !important;
      }
    }
  }

  .border-spacing {
    border: 5px solid var(--secondary-blue-color) !important;
  }
}

// Mobile
@media only screen and (max-width: 400px) {
  .h2__passions {
    display: none;
  }
}
</style>
