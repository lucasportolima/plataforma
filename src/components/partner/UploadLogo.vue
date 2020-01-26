<template>
  <div class="upload-logo">
    <b-field>
      <b-upload v-model="image" accept="image/*">
        <section class="input-logo">
          <img
            class="logo" v-if="partner.logo_url"
            :src="partner.logo_url" :alt="partner.name"
          >
          <i class="icon-ic_plus" v-if="!partner.logo_url" />
          <i class="icon-ic_edit" v-if="partner.logo_url" />
          <input type="file" @change="onFileChange" accept="image/*">
        </section>
      </b-upload>
    </b-field>
    <p class="upload-logo_infos">
      {{ $t("upload.upload-logo-info") }}
    </p>

    <modal-template @close="show = false" v-show="show">
      <template slot="header">
        <h3>Adicionar foto</h3>
        <p>Arraste para posicionar a imagem</p>
      </template>

      <template slot="body">
        <div class="image-preview">
          <vue-croppie
            ref="croppieRef"
            :enable-resize="false"
            :enable-orientation="false"
            :enforce-boundary="true"
            @result="result"
            @update="update"
            :mouse-wheel-zoom="true"
            :enable-zoom="true"
            :viewport="{ width: 600, height: 200 }"
          />
        </div>

        <div class="rotate">
          <div @click="rotate(90)">
            <img src="~@/assets/images/ic_rotate_left.svg" alt="">
          </div>
          <div @click="rotate(-90)">
            <img src="~@/assets/images/ic_rotate_right.svg" alt="">
          </div>
        </div>

        <div class="buttons">
          <button class="button button-secondary-border" @click="closeModal">
            Cancelar
          </button>
          <button class="button button-primary" @click="setImage">
            Salvar
          </button>
        </div>
      </template>
    </modal-template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModalTemplate from '@/components/shared/uikit/ModalTemplate.vue'
import Event from '@/plugins/event-bus'
import LayoutEvents from '@/plugins/layout-events'

export default {
  name: 'UploadLogo',

  components: {
    ModalTemplate
  },

  data () {
    return {
      cropped: null,
      show: false,
      url: undefined,
      image: [],
      resizeImage: 0,
      zoom: null,
      file: undefined
    }
  },

  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },

  methods: {
    ...mapActions(['setPartnerLogo']),

    onFileChange (e) {
      this.$refs.croppieRef.refresh()
      this.file = e.target.files[0]

      if (!_.isNil(this.file)) {
        this.show = !this.show
        this.url = URL.createObjectURL(this.file)

        this.$refs.croppieRef.bind({
          url: this.url
        })
      }
    },

    setImage () {
      const options = { format: 'png', type: 'blob', size: 'original' }

      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output
        const _this = this

        const reader = new FileReader()
        reader.readAsDataURL(output)
        reader.onloadend = () => (_this.$emit('urlImage', reader.result))

        this.uploadImage(this.cropped)
      })
    },

    async uploadImage (image) {
      try {
        await this.setPartnerLogo(image)
      } catch (error) {
        Event.publish(
          LayoutEvents.DISPLAY_MESSAGE,
          { message: error.response.data.message, type: 'is-danger' }
        )
      } finally {
        this.closeModal()
      }
    },

    closeModal () {
      this.$refs.croppieRef.refresh()
      this.file = null
      this.url = null
      this.show = !this.show
    },

    result (output) {
      this.cropped = output
    },

    update (val) {
      this.zoom = val.zoom
    },
    rotate (rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.upload-logo {
  padding: 8%;

  .logo {
    width: 100%;
    height: auto;
    padding: 0;
    border-radius: 8px;
    margin-bottom: -3px;
  }

  .input-logo {
    width: 100%;
    height: auto;
    min-width: 115px;
    min-height: 156px;
    border-radius: 8px;
    background: $input-border-color;
    background-size: 50% 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    i {
      position: absolute;
      bottom: 2px;
      right: 2px;
      font-weight: $font-bold;
      border-radius: 50%;
      cursor: pointer;

      &.icon-ic_plus {
        font-size: 16px;
        padding: 2px;
        border: 8px solid $white;
        color: $white;
        background: $input-border-color-focus;
      }

      &.icon-ic_edit {
        font-size: 25px;
        color: $input-border-color-focus;
        background: $white;
        padding: 5px;
      }
    }
  }

  .upload-logo_infos {
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    max-width: 160px;
    margin: 0 auto;
  }

  /deep/ .modal-embracon {
    max-width: 780px;
    .rotate {
      img {
        width: 30px;
        padding: 5px;
        border-radius: 5px;
        background: $input-border-color-focus;
      }
    }
  }

  .image-preview {
    height: 300px;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(71,71,71,0.8);
    display: flex;
    img {
      max-width: 100%;
      max-height: 100%;
      min-width: 30%;
      min-height: 30%;
      border-radius: 2.5px;
      display: flex;
      margin: auto;
    }
  }

  .ranger {
    width: 258px;
     p {
      display: flex;
      justify-content: space-between;
      color: $black;
      span {
        color: $neutral-color-2;
      }
    }
  }

  .rotate {
    margin-top: 40px;
    text-align: center;
    display: flex;
    justify-content: center;

    div {
      border-radius: 4px;
      width: 35px;
      height: 35px;

      &:first-child {
        margin-right: 8px;
      }

      img {
        margin: auto;
        width: 20px;
        margin-top: 7px;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    .button {
      width: 100px;

      &.button-secondary-border {
        line-height: 14px;
      }
    }
  }
}

@media (max-width: 768px) {
  .upload-photo {
    /deep/ .modal-embracon {
      max-height: 92%;
    }
  }
}
</style>
