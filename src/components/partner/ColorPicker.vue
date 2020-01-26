<template>
  <div class="color-picker">
    <section @click="openModal">
      <i class="icon-ic_plus" v-if="!partner.colors[order]" />
      <div
        :style="{ backgroundColor: partner.colors[order] }"
        class="picked-color" v-if="partner.colors[order]"
      >
        <i class="icon-ic_edit" />
      </div>
      <p>{{ label }}</p>
      <span>{{ partner.colors[order] }}</span>
    </section>
    <modal-template @close="isModalActive = false" v-if="isModalActive">
      <template slot="header">
        <h3>Escolha a {{ label }}</h3>
      </template>
      <template slot="body">
        <chrome-picker v-model="newColor" @input="updateColor" />
        <div class="has-text-centered">
          <button class="button button-primary" @click="closeModal">
            {{ this.$t('partner.chosen-color') }}
          </button>
        </div>
      </template>
    </modal-template>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import { mapActions, mapGetters } from 'vuex'
import ModalTemplate from '@/components/shared/uikit/ModalTemplate.vue'

export default {
  name: 'ColorPicker',

  components: {
    'chrome-picker': Chrome,
    ModalTemplate
  },

  props: {
    order: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data () {
    return {
      isModalActive: false,
      newColor: '',
      colorLabels: ['primary-color', 'secondary-color']
    }
  },

  computed: {
    label () {
      return this.$t(`partner.${this.colorLabels[this.order]}`)
    },

    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },

  methods: {
    ...mapActions(['setPartnerColor']),

    updateColor () {
      this.setPartnerColor({
        value: this.newColor.hex,
        order: this.order
      })
    },

    closeModal () {
      this.isModalActive = false
    },

    openModal () {
      this.isModalActive = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.color-picker {
  margin-bottom: 20px;

  section {
    width: 100%;
    min-height: 215px;
    height: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
    position: relative;
    padding: 12px;
    cursor: pointer;
    border-radius: 8px;

    i {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $white;
      background-color: $neutral-color-3;
      padding: 8px;
      font-size: 40px;
      font-weight: $font-bold;
      border-radius: 50%;
      margin: 0 auto;
      vertical-align: middle;
    }

    .picked-color {
      height: 60%;
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      border-radius: 8px 8px 0 0;

      i {
        position: absolute;
        top: 75%;
        left: 85%;
        color: $secondary-color-3;
        background-color: $white;
        padding: 8px;
        font-size: 24px;
        font-weight: $font-bold;
        border-radius: 50%;
      }
    }

    p {
      color: $neutral-color-1;
      padding-top: 70%;
      padding-bottom: 5%;
      font-weight: $font-bold;
    }

    span {
      color: $secondary-color-3;
      font-size: $h2-headline;
      line-height: $lh-h2-headline;
      font-weight: $font-bold;
    }
  }

  /deep/ .modal-backdrop {
    background: none;
  }

  /deep/ .modal-embracon {
    width: 300px;
    margin-left: -45%;
    padding: 20px 40px 0;

    .has-text-centered {
      margin: 20px 0 0;
    }
  }
}
</style>
