<template>
  <div class="news-creation">
    <b-loading :active.sync="isNewsLoading" :is-full-page="false" />
    <header>
      <breadcrumbs :links="links" v-if="links.length" />
      <input
        v-model="news.title" type="text" name="newsTitle"
        class="news-title" @input="updateTitle"
        :class="{'is-empty': emptyField('name') }"
      >
    </header>
    <section>
      <b-tabs v-model="activeTab">
        <b-tab-item :label="this.$t('news.single-content')">
          <news-content />
        </b-tab-item>

        <b-tab-item :label="this.$t('news.single-partners')">
          <news-partners />
        </b-tab-item>
      </b-tabs>

      <div class="has-text-right">
        <button @click="cancel" class="button button-secondary">
          {{ $t("news.cancel") }}
        </button>
        <button @click="validateNewsToSave" class="button button-primary" type="submit">
          {{ $t("news.submit") }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewsContent from '@/components/news/NewsContent.vue'
import NewsPartners from '@/components/news/NewsPartners.vue'
import Breadcrumbs from '@/components/shared/uikit/Breadcrumbs.vue'
import Event from '@/plugins/event-bus'
import LayoutEvents from '@/plugins/layout-events'

export default {
  name: 'PartnerCustomization',

  components: {
    Breadcrumbs,
    NewsContent,
    NewsPartners
  },

  data () {
    return {
      links: [],
      activeTab: 0,
      newsToSave: undefined
    }
  },

  computed: {
    ...mapGetters({
      news: 'getCurrentNews',
      isNewsLoading: 'isLoading'
    })
  },

  mounted () {
    this.leaveBreadcrumbs()
  },

  methods: {
    ...mapActions([
      'setNewsTitle',
      'toggleNewsActive',
      'patchNews',
      'postNews',
      'resetNews'
    ]),

    emptyField (field) {
      return _.isNil(this.news[field]) || _.isEmpty(this.news[field])
    },

    updateTitle (e) {
      this.setNewsTitle(e.target.value)
    },

    cancel () {
      this.resetNews()
      this.$router.push({ name: 'news' })
    },

    validateNewsToSave () {
      if (
        _.isEmpty(this.news.title) ||
        _.isNil(this.news.content) ||
        _.isEmpty(this.news.content.replace(/<(?:.|\n)*?>/gm, '').trim()) ||
        _.isNil(this.news.banner_url) ||
        _.isEmpty(this.news.partners)) {
        this.$snackbar.open({
          message: this.$t('news.required-validation'),
          type: 'is-warning'
        })
        return
      }

      this.saveNews()
    },

    saveNews () {
      this.newsToSave = _.clone(this.news)
      this.newsToSave.partners = _.uniq(this.news.partners.map(p => p.id))
      this.newsToSave.publish = true

      if (this.news.id) {
        this.updateNews()
        return
      }

      this.publishNews()
    },

    async updateNews () {
      try {
        await this.patchNews(this.newsToSave)
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('news.update-response-message'), type: 'is-success' }
        )
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t(error.response.data.message), type: 'is-danger' }
        )
      }
    },

    async publishNews () {
      try {
        await this.postNews(this.newsToSave)
        this.$router.push({ name: 'news' })
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('news.creation-response-message'), type: 'is-success' }
        )
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    leaveBreadcrumbs () {
      const newsLabel = this.$t('news.title')
      const publishNewsLabel = this.$t('news.publish')
      const updateNewsLabel = this.$t('news.update')

      const currentNewsLabel = this.news.id ? updateNewsLabel : publishNewsLabel

      this.links.push({
        label: newsLabel,
        route: 'news'
      })

      this.links.push({
        label: currentNewsLabel,
        route: 'current-news'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.news-creation {
  min-height: 800px;

  header {
    padding: 30px 5% 0;
    height: 220px;
    background-color: $main-color-3;
    color: $white;

    .news-title {
      width: 75%;
      cursor: pointer;
      margin: 10px 0 10px;
      border: none;
      background: none;
      color: $white;
      font-weight: $font-bold;
      font-size: $h1-headline;
      line-height: $lh-h1-headline;
      border-bottom: 2px solid $white;

      &:focus,
      &:hover,
      &.is-empty {
        background-color: rgba(255, 255, 255, 0.2);
        outline: none;
      }
    }
  }

  section {
    min-height: 800px;
    background-color: $white;
    margin: -60px 5% 0;
    border-radius: 10px 10px 0 0;

    /deep/ .tabs {
      ul {
        height: 60px;

        li {
          padding: 18px 8px 0;

          a {
            font-weight: $font-bold;
            padding: 0.5em 2em;
            border-bottom: none;
          }

          &.is-active {
            a {
              color: $main-color-1;
              border-bottom: 4px solid $main-color-1;
            }
          }
        }
      }
    }

    /deep/ .tab-content {
      padding: 20px 0;
    }
  }

  .has-text-right {
    padding: 0 35px 25px 0;
    .button {
      margin-left: 15px;
    }
  }
}
</style>
