<template>
  <ul>
    <li class="li-section">
      <standard-view-container
        :title="$t('topics.passions')"
        :icon="{'icon-audio': true}"
        :topic="'passions'"
      />
    </li>
    <li class="li-section">
      <standard-view-container
        :title="$t('topics.languages')"
        :icon="{'icon-study': true}"
        :topic="'education'"
      >
        <template>
          <ul class="ul-languages">
            <li class="li-languages">
              <p class="languages-title">
                <img src="~@/assets/images/england.svg" alt="Bandeira da Inglaterra">
                Inglês:
              </p>
              <ul class="languages-levels">
                <li><p><span>Fala:</span> Avançado</p></li>
                <li><p><span>Leitura:</span> Intermediário</p></li>
                <li><p><span>Escrita:</span> Basico</p></li>
              </ul>
            </li>
            <li class="li-languages">
              <p class="languages-title">
                <img src="~@/assets/images/france.svg" alt="Bandeira da França">
                Francês:
              </p>
              <ul class="languages-levels">
                <li><p><span>Fala:</span> Avançado</p></li>
                <li><p><span>Leitura:</span> Intermediário</p></li>
                <li><p><span>Escrita:</span> Basico</p></li>
              </ul>
            </li>
            <li class="li-languages">
              <p class="languages-title">
                <img src="~@/assets/images/brazil-flag.svg" alt="Bandeira do Brazil">
                Português:
              </p>
              <ul class="languages-levels">
                <li><p><span>Fala:</span> Avançado</p></li>
                <li><p><span>Leitura:</span> Intermediário</p></li>
                <li><p><span>Escrita:</span> Basico</p></li>
              </ul>
            </li>
          </ul>
        </template>
      </standard-view-container>
    </li>
  </ul>
</template>

<script>
import { StandardViewContainer } from '@/components/shared/uikit'

export default {
  name: 'PassionsAndLanguages',

  components: {
    StandardViewContainer
  },

  computed: {
  },

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

ul {
  li {
    p {
      color: var(--font-color);
      line-height: 22px;
      text-align: justify;
      transition: color 2s;
    }
  }

  .li-section:first-of-type {
    margin-bottom: 25px;
  }

  .li-section:last-of-type {
    .ul-languages {
      width: calc(100% - 5px);
      float: right;
    }

    .li-languages {
      margin-top: 15px;

      .languages-title {
        color: var(--secondary-blue-color);
        font-weight: bold;
        transition: color 2s;

        img {
          width: 20px;
          position: relative;
          top: 4px;
        }
      }

      .languages-levels{
        width: calc(100% - 5px);
        float: right;
        margin-top: 5px;
        margin-bottom: 10px;

        span {
          font-weight: bold;
        }
      }
    }

    .li-languages:last-of-type {
      .languages-title {
        img {
          width: 24px;
          top: 5px;
        }
      }
    }
  }
}
</style>
