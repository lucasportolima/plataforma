<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Desenvolvido em <strong>Brasília-DF</strong>,
          <strong>Brasil</strong> com o
          <strong class="heart">&#x2764;</strong> por
          <strong @click="setTopicInFocus('about-me')">Lucas Porto</strong>.
        </p>
        <p>
          <strong>Copyright &copy; 2020</strong>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CustomFooter',

  methods: {
    ...mapActions(['setTopicInFocus'])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

footer {
  background-color: var(--primary-gray-color);
  transition: background-color 2s;

  p {
    color: $font-color;

    strong {
      color: var(--secondary-blue-color);
      transition: color 2s;
    }
  }

  p:first-of-type {
    .heart {
      color: red;
    }

    strong:last-of-type {
      cursor: pointer;
    }
  }

  p:last-of-type {
    font-size: 12px;

    strong {
      color: $font-color;
    }
  }
}
</style>
