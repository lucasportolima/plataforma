<template>
  <standard-view-container
    :topic="'about-me'"
  >
    <template>
      <ul>
        <li>
          <div class="border-spacing">
            <div class="my-photo">
              <img src="~@/assets/images/man.svg" alt="">
            </div>
          </div>
        </li>
        <li>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, eligendi? Magnam, quos! Quaerat vero voluptatum nemo rem repellendus, dolorum ad exercitationem, est in at numquam iure? Aliquam vitae quas eum.
          </p>
        </li>
      </ul>
    </template>
  </standard-view-container>
</template>

<script>
import { StandardViewContainer } from '@/components/shared/uikit'

export default {
  name: 'AboutMe',

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
  li:last-of-type {
    margin-top: 25px;
  }
}

.border-spacing {
  width: 200px;
  height: 185px;
  border-radius: 100%;
  border: 1px solid rgba($color: $font-color, $alpha: 0.6);
  margin: auto;
  transition: border 2s;

  .my-photo {
    background-color: var(--secondary-blue-color);
    width: 96%;
    height: 96%;
    border-radius: 100%;
    position: relative;
    top: 3.5px;
    left: 3.5px;
    transition: background-color 2s;

    img {
      width: 94%;
      height: 104%;
      border-radius: 100%;
      position: relative;
      display: block;
      margin: auto;
      top: -9px;
    }
  }
}

p {
  color: $font-color;
  line-height: 22px;
  text-align: justify;
  width: 70%;
  margin: auto;
}
</style>
