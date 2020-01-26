<template>
  <backoffice-stage>
    <template slot="main-backoffice">
      <div class="partner-listing">
        <div class="access-control--header">
          <div class="container">
            <div class="columns is-gapless is-multiline">
              <div class="column">
                <head-line-one>
                  {{ $t("partner.partners") }}
                </head-line-one>
                <a @click="show = true" class="button button-primary button-new-user">
                  {{ $t("partner.new_partner_title_modal") }}
                </a>
              </div>
              <div class="column has-text-right">
                <div class="access-control--search">
                  <i class="icon-ic_search" />
                  <input
                    type="text" v-model="searchInput" class="search-input"
                    placeholder="Pesquisar usuário"
                  >
                </div>
                <b-dropdown :disabled="!checkedRows.length">
                  <button class="button button-transparent" slot="trigger">
                    <i class="icon-ic_more" />
                  </button>
                  <b-dropdown-item @click="removeMultiplePartners(checkedRows)">
                    <i class="icon-ic_delete" />
                    {{ $t("partner.edit-selected-dropdown") }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="toggleMultiplePartners(false, checkedRows)">
                    <i class="icon-ic_pause" />
                    {{ $t("partner.disable-selected-dropdown") }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="toggleMultiplePartners(true, checkedRows)">
                    <i class="icon-ic_restore" />
                    {{ $t("partner.enable-selected-dropdown") }}
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
                v-if="partnerListing"
                :data="isEmpty ? [] : partnerListing"
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
                  <b-table-column field="icon_url" class="image-partner">
                    <img :src="props.row.icon_url" alt="">
                  </b-table-column>
                  <b-table-column
                    field="id" label="ID" class="id-partner"
                    sortable
                  >
                    {{ props.row.id }}
                  </b-table-column>
                  <b-table-column field="name" label="Nome" sortable>
                    {{ props.row.name }}
                  </b-table-column>
                  <b-table-column field="domains" label="Dominios" sortable>
                    {{ props.row.domains.join(', ') }}
                  </b-table-column>
                  <b-table-column field="active" label="Publicado" sortable>
                    <span class="status-type" :class="partnerStatusClass(props.row.active)" />
                    {{ parseActiveLabel(props.row.active) }}
                  </b-table-column>

                  <b-table-column field="options" label="" width="40">
                    <b-dropdown>
                      <button class="button button-transparent" slot="trigger">
                        <i class="icon-ic_more" />
                      </button>
                      <b-dropdown-item
                        @click="editPartner(props.row)"
                      >
                        <i class="icon-ic_edit" />
                        {{ $t("partner.edit-dropdown") }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="toggleConfirmationModal">
                        <i class="icon-ic_delete" />
                        {{ $t("partner.delete-dropdown") }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="editPartnerStatus(props.row)">
                        <i :class="props.row.active ? 'icon-ic_pause' : 'icon-ic_restore'" />
                        <span>
                          {{ props.row.active ? $t("partner.disable-dropdown") : $t("partner.enable-dropdown") }}
                        </span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-table-column>
                  <exclude-partner-confirmation-modal v-if="showConfirmationModal" @cancel="toggleConfirmationModal" @accept="removePartner(props.row.id)" />
                  <b-loading :is-full-page="false" :active.sync="isLoading" />
                </template>
                <template slot="empty">
                  <div class="has-text-centered">
                    <div class="text">
                      <p>{{ $t("partner.empty-partner-listing") }}</p>
                    </div>
                  </div>
                </template>
              </b-table>

              <modal-template @close="show = false" v-show="show">
                <template slot="header">
                  <h3>{{ $t("partner.new_partner_title_modal") }}</h3>
                </template>

                <template slot="body">
                  <form @submit.prevent="newPartnerSubmit">
                    <b-field :label="labelpartnerName">
                      <b-input
                        v-model="partnerName"
                        :placeholder="placeholderPartner"
                        type="text"
                      />
                    </b-field>
                    <div class="columns">
                      <div class="column">
                        <b-field :label="this.$t('partner.company-id')">
                          <b-input
                            v-model="partnerCompanyId"
                            type="text"
                          />
                        </b-field>
                      </div>
                      <div class="column">
                        <b-field :label="this.$t('partner.business-unit-id')">
                          <b-input
                            v-model="partnerBusinessUnitId"
                            type="text"
                          />
                        </b-field>
                      </div>
                    </div>
                    <button :disabled="!disabledButton" class="button button-primary" type="submit">
                      {{ $t("partner.new_partner_button") }}
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
import ExcludePartnerConfirmationModal from '@/components/shared/backoffice/ExcludePartnerConfirmationModal.vue'
import LayoutEvents from '@/plugins/layout-events'
import Event from '@/plugins/event-bus'

export default {
  name: 'PartnerListing',

  components: {
    BackofficeStage,
    HeadLineOne,
    ModalTemplate,
    ExcludePartnerConfirmationModal
  },

  data () {
    return {
      show: false,
      labelpartnerName: this.$t('partner.modal_new_partner_labelPartnerName'),
      placeholderPartner: this.$t('partner.modal_new_partner_placeholderPartnerName'),
      partnerName: '',
      partnerCompanyId: undefined,
      partnerBusinessUnitId: undefined,
      isComponentModalActive: false,
      checkedRows: [],
      defaultSortDirection: 'asc',
      searchInput: null,
      isEmpty: false,
      isStriped: true,
      pagination: {
        currentPage: 1,
        perPage: 8
      },
      showConfirmationModal: false
    }
  },
  watch: {
    searchInput (value) {
      this.searching(value)
    }
  },

  computed: {
    ...mapGetters({
      partnerListing: 'partnerListing',
      paginationTotal: 'partnerListingTotal',
      isLoading: 'isLoading'
    }),

    disabledButton () {
      return this.partnerName
    }

  },

  mounted () {
    this.getPartners()
    this.resetPartner()
  },

  methods: {
    ...mapActions([
      'setPartnerName',
      'setCompanyId',
      'setBusinessUnitId',
      'setPartner',
      'togglePartnerActive',
      'deletePartner',
      'toggleMultiplePartnerStatus',
      'deleteMultiplePartner',
      'getPartnerListing',
      'getPartnerListingSearch',
      'resetPartner'
    ]),

    partnerStatusClass (status) {
      if (status) return 'is-active'
      return 'is-disable'
    },

    newPartnerSubmit () {
      this.resetPartner()
      this.setPartnerName(this.partnerName)
      this.setCompanyId(this.partnerCompanyId)
      this.setBusinessUnitId(this.partnerBusinessUnitId)
      this.$router.push({ name: 'partner' })
    },

    onPageChange (page) {
      if (this.pagination.currentPage !== page) {
        this.pagination.currentPage = page
        this.getPartners()
      }
    },

    async getPartners () {
      try {
        await this.getPartnerListing(
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
    toggleConfirmationModal () {
      this.showConfirmationModal = !this.showConfirmationModal
    },
    async removePartner (id) {
      this.toggleConfirmationModal()
      try {
        await this.deletePartner(id)
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('partner.delete-response-message'), type: 'is-success' }
        )
        this.getPartners()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    async removeMultiplePartners () {
      const partner = {
        ids: _.uniq(this.checkedRows.map(e => e.id))
      }
      this.checkedRows = []
      try {
        await this.deleteMultiplePartner(partner.ids)
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('partner.delete-bulk-response-message'), type: 'is-success' }
        )
        this.getPartners()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    async toggleMultiplePartners (status) {
      const partner = {
        status,
        ids: _.uniq(this.checkedRows.map(e => e.id))
      }
      this.checkedRows = []
      try {
        await this.toggleMultiplePartnerStatus(partner)
        this.getPartners()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    editPartner (partnerInfo) {
      const partner = {
        id: partnerInfo.id,
        name: partnerInfo.name,
        colors: partnerInfo.colors,
        logo_url: partnerInfo.logo_url,
        icon_url: partnerInfo.icon_url,
        active: partnerInfo.active,
        features: partnerInfo.features,
        domains: partnerInfo.domains,
        company_id: partnerInfo.company_id,
        business_unit_id: partnerInfo.business_unit_id,
        onesignal_app_id: partnerInfo.onesignal_app_id
      }
      this.setPartner(partner)
      this.$router.push({ name: 'partner' })
    },

    async editPartnerStatus (partnerStatusInfo) {
      const partner = {
        status: !partnerStatusInfo.active,
        id: partnerStatusInfo.id
      }
      try {
        await this.togglePartnerActive(partner)
        this.getPartners()
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    parseActiveLabel (status) {
      if (status) {
        return this.$t('partner.label_status_true')
      }
      return this.$t('partner.label_status_false')
    },

    async searching (value) {
      if (!_.isEmpty(value)) {
        try {
          await this.getPartnerListingSearch(value)
        } catch (error) {
          const message = _.get(error, 'response.data.message')
          this.$snackbar.open({
            message,
            type: 'is-danger'
          })
        }
      } else {
        this.getPartners()
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

.partner-listing {
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

  .button-new-user {
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

          &.image-partner {
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

          &.id-partner {
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
