<template>
  <div class="news-banner">
    <b-field>
      <b-upload v-model="image" accept="image/*" drag-drop>
        <section>
          <div class="columns is-gapless">
            <div class="column input-logo">
              <img
                class="logo" v-if="news.banner_url"
                :src="news.banner_url" :alt="news.title"
              >
              <input type="file" @change="onFileChange" accept="image/*">
            </div>
            <div class="column input-helper">
              <article class="media">
                <figure class="media-left">
                  <img src="~@/assets/images/img_select_doc.svg" alt="">
                </figure>
                <div class="media-content">
                  <p>{{ $t("news.banner-instruction") }}</p>
                  <span>{{ $t("news.banner-instruction-helper") }}</span><br>
                  <span>{{ $t("news.banner-instruction-size-helper") }}</span><br>
                </div>
              </article>
            </div>
          </div>
        </section>
      </b-upload>
    </b-field>

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
            :enable-orientation="true"
            :enforce-boundary="true"
            @result="result"
            @update="update"
            :viewport="{ width: 660, height: 350, type: 'square' }"
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
      resizeImage: 50,
      zoom: null,
      file: undefined
    }
  },

  computed: {
    ...mapGetters({
      news: 'getCurrentNews'
    })
  },

  methods: {
    ...mapActions(['setNewsBanner']),

    onFileChange (e) {
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
      const options = { format: 'jpeg', type: 'blob' }

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
        await this.setNewsBanner(image)
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

.news-banner {
  height: 350px;
  border: 2px dashed $neutral-color-3;
  border-radius: 5px;
  margin-bottom: 30px;

  .logo {
    object-fit: cover;
    width: 100%;
    height: 350px;
    border-radius: 5px;
    margin-bottom: -3px;
  }

  /deep/ .upload-draggable {
    border: none;
    width: 100%;
    padding: 0;
  }

  .input-logo {
    height: 350px;
    width: 100%;
    border-radius: 5px;
    background: $input-border-color url("~@/assets/images/ic_logo_gray.svg") no-repeat center center;
    background-size: 50% 50%;
    position: relative;
    margin: -2px 0 0 -2px;

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

  .input-helper {
    display: flex;
    align-items: center;
    justify-content: center;
    .media {
      display: flex;
      align-items: center;

      p {
        color: $neutral-color-1;
        font-size: $body-1;
        line-height: $lh-body-1;
      }

      span {
        color: $main-color-1;
        font-weight: $font-bold;
        font-size: $body-2;
        line-height: $lh-body-2;
      }
    }
  }

  /deep/ .modal-embracon {
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
