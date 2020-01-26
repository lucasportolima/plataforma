<template>
  <div class="news-partners">
    <section class="partners">
      <b-table
        :data="tableData"
        :striped="true"
        :checked-rows.sync="newsPartners"
        checkable
        default-sort="name"
        default-sort-direction="asc"
      >
        <template slot-scope="props">
          <b-table-column field="name" :label="domainsLabel" sortable>
            {{ props.row.name }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>{{ this.$t('partner.empty-partner-listing') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NewsPartners',

  computed: {
    ...mapGetters({
      partners: 'partnerListing',
      news: 'getCurrentNews'
    }),

    tableData () {
      return _.map(this.partners, partner => _.zipObject(['id', 'name'], [partner.id, partner.name]))
    },

    newsPartners: {
      get () {
        return _.intersectionBy(this.tableData, this.news.partners, 'id')
      },
      set (value) {
        this.setNewsPartners(value)
      }
    }
  },

  data () {
    return {
      domainsLabel: this.$t('news.content-partners-label')
    }
  },

  methods: {
    ...mapActions([
      'setNewsPartners'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.news-partners {
  /deep/ .b-table {
    .table-mobile-sort {
      display: none;
    }

    .table {
      border: none;
      border-radius: 10px;
      background: $neutral-color-4;

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
        }

        &:nth-child(2n + 1) {
          background: $white;
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
  }

  /deep/ .b-checkbox.checkbox input[type=checkbox] + .check {
    border: 2px solid $neutral-color-1;
    border-radius: 2px;
    box-shadow: none;
  }
  /deep/ .b-checkbox.checkbox input[type=checkbox]:checked + .check {
    border-color: $main-color-1;
    background-color: $main-color-1;
  }
}

</style>
