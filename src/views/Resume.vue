<template>
  <main class="resume">
    <section v-if="!isMobile" class="up columns">
      <div class="column is-4">
        <WorkExperience />
      </div>
      <div class="column is-4">
        <AboutMe />
      </div>
      <div class="column is-4">
        <Contact />
      </div>
    </section>
    <section v-if="isMobile" class="up columns">
      <div class="column is-4">
        <AboutMe />
      </div>
      <div class="column is-4">
        <WorkExperience />
      </div>
      <div class="column is-4">
        <Contact />
      </div>
    </section>
    <section v-if="!isMobile" class="middle columns">
      <div class="column is-4">
        <MiddleLeft />
      </div>
      <div class="column is-4">
        <MiddleCenter />
      </div>
      <div class="column is-4">
        <MiddleRight />
      </div>
    </section>
    <section class="down columns">
      <div class="column is-4">
        <Languages />
      </div>
      <div class="column is-4">
        <Education />
      </div>
      <div class="column is-4">
        <Skills />
      </div>
    </section>
    <section class="passions columns">
      <div class="column is-12">
        <Passions />
      </div>
    </section>
  </main>
</template>

<script>
import WorkExperience from '@/components/resume/WorkExperience.vue'
import AboutMe from '@/components/resume/AboutMe.vue'
import MiddleLeft from '@/components/resume/MiddleLeft.vue'
import MiddleRight from '@/components/resume/MiddleRight.vue'
import MiddleCenter from '@/components/resume/MiddleCenter.vue'
import Languages from '@/components/resume/Languages.vue'
import Passions from '@/components/resume/Passions.vue'
import Education from '@/components/resume/Education.vue'
import Contact from '@/components/resume/Contact.vue'
import Skills from '@/components/resume/Skills.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Resume',

  components: {
    WorkExperience,
    AboutMe,
    MiddleLeft,
    MiddleRight,
    MiddleCenter,
    Languages,
    Passions,
    Education,
    Contact,
    Skills
  },

  computed: {
    ...mapGetters({
      isMobile: 'isMobile'
    })
  },

  data () {
    return {
      name: 'Resume'
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.resume {
  background-color: var(--background-color);
  padding: 25px;
  padding-top: 100px;
  transition: background-color 2s;

  .middle {
    margin-bottom: 30px;
  }

  .passions.columns {
    width: 100vw;
    padding: 0;
    margin: 30px -25px 0px;

    div.column.is-12 {
      padding: 0;
    }
  }

}

// Mobile
@media only screen and (max-width: 400px) {
  .resume {
    .up {
      margin-top: -45px;
    }
  }
}
</style>
