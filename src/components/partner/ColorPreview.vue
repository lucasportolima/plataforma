<template>
  <div class="color-preview">
    <head-line-two>
      {{ $t("partner.color-preview") }}
    </head-line-two>
    <preview class="svg-preview" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeadLineTwo from '@/components/shared/uikit/HeadLineTwo.vue'
import Preview from '@/components/partner/Preview.vue'

export default {
  name: 'ColorPreview',

  components: {
    HeadLineTwo,
    Preview
  },

  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.color-preview {
  padding: 0 0 0 25px;

  .svg-preview {
    margin-top: 20px;
  }
}

</style>
