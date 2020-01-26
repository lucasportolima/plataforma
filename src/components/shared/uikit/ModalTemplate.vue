<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal-embracon"
        role="dialog"
        v-click-outside="clickOutsideConfig"
      >
        <div class="modal-header">
          <slot name="header" />
          <i class="icon-ic_close" @click="close" />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Modal',

  data () {
    return {
      clickOutsideConfig: {
        handler: this.close,
        middleware: this.clickOutsideMiddleware,
        events: ['dblclick', 'click']
      }
    }
  },

  methods: {
    close () {
      this.$emit('close')
    },

    clickOutsideMiddleware (event, el) {
      return event.target.className === 'modal-backdrop'
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/stylesheets/styleguide";

main {
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

    .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    color: $black;

    .modal-embracon {
      padding: 40px;
      background: #ffffff;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      overflow-x: auto;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      border-radius: 10px;
      width: 100%;
      min-height: 166px;
      max-height: 80%;
      height: auto;
      text-align: left;
      position: relative;
      color: $black;

      .modal-header {
        text-align: center;
        position: relative;

        h3 {
          font-family: $font-secondary;
          font-size: $h2-headline;
          font-weight: $font-bold;
          line-height: $lh-h2-headline;
          color: $secondary-color-3;
        }

        i {
          position: absolute;
          right: -10px;
          top: -15px;
          font-size: 24px;
          cursor: pointer;
          color: $neutral-color-2;
        }
      }

      .modal-body {
        position: relative;
        padding: 30px 0 20px;

        .subtitle {
          font-weight: $font-bold;
          font-size: $h3-headline;
          line-height: $lh-h3-headline;
          color: $black;
          font-family: $font-secondary;
        }
      }
    }
  }

  @media screen and (max-width: 789px) {
      .modal-backdrop {
        .modal-embracom {
          padding: 20px;
          margin: 0px 15px;
        }
      }
    }
}
</style>
