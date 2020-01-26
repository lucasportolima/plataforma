<template>
  <backoffice-stage>
    <template slot="main-backoffice">
      <div class="news-listing">
        <div class="access-control--header">
          <div class="container">
            <div class="columns is-gapless is-multiline">
              <div class="column">
                <head-line-one>
                  {{ $t("assessments.title") }}
                </head-line-one>
              </div>
              <div class="column has-text-right">
                <div class="access-control--search">
                  <i class="icon-ic_search" />
                  <input
                    type="text" v-model="searchInput" class="search-input"
                    :placeholder="searchPlaceholder"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="access-control--main">
          <div class="container">
            <div class="access-control--content">
              <b-table
                v-if="assessments"
                :data="isEmpty ? [] : assessments"
                :striped="isStriped"
                :per-page="pagination.perPage"
                paginated
                :current-page.sync="pagination.currentPage"
                :total="2"
                :default-sort-direction="defaultSortDirection"
                :checked-rows.sync="checkedRows"
                default-sort="name"
              >
                <template slot-scope="props">
                  <b-table-column field="partner" class="news-banner">
                    <img :src="logoPartners[props.row.partner]" :alt="props.row.partner">
                  </b-table-column>
                  <b-table-column
                    field="group_quota" :label="$t('assessments.group-quota')" class="news-id"
                    sortable
                  >
                    {{ props.row.group_quota }}
                  </b-table-column>
                  <b-table-column field="name" :label="$t('assessments.name')" sortable>
                    {{ props.row.name }}
                  </b-table-column>
                  <b-table-column
                    field="answer" :label="$t('assessments.answer')" class="answer-table"
                    sortable
                  >
                    <div v-html="props.row.answer" />
                  </b-table-column>
                  <b-table-column field="status" label="Data" sortable>
                    {{ props.row.created_at | moment("D/MM/YYYY") }}
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

export default {
  name: 'Assessments',

  components: {
    BackofficeStage,
    HeadLineOne
  },

  data () {
    return {
      searchPlaceholder: this.$t('assessments.search-placeholder'),
      newsTitle: '',
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
      assessments: 'assessmentsListing',
      assessmentsTotal: 'assessmentsListingTotal',
      partnerListing: 'partnerListing',
      isLoading: 'isLoading'
    }),

    disabledButton () {
      return this.newsTitle
    },

    logoPartners () {
      const urlLogos = {}
      this.partnerListing.forEach((el) => {
        urlLogos[el.name] = el.icon_url
      })
      return urlLogos
    }
  },

  mounted () {
    this.getAssessments()
    this.getPartners()
  },

  methods: {
    ...mapActions([
      'getAssessmentsListing',
      'getAssessmentsListingSearch',
      'getPartnerListing'
    ]),

    async getAssessments () {
      try {
        await this.getAssessmentsListing(
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

    async getPartners () {
      try {
        await this.getPartnerListing(1, 99999)
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

    async searching (value) {
      if (!_.isEmpty(value)) {
        try {
          await this.getAssessmentsListingSearch(value)
        } catch (error) {
          const message = _.get(error, 'response.data.message')
          this.$snackbar.open({
            message,
            type: 'is-danger'
          })
        }
      } else {
        this.getAssessments()
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
            width: 81px;
            padding: 0.75em 0;
            span {
              display: block;
              margin: auto;
              width: fit-content;
            }
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

          &.answer-table {
            max-width: 150px;
            text-align: left;
          }

          &.news-id {
            font-weight: $font-bold;
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
      color: $neutral-color-1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
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
