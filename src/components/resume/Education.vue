<template>
  <standard-view-container
    :title="$t('topics.education')"
    :icon="{'icon-study': true}"
    :topic="'education'"
  >
    <template>
      <ul>
        <li class="columns">
          <div class="column is-2">
            <CustomMarker year="2010" class="custom-marker" />
          </div>
          <div class="column is-10">
            <p>Instituo Federal de Brasília - IFB</p>
            <p>Análise e Desenvolvimento de Sistemas</p>
            <p>Concluído</p>
          </div>
        </li>
        <li class="columns">
          <div class="column is-2">
            <CustomMarker year="2015" class="custom-marker" />
          </div>
          <div class="column is-10">
            <p>Google</p>
            <p>Gerente</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nemo aut excepturi explicabo, recusandae tenetur laudantium molestias tempora nece.</p>
          </div>
        </li>
      </ul>
    </template>
  </standard-view-container>
</template>

<script>
import CustomMarker from '@/components/shared/Marker.vue'
import { StandardViewContainer } from '@/components/shared/uikit'

export default {
  name: 'Education',

  components: {
    CustomMarker,
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
  margin-top: 25px;

  li {
    .is-2 {
      padding: 0;
      padding-left: 12px;

      .custom-marker {
        position: relative;
        top: 5px;
      }
    }

    p {
      color: var(--font-color);
      line-height: 22px;
      text-align: justify;
    }

    p:nth-of-type(2) {
      font-weight: bold
    }
  }
}
</style>
