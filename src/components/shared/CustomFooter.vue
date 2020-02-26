<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Desenvolvido em <strong>Brasília-DF</strong>,
          <strong>Brasil</strong> com o
          <strong class="heart">&#x2764;</strong> por
          <strong>Lucas Porto</strong>.
        </p>
        <p>
          <strong>Copyright &copy; 2020</strong>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CustomFooter'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

footer {
  background-color: $gray-1;

  p {
    color: $font-color;

    strong {
      color: $blue-2;
    }
  }

  p:first-of-type {
    .heart {
      color: red;
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
