<template>
  <backoffice-stage>
    <template slot="main-backoffice">
      <news-creation />
    </template>
  </backoffice-stage>
</template>

<script>
import BackofficeStage from '@/components/shared/backoffice/BackofficeStage.vue'
import NewsCreation from '@/components/news/NewsCreation.vue'

export default {
  name: 'CurrentNews',

  components: {
    BackofficeStage,
    NewsCreation
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.news {
  height: 100%;
  min-height: 800px;
  padding: 40px;
}
</style>
