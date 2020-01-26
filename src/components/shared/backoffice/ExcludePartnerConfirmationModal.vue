<template>
  <modal-template class="override-modal modal-exclude-partner">
    <template slot="header">
      <h3> {{ $t("partner.remove-partner-confirmation-title") }}</h3>
    </template>
    <template slot="body">
      <p> {{ $t("partner.remove-partner-confirmation-message") }}</p>
    </template>
    <template slot="footer">
      <div class="columns is-gapless buttons">
        <div class="column is-half">
          <a
            class="cancel-modal button button-primary"
            @click="cancel"
          >
            {{ buttonCancel }}
          </a>
        </div>
        <div class="column is-half">
          <a
            @click="accept"
            class="confirm-modal button button-primary"
          >
            {{ buttonConfirm }}
          </a>
        </div>
      </div>
    </template>
  </modal-template>
</template>

<script>
import ModalTemplate from '@/components/shared/uikit/ModalTemplate.vue'

export default {
  name: 'ExcludePartnerConfirmationModal',

  components: {
    ModalTemplate
  },

  data () {
    return {
      buttonCancel: this.$t('partner.button-cancel'),
      buttonConfirm: this.$t('partner.button-confirm')
    }
  },
  methods: {
    accept () {
      this.$emit('accept')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal-exclude-partner{
    /deep/.modal-embracon{
      max-width: 380px;
      .modal-header h3{
        font-size: 1.7rem;
      }
    }
    .button{
      display: block;
      margin: 0 auto;
      max-width: 100px;
    }
    .cancel-modal{
      float: left;
    }
    .confirm-modal{
      float: right;
    }
  }
</style>
