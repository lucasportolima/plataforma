<template>
  <div class="active-features columns">
    <div class="available column is-5">
      <section>
        <head-line-three>
          {{ $t("partner.available-features") }}
        </head-line-three>
        <vue-nestable
          v-model="availableFeatures"
          cross-list
          group="features"
          :max-depth="2"
          class="available-list"
          @change="deactivateFeatures"
        >
          <div slot="placeholder" />
          <vue-nestable-handle
            slot-scope="{ item }"
            :item="item"
          >
            <i class="icon-ic_drag_indicator" />
            <i class="icon-ic_default_module" />
            <span>{{ item.name }}</span>
            <i class="icon-ic_arrow" />
          </vue-nestable-handle>
        </vue-nestable>
      </section>
    </div>
    <div class="active column is-7">
      <section class="active-section">
        <head-line-three>
          {{ $t("partner.active-features") }}
        </head-line-three>
        <vue-nestable
          v-model="activeFeatures"
          :max-depth="2"
          cross-list
          group="features"
          @change="updatePartnerFeatures"
          class="active-list"
        >
          <div slot="placeholder" />
          <vue-nestable-handle
            slot-scope="{ item }"
            :item="item"
          >
            <i class="icon-ic_drag_indicator" />
            <i class="icon-ic_default_module" @click="openModalFeature(item.id)" />
            <span>{{ item.name }}</span>
            <i class="icon-ic_arrow" />
          </vue-nestable-handle>
        </vue-nestable>
        <div v-if="openFeature" class="open-feature-active">
          <h2>{{ $t("partner.title-features-contents") }}</h2>
          <ul>
            <li v-for="(feature, index) in listFeaturesContents" :key="`feature-${index}`">
              <h3>{{ feature.label }}</h3>
              <textarea v-model="feature.content_text" />
            </li>
            <p v-if="listFeaturesContents.length < 1">
              {{ $t("partner.text-empty-state") }}
            </p>
          </ul>
          <a class="button button-primary button-back" @click="backFeature">
            <i class="icon-ic_arrow" /> {{ $t("partner.button-back") }}
          </a>
          <a v-if="!listFeaturesContents.length < 1" @click="closeFeature(listFeaturesContents)" class="button button-primary button-save">
            {{ $t("partner.button-save-features") }}
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HeadLineThree from '@/components/shared/uikit/HeadLineThree.vue'

export default {
  name: 'ActiveFeatures',

  components: {
    HeadLineThree
  },

  data () {
    return {
      activeFeatures: [],
      availableFeatures: [],
      listFeaturesContents: [],
      openFeature: false
    }
  },

  computed: {
    ...mapGetters({
      features: 'availableFeatures',
      partner: 'getCurrentPartner',
      featuresContents: 'availableFeaturesContents'
    })
  },

  mounted () {
    this.getAvailableFeatures()
    this.disableSelectedFeatures()
  },

  methods: {
    ...mapActions([
      'getAvailableFeatures',
      'getAvailableFeaturesContents',
      'setPartnerFeatures',
      'editAvailableFeaturesContents'
    ]),

    async openModalFeature (feature) {
      const payload = {
        partnerId: this.partner.id,
        featureId: feature
      }

      await this.getAvailableFeaturesContents(payload)
      this.listFeaturesContents = this.featuresContents
      this.openFeature = !this.openFeature
    },

    backFeature () {
      this.openFeature = !this.openFeature
    },

    closeFeature (editedInfos) {
      const listEditedInfos = {
        partnerId: this.partner.id,
        contents: editedInfos.slice()
      }

      this.editAvailableFeaturesContents(listEditedInfos)
      this.listFeaturesContents = []
      this.openFeature = !this.openFeature
    },

    disableSelectedFeatures () {
      this.activeFeatures = _.filter(this.partner.features, feature => feature.enabled)

      const activeFeaturesIds = _.map(this.activeFeatures, feature => feature.id)

      this.availableFeatures = _.filter(this.features, feature => !activeFeaturesIds.includes(feature.id))
    },

    updatePartnerFeatures () {
      this.activeFeatures = _.map(this.activeFeatures, (feature) => {
        feature.enabled = true
        return feature
      })
      this.setPartnerFeatures(this.activeFeatures)
    },

    deactivateFeatures () {
      this.availableFeatures = _.map(this.availableFeatures, (feature) => {
        feature.enabled = false
        return feature
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.active-features {
  .active section,
  .available section {
    border-radius: 5px;
    padding: 25px;
    background-color: $neutral-color-4;
    height: 100%;
  }

  .available section {
    border: 1px solid $neutral-color-3;

    .icon-ic_arrow:before {
      content: "\e91e";
    }
  }

  .active section {
    border: 2px dashed $neutral-color-3;

    .icon-ic_arrow:before {
      content: "\e91f";
    }

    &.active-section {
      position: relative;

      .open-feature-active {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $neutral-color-4;

        p {
          color: $neutral-color-1;
          font-size: 16px;
          line-height: 19px;
          padding: 10px 24px;
        }

        h2 {
          color: $black;
          font-size: 20px;
          line-height: 24px;
          display: block;
          padding: 20px 24px;
          font-weight: $font-bold;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          text-align: left;
          overflow-y: scroll;
          height: 480px;

          li {
            display: list-item;
            padding: 10px 24px;
            vertical-align: top;

            &:nth-child(2n + 1) {
              background: $neutral-color-3;
            }

            h3 {
              color: $neutral-color-1;
              font-size: 16px;
              line-height: 19px;
              display: inline-block;
              max-width: 32%;
              width: 100%;
              vertical-align: top;
              font-weight: $font-bold;
              box-sizing: border-box;
              margin: 12px 0 0;
            }

            input,
            textarea {
              width: 100%;
              max-width: 68%;
              display: inline-block;
              vertical-align: top;
              box-sizing: border-box;
              background: $white;
              border: 1px solid $input-border-color;
              padding: 11px 9px;
              border-radius: 5px;
              color: $neutral-color-1;
              font-size: 14px;
              font-family: $font-primary;
              line-height: 19px;
              text-align: left;
              outline: none;
            }

            textarea {
              height: 188px;
            }
          }
        }

        .button-save {
          float: right;
          margin: 10px 24px 0;
        }

        .button-back {
          background: $neutral-color-3;
          color: $black;
          margin: 10px 0 0 24px;
        }
      }
    }
  }

  /deep/ h3 {
    margin-bottom: 25px;
  }

  /deep/ .nestable {
    position: relative;
    height: 80%;
    padding: 12px 0;

    &.active-list {
      background: repeating-linear-gradient(
        to right,
        $neutral-color-4,
        $neutral-color-4 40px,
        $neutral-color-3 40px,
        $neutral-color-3 80px
      );
    }

    .nestable-list {
      margin: 0;
      padding: 0 0 0 40px;
      list-style-type: none;
    }

    .nestable-group {
      .nestable-list-empty {
        min-height: 100px;
      }
    }

    & > .nestable-list {
      padding: 0;
    }

    .nestable-item,
    .nestable-item-copy {
      margin: 10px 0 0;

      &:first-child {
        margin-top: 0;
      }

      .nestable-list {
        margin-top: 10px;
      }
    }

    .nestable-item-content {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      display: flex;
      width: 100%;
      max-width: 352px;
      min-height: 60px;
      background: $white;
      border-radius: 5px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);

      &.is-dragging {
        .nestable-list {
          pointer-events: none;
        }

        * {
          opacity: 0;
          filter: alpha(opacity=0);
        }

        &:before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: $input-border-color;
          border: 2px dashed $neutral-color-2;
          border-radius: 5px;
        }
      }
    }

    .nestable-drag-layer {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      pointer-events: none;

      & > .nestable-list {
        position: absolute;
        top: 0;
        left: 0;
        padding: 15px;
        background-color: rgba(63, 63, 63, 0.1);
        border: 1px solid $neutral-color-2;
        border-radius: 5px;
      }
    }

    .nestable [draggable="true"] {
      cursor: move;
    }

    .nestable-handle {
      display: inline;

      .icon-ic_drag_indicator {
        font-size: 25px;
        color: $neutral-color-3;
      }

      .icon-ic_default_module {
        font-size: 25px;
        color: $white;
        background: $neutral-color-3;
        padding: 6px;
        border-radius: 50%;
      }

      span {
        vertical-align: super;
        padding: 5px;
        display: inline-block;
      }

      .icon-ic_arrow {
        font-size: 25px;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
