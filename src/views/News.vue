<template>
  <backoffice-stage>
    <template slot="main-backoffice">
      <div class="news-listing">
        <div class="access-control--header">
          <div class="container">
            <div class="columns is-gapless is-multiline">
              <div class="column">
                <head-line-one>
                  {{ $t("news.title") }}
                </head-line-one>
                <a @click="show = true" class="button button-primary button-create">
                  {{ $t("news.create-action") }}
                </a>
              </div>
              <div class="column has-text-right">
                <div class="access-control--search">
                  <i class="icon-ic_search" />
                  <input
                    type="text" v-model="searchInput" class="search-input"
                    :placeholder="searchPlaceholder"
                  >
                </div>
                <b-dropdown :disabled="!checkedRows.length">
                  <button class="button button-transparent" slot="trigger">
                    <i class="icon-ic_more" />
                  </button>
                  <b-dropdown-item @click="removeMultipleNews(checkedRows)">
                    <i class="icon-ic_delete" />
                    {{ $t("news.edit-multiple") }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="toggleMultipleNews(false, checkedRows)">
                    <i class="icon-ic_pause" />
                    {{ $t("news.disable-multiple") }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="toggleMultipleNews(true, checkedRows)">
                    <i class="icon-ic_restore" />
                    {{ $t("news.enable-multiple") }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
        <section class="access-control--main">
          <div class="container">
            <div class="access-control--content">
              <b-table
                v-if="newsListing"
                :data="isEmpty ? [] : newsListing"
                :striped="isStriped"
                :per-page="pagination.perPage"
                paginated
                @page-change="onPageChange"
                :current-page.sync="pagination.currentPage"
                backend-pagination
                :total="paginationTotal"
                :default-sort-direction="defaultSortDirection"
                :checked-rows.sync="checkedRows"
                default-sort="name"
                checkable
              >
                <template slot-scope="props">
                  <b-table-column field="banner_url" class="news-banner">
                    <img :src="props.row.banner_url" :alt="props.row.title">
                  </b-table-column>
                  <b-table-column
                    field="id" label="ID" class="news-id"
                    sortable
                  >
                    {{ props.row.id }}
                  </b-table-column>
                  <b-table-column field="title" :label="labelTitle" sortable>
                    {{ props.row.title }}
                  </b-table-column>
                  <b-table-column field="content" :label="labelContent" sortable>
                    <div v-html="props.row.content.slice(0, 40).concat('...')" />
                  </b-table-column>
                  <b-table-column field="status" :label="labelStatus" sortable>
                    <span class="status-type" :class="newsStatusClass(props.row.published_at)" />
                    {{ parseActiveLabel(props.row.published_at) }}
                  </b-table-column>

                  <b-table-column field="options" label="" width="40">
                    <b-dropdown>
                      <button class="button button-transparent" slot="trigger">
                        <i class="icon-ic_more" />
                      </button>
                      <b-dropdown-item
                        @click="editNews(props.row)"
                      >
                        <i class="icon-ic_edit" />
                        {{ $t("news.edit-dropdown") }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="removeNews(props.row.id)">
                        <i class="icon-ic_delete" />
                        {{ $t("news.delete-dropdown") }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="editNewsStatus(props.row)">
                        <i :class="props.row.published_at ? 'icon-ic_pause' : 'icon-ic_restore'" />
                        <span>
                          {{ props.row.published_at ? $t("news.disable-dropdown") : $t("news.enable-dropdown") }}
                        </span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-table-column>

                  <b-loading :is-full-page="false" :active.sync="isLoading" />
                </template>
                <template slot="empty">
                  <div class="has-text-centered">
                    <div class="text">
                      <p>{{ $t("news.empty-news-listing") }}</p>
                    </div>
                  </div>
                </template>
              </b-table>

              <modal-template @close="show = false" v-show="show">
                <template slot="header">
                  <h3>{{ $t("news.create-modal-title") }}</h3>
                </template>

                <template slot="body">
                  <form @submit.prevent="submitNews">
                    <b-field :label="labelCreateName">
                      <b-input
                        v-model="newsTitle"
                        :placeholder="labelCreatePlaceholder"
                        type="text"
                      />
                    </b-field>
                    <button :disabled="!disabledButton" class="button button-primary" type="submit">
                      {{ $t("news.create-modal-action") }}
                    </button>
                  </form>
                </template>
              </modal-template>
            </div>
          </div>
        </section>
      </div>
    </template>
  </backoffice-stage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BackofficeStage from '@/components/shared/backoffice/BackofficeStage.vue'
import HeadLineOne from '@/components/shared/uikit/HeadLineOne.vue'
import ModalTemplate from '@/components/shared/uikit/ModalTemplate.vue'
import LayoutEvents from '@/plugins/layout-events'
import Event from '@/plugins/event-bus'

export default {
  name: 'NewsListing',

  components: {
    BackofficeStage,
    HeadLineOne,
    ModalTemplate
  },

  data () {
    return {
      show: false,
      searchPlaceholder: this.$t('news.search-placeholder'),
      labelTitle: this.$t('news.single-title'),
      labelContent: this.$t('news.single-content'),
      labelStatus: this.$t('news.single-status'),
      labelCreateName: this.$t('news.create-modal-name'),
      labelCreatePlaceholder: this.$t('news.create-modal-placeholder'),
      newsTitle: '',
      isComponentModalActive: false,
      checkedRows: [],
      defaultSortDirection: 'asc',
      searchInput: null,
      isEmpty: false,
      isStriped: true,
      pagination: {
        currentPage: 1,
        perPage: 8
      }
    }
  },
  watch: {
    searchInput (value) {
      this.searching(value)
    }
  },

  computed: {
    ...mapGetters({
      newsListing: 'newsListing',
      paginationTotal: 'newsListingTotal',
      isLoading: 'isLoading'
    }),

    disabledButton () {
      return this.newsTitle
    }

  },

  mounted () {
    this.getNews()
  },

  methods: {
    ...mapActions([
      'setNewsTitle',
      'setNews',
      'toggleNewsActive',
      'deleteNews',
      'toggleMultipleNewsStatus',
      'deleteMultipleNews',
      'getNewsListing',
      'getNewsListingSearch',
      'resetNews'
    ]),

    newsStatusClass (status) {
      if (status) return 'is-active'
      return 'is-disable'
    },

    submitNews () {
      this.resetNews()
      this.setNewsTitle(this.newsTitle)
      this.$router.push({ name: 'current-news' })
    },

    onPageChange (page) {
      if (this.pagination.currentPage !== page) {
        this.pagination.currentPage = page
        this.getNews()
      }
    },

    async getNews () {
      try {
        await this.getNewsListing(
          this.pagination.currentPage,
          this.pagination.perPage
        )
      } catch (error) {
        if (_.get(error, 'response.status') !== 401) {
          const key = _.get(error.response.data, 'message', 'INVALID_ACCESS_TOKEN')
          const message = this.$t(key)
          this.$snackbar.open({
            message,
            type: 'is-danger'
          })
        }
      }
    },

    async removeNews (id) {
      try {
        await this.deleteNews(id)
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('news.delete-response-message'), type: 'is-success' }
        )
        this.getNews()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    async removeMultipleNews () {
      const ids = _.uniq(this.checkedRows.map(e => e.id))
      this.checkedRows = []
      try {
        await this.deleteMultipleNews(ids)
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('news.delete-bulk-response-message'), type: 'is-success' }
        )
        this.getNews()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    async toggleMultipleNews (status) {
      const payload = {
        status,
        ids: _.uniq(this.checkedRows.map(e => e.id))
      }
      this.checkedRows = []
      try {
        await this.toggleMultipleNewsStatus(payload)
        this.getNews()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    editNews (newsInfo) {
      const news = {
        id: newsInfo.id,
        title: newsInfo.title,
        banner_url: newsInfo.banner_url,
        content: newsInfo.content,
        partners: newsInfo.partners,
        published_at: newsInfo.published_at
      }
      this.setNews(news)
      this.$router.push({ name: 'current-news' })
    },

    async editNewsStatus (newsStatusInfo) {
      const news = {
        status: _.isNil(newsStatusInfo.published_at),
        id: newsStatusInfo.id
      }
      try {
        await this.toggleNewsActive(news)
        this.getNews()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    parseActiveLabel (status) {
      if (status) {
        return this.$t('news.label-status_true')
      }
      return this.$t('news.label-status_false')
    },

    async searching (value) {
      if (!_.isEmpty(value)) {
        try {
          await this.getNewsListingSearch(value)
        } catch (error) {
          const message = _.get(error, 'response.data.message')
          this.$snackbar.open({
            message,
            type: 'is-danger'
          })
        }
      } else {
        this.getNews()
      }
    },

    toggleLoading () {
      this.isLoading = !this.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.news-listing {
  height: 100%;
}

/deep/ .modal-body {
  button {
    display: block;
    min-width: 200px;
    margin: 40px auto 0;
  }
}

.access-control--header {
  background: $main-color-3;
  padding: 72px 3px;
  min-height: 220px;
  box-sizing: border-box;
  box-shadow: inset 0 4px 8px 0 rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 22px 20px;
  }

  /deep/ h1 {
    color: $white;
    display: inline-block;
    vertical-align: middle;
    margin: 0 26px 0 3px;

    @media (max-width: 768px) {
      display: block;
      margin: 0 0 10px 0;
    }
  }

  .button-create {
    display: inline-block;
    vertical-align: sub;
    min-width: 200px;
    font-weight: $font-bold;

    &:hover {
      background: $white;
      color: $main-color-1;
    }

    &:focus,
    &:active {
      background: $main-color-1;
      color: $white;
    }

    @media (max-width: 768px) {
      margin-bottom: 15px;
    }
  }

  .button-transparent {
    background: none;
    border: none;
    min-width: initial;
    color: $white;
    padding: 0;
    margin: 9px -2px 0 45px;
    &:hover,
    &:focus,
    &:active {
      color: $white;
      box-shadow: none;
    }
    i {
      font-size: 25px;
    }

    @media (max-width: 768px) {
      margin: 9px 2px 0 0;
    }
  }

  /deep/ .dropdown-menu {
    left: inherit;
    right: 0;

    .dropdown-content {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
      border-radius: 5px;
      border: none;

      .dropdown-item {
        i {
          font-size: 20px;
          color: $black;
          display: inline-block;
          vertical-align: top;
        }
        &:hover,
        &:active,
        &:focus {
          background: $white;
          color: $neutral-color-1;
        }
        &.is-active {
          background-color: $white;
          color: $neutral-color-1;

          i {
            color: $black;
          }
        }
      }
    }
  }

  .access-control--search {
    border-radius: 5px;
    background: rgba(0,0,0,0.1);
    border: solid 1px rgba(255,255,255,0.3);
    max-width: 310px;
    display: inline-block;
    width: 100%;
    margin-top: 9px;
    position: relative;
    box-sizing: border-box;

    i {
      color: $white;
      font-size: 24px;
      position: absolute;
      top: 7px;
      left: 15px;
    }

    input {
      background: none;
      border: none;
      display: block;
      width: 100%;
      font-family: $font-primary;
      font-size: $body-1;
      line-height: $lh-body-1;
      height: 38px;
      color: $white;
      padding: 10px 20px 11px 55px;

      &::placeholder {
        color: rgba(255,255,255,0.5);
      }

      &:focus,
      &:hover,
      &:active {
        outline: none;
      }
    }

    @media (max-width: 768px) {
      text-align: left;
      float: left;
      width: 90%;
      max-width: inherit;
    }
  }
}

.access-control--main {
  padding: 0 51px;
  box-sizing: border-box;

  .access-control--content {
    border-radius: 10px;
    margin: -60px 0 100px;
  }

  /deep/ .b-table {
    .table-mobile-sort {
      display: none;
    }

    .table {
      border: none;
      border-radius: 10px;

      tr {
        th {
          padding: 1.2em 1.2em;
          border: none;
          vertical-align: middle;

          .th-wrap {
            color: $neutral-color-1;

            span.icon {
              font-size: 1.3rem;
              i {
                font-style: normal;
                font-weight: $font-normal;
                &:before {
                  content: '\e91c';
                  font-family: 'icomoon' !important;
                }
              }
              &.is-desc {
                transform: initial;
                i {
                  &:before {
                    content: '\e91b';
                    font-family: 'icomoon' !important;
                  }
                }
              }
            }
          }
        }

        td {
          border: none;
          padding: 0.75em 1.2em;
          vertical-align: middle;
          color: $neutral-color-1;

          &[data-label="Usuário"] {
            color: $neutral-color-1;
            font-weight: 700;
          }

          &.news-banner {
            width: 41px;
            padding: 0.75em 0;
            img {
              width: 41px;
              height: 41px;
              border-radius: 5px;
            }

            @media (max-width: 768px) {
              padding: 0.75em 1.2em;
              width: inherit;
            }
          }

          &.news-id {
            font-weight: $font-bold;
          }

          .status-type {
            width: 14px;
            height: 14px;
            border-radius: 100px;
            background: $white;
            display: inline-block;
            margin-right: 5px;
            vertical-align: baseline;

            &.is-active {
              background: $sucess;
            }

            &.is-disable {
              background: $neutral-color-3;
            }
          }
        }

        &:nth-child(2n+1) {
          background: $neutral-color-4;
        }

        &.is-checked:nth-child(2n+1) {
          background: $main-color-1;
          td {
            color: $white;
            .button-transparent {
              color: $white;
            }
          }
        }

        &.is-checked:nth-child(2n+2) {
          background: $main-color-1;
          td {
            color: $white;
            .button-transparent {
              color: $white;
            }
          }
        }

        @media (max-width: 768px) {
          border-bottom: none;
          box-shadow: none;
        }
      }

      thead {
        tr {
          background: none !important;
        }
      }

    }

    .button-transparent {
      background: none;
      border: none;
      min-width: initial;
      color: $neutral-color-1;
      &:hover,
      &:focus,
      &:active {
        color: $neutral-color-1;
        box-shadow: none;
      }
      i {
        font-size: 25px;
      }
    }

    .dropdown-menu {
      left: inherit;
      right: 0;

      .dropdown-content {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
        border-radius: 5px;
        border: none;

        .dropdown-item {
          i {
            font-size: 20px;
            color: $black;
            display: inline-block;
            vertical-align: top;
          }
          &:hover,
          &:active,
          &:focus {
            background: $white;
            color: $neutral-color-1;
          }
          &.is-active {
            background-color: $white;
            color: $neutral-color-1;

            i {
              color: $black;
            }
          }
        }
      }
    }

    // Pagination Style
    .level {
      padding: 0 1.5rem 1.5rem;
    }

    .pagination-previous,
    .pagination-next,
    .pagination-link {
      border-radius: 100px;
      background: $white;
      border: none;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
      color: $neutral-color-1;
    }

    .pagination-link.is-current {
      background: $main-color-1;
      font-weight: $font-bold;
      color: $white;
    }

    .pagination-previous,
    .pagination-next {
      span.icon {
        i {
          font-style: normal;
          &:before {
            font-family: 'icomoon' !important;
            font-size: 22px;
            color: $neutral-color-1;
          }
        }
      }
      &:hover,
      &:active,
      &:focus {
        span.icon {
          i {
            &:before {
              color: $main-color-1;
            }
          }
        }
      }
    }
    .pagination-previous {
      span.icon {
        i {
          &:before {
            content: '\e919';
          }
        }
      }
    }
    .pagination-next {
      span.icon {
        i {
          &:before {
            content: '\e91a';
          }
        }
      }
    }

    [disabled].pagination-previous,
    [disabled].pagination-next {
      opacity: 1;
      span.icon {
        i {
          &:before {
            color: $neutral-color-2;
          }
        }
      }
    }
  }

  // Checkbox style
  /deep/ .b-checkbox.checkbox input[type=checkbox] + .check {
    border: 2px solid $neutral-color-1;
    border-radius: 2px;
    box-shadow: none;
  }
  /deep/ .b-checkbox.checkbox input[type=checkbox]:checked + .check {
    border-color: $main-color-1;
    background-color: $main-color-1;
  }

  @media (max-width: 768px) {
    padding: 0 20px;

    .access-control--content {
      border-radius: 10px;
      margin: -20px 0 100px;
    }
  }

  @media (min-width: 1500px) {
    padding: 67px 101px;
    .access-control--content {
      margin: -127px 0 100px;
    }
  }
}
</style>
