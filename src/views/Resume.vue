<template>
  <main class="resume">
    <section class="up columns">
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
    <section class="middle columns">
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
        <PassionsAndLanguages />
      </div>
      <div class="column is-4">
        <Education />
      </div>
      <div class="column is-4">
        <Skills />
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
import PassionsAndLanguages from '@/components/resume/PassionsAndLanguages.vue'
import Education from '@/components/resume/Education.vue'
import Contact from '@/components/resume/Contact.vue'
import Skills from '@/components/resume/Skills.vue'

export default {
  name: 'Resume',

  components: {
    WorkExperience,
    AboutMe,
    MiddleLeft,
    MiddleRight,
    MiddleCenter,
    PassionsAndLanguages,
    Education,
    Contact,
    Skills
  },

  computed: {
  },

  data () {
    return {
      name: 'lucas'
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

.resume {
  background-color: var(--primary-gray-color);
  padding: 25px;
  padding-top: 100px;
  transition: background-color 2s;

  .middle {
    margin-bottom: 30px;
  }

}
</style>
