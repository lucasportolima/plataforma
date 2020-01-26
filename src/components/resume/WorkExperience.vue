<template>
  <div class="work-experience">
    <h2>work experience</h2>
    <ul>
      <li class="columns">
        <div class="column is-2">
          <CustomMarker year="2010" class="custom-marker" />
        </div>
        <div class="column is-10">
          <p>Microsoft</p>
          <p>Desenvolvedor</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quae nostrum officia reiciendis quasi quam tempore ipsa esse nisi del.</p>
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
  </div>
</template>

<script>
import CustomMarker from '@/components/shared/Marker.vue'

export default {
  name: 'WorkExperience',

  components: {
    CustomMarker
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

.work-experience {
  h2 {
    text-transform: uppercase;
    font-weight: bold;
    color: $blue-1;
    font-size: $h2-desktop-resume;
  }

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
        color: $font-color;
        line-height: 22px;
        text-align: justify;
      }

      p:nth-of-type(2) {
        font-weight: bold
      }
    }
  }
}
</style>
