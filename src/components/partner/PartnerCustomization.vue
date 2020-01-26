<template>
  <div class="partner-customization">
    <b-loading :active.sync="isPartnerLoading" :is-full-page="false" />
    <header>
      <breadcrumbs :links="links" v-if="links.length" />
      <input
        v-model="partner.name" type="text" name="partnerName"
        class="partner-name" @input="updateName"
        :class="{'is-empty': emptyField('name') }"
      >
      <div class="columns is-gapless">
        <div class="column is-one-fifth">
          {{ this.$t('partner.company-id') }}:
          <input
            v-model="partner.company_id" type="text" name="companyId"
            class="partner-id" @input="updateCompanyId"
            :class="{'is-empty': emptyField('company_id') }"
          >
        </div>
        <div class="column has-text-right is-one-fifth">
          {{ this.$t('partner.business-unit-id') }}:
          <input
            v-model="partner.business_unit_id" type="text" name="businessUnitId"
            class="partner-id" @input="updateBusinessUnitId"
            :class="{'is-empty': emptyField('business_unit_id') }"
          >
        </div>
        <div class="column has-text-right is-three-fifths">
          {{ this.$t('partner.onesignal-id') }}:
          <input
            v-model="partner.onesignal_app_id" type="text" name="onesignalId"
            class="partner-id onesignal" @input="updateOnesignalId"
            :class="{'is-empty': emptyField('onesignal_id') }"
          >
        </div>
      </div>
    </header>
    <section class="columns is-gapless">
      <div class="column is-2 logo-actions">
        <upload-logo />
        <upload-icon />
        <div class="actions" v-if="partner.id">
          <span @click="togglePartner" v-if="partner.active">
            <i class="icon-ic_pause" />{{ this.$t('partner.inactivate') }}
          </span>
          <span @click="togglePartner" v-if="!partner.active">
            <i class="icon-ic_restore" />{{ this.$t('partner.activate') }}
          </span>
          <span @click="removePartner">
            <i class="icon-ic_delete" />{{ this.$t('partner.remove') }}
          </span>
        </div>
      </div>
      <div class="column partner-attributes">
        <b-tabs v-model="activeTab">
          <b-tab-item :label="this.$t('partner.colors')">
            <color-scheme />
          </b-tab-item>

          <b-tab-item :label="this.$t('partner.domains')">
            <domain-list />
          </b-tab-item>

          <b-tab-item :label="this.$t('partner.features')">
            <active-features />
          </b-tab-item>
        </b-tabs>

        <div class="has-text-right">
          <button @click="validatePartnerToSave" class="button button-primary" type="submit">
            {{ $t("partner.submit") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UploadLogo from '@/components/partner/UploadLogo.vue'
import UploadIcon from '@/components/partner/UploadIcon.vue'
import ColorScheme from '@/components/partner/ColorScheme.vue'
import DomainList from '@/components/partner/DomainList.vue'
import ActiveFeatures from '@/components/partner/ActiveFeatures.vue'
import Breadcrumbs from '@/components/shared/uikit/Breadcrumbs.vue'
import Event from '@/plugins/event-bus'
import LayoutEvents from '@/plugins/layout-events'

export default {
  name: 'PartnerCustomization',

  components: {
    UploadLogo,
    UploadIcon,
    Breadcrumbs,
    ColorScheme,
    DomainList,
    ActiveFeatures
  },

  data () {
    return {
      links: [],
      activeTab: 0,
      partnerToSave: undefined
    }
  },

  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      isPartnerLoading: 'isLoading'
    })
  },

  mounted () {
    this.leaveBreadcrumbs()
  },

  methods: {
    ...mapActions([
      'setPartnerName',
      'setCompanyId',
      'setBusinessUnitId',
      'setOnesignalId',
      'togglePartnerActive',
      'deletePartner',
      'patchPartner',
      'postPartner'
    ]),

    emptyField (field) {
      return _.isNil(this.partner[field]) || _.isEmpty(this.partner[field])
    },

    updateName (e) {
      this.setPartnerName(e.target.value)
    },

    updateCompanyId (e) {
      this.setCompanyId(e.target.value)
    },

    updateBusinessUnitId (e) {
      this.setBusinessUnitId(e.target.value)
    },

    updateOnesignalId (e) {
      this.setOnesignalId(e.target.value)
    },

    async togglePartner () {
      try {
        await this.togglePartnerActive({
          id: this.partner.id,
          status: !this.partner.active
        })
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('partner.status-response-message'), type: 'is-success' }
        )
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    async removePartner () {
      try {
        await this.deletePartner(this.partner.id)
        this.$router.push({ name: 'home' })
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('partner.delete-response-message'), type: 'is-success' }
        )
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    validatePartnerToSave () {
      if (
        _.isEmpty(this.partner.name) ||
        _.isNil(this.partner.logo_url) ||
        _.isNil(this.partner.icon_url) ||
        _.isNil(this.partner.onesignal_app_id) ||
        _.isEmpty(this.partner.domains)) {
        this.$snackbar.open({
          message: this.$t('partner.required-validation'),
          type: 'is-warning'
        })
        return
      }

      this.savePartner()
    },

    savePartner () {
      this.partnerToSave = _.clone(this.partner)
      this.partnerToSave.features = _.map(this.partner.features, (feature) => {
        const payload = {
          id: feature.id,
          enabled: true
        }
        if (feature.children) {
          const childrenToSave = _.map(feature.children, child => ({
            id: child.id,
            enabled: true
          }))
          payload.children = childrenToSave
        }
        return payload
      })

      if (this.partner.id) {
        this.updatePartner()
        return
      }

      this.createPartner()
    },

    async updatePartner () {
      try {
        await this.patchPartner(this.partnerToSave)
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('partner.update-response-message'), type: 'is-success' }
        )
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t(error.response.data.message), type: 'is-danger' }
        )
      }
    },

    async createPartner () {
      try {
        await this.postPartner(this.partnerToSave)
        this.$router.push({ name: 'home' })
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: this.$t('partner.creation-response-message'), type: 'is-success' }
        )
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      }
    },

    leaveBreadcrumbs () {
      const homeLabel = this.$t('partner.partners')
      const addPartnerLabel = this.$t('partner.add-new')
      const editPartnerLabel = this.$t('partner.edit')

      const partnerLabel = this.partner.id ? editPartnerLabel : addPartnerLabel

      this.links.push({
        label: homeLabel,
        route: 'home'
      })

      this.links.push({
        label: partnerLabel,
        route: 'partner'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";
@import "~@/assets/stylesheets/buttons";

.partner-customization {
  min-height: 800px;

  header {
    padding: 30px 5% 0;
    height: 220px;
    background-color: $main-color-3;
    color: $white;

    .partner-name {
      width: 60%;
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

    .columns {
      width: 60%;

      .column {
        padding-top: 15px 0 0 0;

        .partner-id {
          cursor: pointer;
          width: 30%;
          color: $neutral-color-4;
          border: none;
          background: none;
          font-weight: $font-bold;
          border-bottom: 1px solid $neutral-color-2;
          margin-bottom: -1px;

          &.onesignal {
            width: 65%;
          }

          &:focus,
          &:hover,
          &.is-empty {
            outline: none;
          }
        }
      }

    }
  }

  section {
    min-height: 800px;
    background-color: $white;
    margin: -60px 5% 0;
    border-radius: 10px 10px 0 0;

    .logo-actions {
      background-color: $neutral-color-4;
      border-radius: 10px 0 0 0;
      border-right: 1px solid $neutral-color-3;

      span {
        display: block;
        margin: 10px 0 10px 7%;
        cursor: pointer;

        i {
          font-size: 24px;
          padding-right: 2px;

          &:before {
            vertical-align: sub;
          }
        }
      }
    }

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
      padding: 50px 35px;
    }
  }

  .has-text-right {
    padding: 0 35px 25px 0;
  }
}
</style>
