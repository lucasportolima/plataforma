<template>
  <backoffice-stage>
    <template slot="main-backoffice">
      <partner-customization />
    </template>
  </backoffice-stage>
</template>

<script>
import BackofficeStage from '@/components/shared/backoffice/BackofficeStage.vue'
import PartnerCustomization from '@/components/partner/PartnerCustomization.vue'

export default {
  name: 'Partner',

  components: {
    BackofficeStage,
    PartnerCustomization
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.partner {
  height: 100%;
  min-height: 800px;
  padding: 40px;
}
</style>
