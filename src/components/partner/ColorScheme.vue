<template>
  <div class="color-scheme columns">
    <div class="column is-3">
      <color-picker :order="0" />
      <color-picker :order="1" />
    </div>
    <div class="column">
      <color-preview />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ColorPicker from '@/components/partner/ColorPicker.vue'
import ColorPreview from '@/components/partner/ColorPreview.vue'

export default {
  name: 'ColorScheme',

  components: {
    ColorPicker,
    ColorPreview
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

</style>
