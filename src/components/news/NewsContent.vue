<template>
  <div class="news-content">
    <news-banner />
    <p>{{ $t("news.content-label") }}</p>
    <vue-editor v-model="newsContent" :editor-toolbar="customToolbar" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewsBanner from '@/components/news/NewsBanner.vue'

export default {
  name: 'NewsContent',

  components: {
    NewsBanner
  },

  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    }
  },

  computed: {
    ...mapGetters({
      news: 'getCurrentNews'
    }),

    newsContent: {
      get () {
        return this.news.content
      },
      set (value) {
        this.setNewsContent(value)
      }
    }
  },

  methods: {
    ...mapActions(['setNewsContent'])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
.news-content {
  background: $neutral-color-4;
  border-radius: 10px;
  padding: 40px;

  p {
    color: $neutral-color-5;
    font-size: $caption;
    line-height: $lh-caption;
  }

  /deep/ .quillWrapper {
    .ql-toolbar {
      border-radius: 5px 5px 0 0;
    }
    .ql-container {
      border-radius: 0 0 5px 5px;

      .ql-editor {
        background: $white;
        border-radius: 0 0 5px 5px;
      }
    }
  }
}
</style>
