<template>
  <div class="domain-list">
    <section class="header columns">
      <div class="column is-5">
        <head-line-two>
          {{ $t("partner.domain-list") }}
        </head-line-two>
      </div>
      <div class="column">
        <button class="button button-primary" @click="showModal = true">
          {{ this.$t('partner.new-domain') }}
        </button>
      </div>
      <div class="column has-text-right">
        <b-dropdown position="is-bottom-left">
          <button class="button button-transparent" slot="trigger">
            <i class="icon-ic_more" />
          </button>
          <b-dropdown-item @click="removeCheckedDomains">
            <i class="icon-ic_delete" /> {{ $t("partner.remove-selected") }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </section>

    <modal-template @close="resetModal" v-show="showModal">
      <template slot="header">
        <h3>{{ this.$t('partner.domain') }}</h3>
      </template>

      <template slot="body">
        <form @submit.prevent="addNewDomain">
          <b-field>
            <b-input
              v-model="currentDomain"
              @focus="error = ''"
              :placeholder="this.$t('partner.domain-url')"
              :maxlength="255"
              :has-counter="true"
            />
          </b-field>
          <div class="has-text-centered">
            <button
              class="button button-primary"
              :disabled="!currentDomain || currentDomain === partner.domains[currentOrder]"
              type="submit"
            >
              {{ this.$t('partner.add-domain') }}
            </button>
            <p v-if="error">
              {{ error }}
            </p>
          </div>
        </form>
      </template>
    </modal-template>

    <section class="domains">
      <b-table
        :data="tableData"
        :striped="true"
        :checked-rows.sync="checkedRows"
        :checkable="true"
        default-sort="name"
        default-sort-direction="asc"
      >
        <template slot-scope="props">
          <b-table-column field="name" :label="domainsLabel" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="options" label="" width="40">
            <b-dropdown position="is-top-left">
              <button class="button button-transparent" slot="trigger">
                <i class="icon-ic_more" />
              </button>
              <b-dropdown-item @click="editDomain(props.row)">
                <i class="icon-ic_edit" /> {{ $t("partner.edit-dropdown") }}
              </b-dropdown-item>
              <b-dropdown-item @click="removeDomain(props.row)">
                <i class="icon-ic_delete" /> {{ $t("partner.delete-dropdown") }}
              </b-dropdown-item>
            </b-dropdown>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>{{ this.$t('partner.empty-domain-list') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HeadLineTwo from '@/components/shared/uikit/HeadLineTwo.vue'
import ModalTemplate from '@/components/shared/uikit/ModalTemplate.vue'

export default {
  name: 'DomainList',

  components: {
    HeadLineTwo,
    ModalTemplate
  },

  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    }),

    tableData () {
      return _.map(this.partner.domains, (domain, index) => _.zipObject(['name', 'order'], [domain, index]))
    }
  },

  data () {
    return {
      domainsLabel: this.$t('partner.domains'),
      error: undefined,
      currentDomain: undefined,
      currentOrder: undefined,
      showModal: false,
      checkedRows: []
    }
  },

  methods: {
    ...mapActions([
      'setPartnerDomain',
      'removePartnerDomain'
    ]),

    addNewDomain () {
      if (!this.validateDomain()) {
        return
      }
      this.setPartnerDomain({
        name: this.currentDomain,
        order: _.isNil(this.currentOrder) ? this.partner.domains.length : this.currentOrder
      })
      this.resetModal()
    },

    editDomain (domain) {
      this.currentDomain = domain.name
      this.currentOrder = domain.order
      this.showModal = true
    },

    removeDomain (domain) {
      this.removePartnerDomain(domain)
      this.resetModal()
    },

    removeCheckedDomains () {
      this.checkedRows.forEach((row) => {
        this.removePartnerDomain(row)
      })
      this.checkedRows = []
    },

    validateDomain () {
      if (_.includes(this.partner.domains, this.currentDomain)) {
        this.error = this.$t('partner.duplicate-domain')
        return false
      }

      const validDomain = new RegExp(/^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/)
      if (!validDomain.test(this.currentDomain)) {
        this.error = this.$t('partner.invalid-domain')
        return false
      }

      return true
    },

    resetModal () {
      this.currentDomain = null
      this.currentOrder = null
      this.error = null
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.domain-list {
  /deep/ h2 {
    color: $secondary-color-3;
  }

  /deep/ .modal-embracon {
    p {
      margin: 10px 0 -10px;
      height: 0;
    }
  }

  .button-transparent {
    background: none;
    border: none;
    min-width: initial;
    color: $secondary-color-3;
    padding: 0;
    margin: 9px -2px 0 45px;

    &:hover,
    &:focus,
    &:active {
      color: $secondary-color-2;
      box-shadow: none;
    }

    i {
      font-size: 25px;
    }

    @media (max-width: 768px) {
      margin: 9px 2px 0 0;
    }
  }

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
}

</style>
