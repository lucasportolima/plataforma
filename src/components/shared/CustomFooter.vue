<template>
  <footer class="footer">
    <div class="columns">
      <div class="column is-6 has-text-centered">
        <ul>
          <li>
            <h3>follow me</h3>
            <p class="social-media-icons">
              <i class="icon-instagram" />
              <i class="icon-linkedin2" />
              <i class="icon-github" />
              <i class="icon-blog" />
              <i class="icon-drawer" />
            </p>
          </li>
          <li v-if="!isMobile">
            <p>
              Desenvolvido em <strong>Brasília-DF</strong>,
              <strong>Brasil</strong> com o
              <strong class="heart">&#x2764;</strong> por
              <strong @click="setTopicInFocus('about-me')">Lucas Porto</strong>.
            </p>
            <p>
              <strong>Copyright &copy; 2020</strong>
            </p>
          </li>
        </ul>
      </div>
      <div class="column is-6 sitemap">
        <ul>
          <li>
            <h3>about me</h3>
            <ul>
              <li @click="setTopicInFocus('work-experience')">
                work experience
              </li>
              <li @click="setTopicInFocus('contact')">
                contact
              </li>
              <li @click="setTopicInFocus('passions')">
                passions
              </li>
              <li @click="setTopicInFocus('education')">
                education
              </li>
              <li @click="setTopicInFocus('skills')">
                skills
              </li>
            </ul>
          </li>
          <li>
            <h3>links</h3>
            <ul>
              <li>pdf resume</li>
              <li>blog</li>
              <li>contact</li>
              <li>portfolio</li>
            </ul>
          </li>
          <li>
            <h3>my apps</h3>
            <ul>
              <li>
                <a
                  href="http://bit.ly/jn-ios" target="_blank" class="app-links__appstore"
                  aria-label="Aplicativo para iPhone"
                ><span class="screen-reader-text" /><img alt="Baixar na App Store" src="https://uploads.jovemnerd.com.br/wp-content/themes/jovemnerd/assets/images/appstore.png"></a>
              </li>
              <li>
                <a
                  href="http://bit.ly/jn-android" target="_blank" class="app-links__playstore"
                  aria-label="Aplicativo para Android"
                ><span class="screen-reader-text" /><img alt="Disponível no Google Play" src="https://uploads.jovemnerd.com.br/wp-content/themes/jovemnerd/assets/images/playstore.png"></a>
              </li>
            </ul>
          </li>
          <li class="author-description" v-if="isMobile">
            <p>
              Desenvolvido em <strong>Brasília-DF</strong>,
              <strong>Brasil</strong> com o
              <strong class="heart">&#x2764;</strong> por
              <strong @click="setTopicInFocus('about-me')">Lucas Porto</strong>.
            </p>
            <p>
              <strong>Copyright &copy; 2020</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CustomFooter',

  methods: {
    ...mapActions(['setTopicInFocus'])
  },

  computed: {
    ...mapGetters({
      isMobile: 'isMobile'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/stylesheets/styleguide";

footer {
  background-color: var(--background-color);
  transition: background-color 2s;
  padding: 3rem 1.5rem 4rem !important;

  .column:first-of-type {
    h3 {
      text-transform: uppercase;
      color: var(--primary-blue-color);
      font-size: $h2-desktop-resume;
      text-align: left;
      transition: color 2s;
    }

    .social-media-icons {
      color: var(--font-color);
      margin-top: 12.5px;
      margin-left: 6.25px;
      text-align: left;
      transition: color 2s;

      i {
        margin-right: 7.5px;
        cursor: pointer;
      }
    }

    li:last-of-type {
      margin-top: 72.5px;

      p {
        color: var(--font-color);
        text-align: left;
        transition: color 2s;

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
          color: var(--font-color);
          transition: color 2s;
        }
      }
    }
  }

  .sitemap {
    margin-left: -30px;

    ul {
      display: inline-flex;
      float: right;

      li {
        margin-left: 100px;

        h3 {
          text-transform: uppercase;
          color: var(--primary-blue-color);
          font-size: $h2-desktop-resume;
          text-align: left;
          width: max-content;
          transition: color 2s;
        }

        ul {
          display: block;
          width: max-content;

          li {
            text-align: left;
            text-transform: capitalize;
            margin: auto;
            margin-top: 10px;
            color: var(--font-color);
            transition: color 2s;
            cursor: pointer;
          }

          li:hover {
            font-weight: bold;
          }
        }
      }
    }
  }
}

// Mobile
@media only screen and (max-width: 400px) {
  .footer {
    ul {
      margin-top: -35px;
      li {
        h3, p {
          text-align: center !important;

          i {
            font-size: 20px !important;
            margin: 0px 10px !important;
          }
        }
      }
      li:last-of-type {
        margin-top: 0px !important;
      }
    }

    .sitemap {
      float: none;
      background-color: var(--background-color);
      transition: background-color 2s;
      display: inline-flex;
      width: 100%;
      margin: auto;
      margin-top: -10px;

      ul {
        margin-top: 10px;
        display: inline-block;
        width: 100%;

        li {
          width: 100%;
          margin: 0;

          h3 {
            text-align: center !important;
            margin: auto;
          }

          ul {
            li {
              text-align: center;
              font-weight: bold;
            }
            li:last-of-type {
              margin-top: 0px !important;
              margin-bottom: 25px;
            }
          }
        }

        .author-description {
          position: relative;
          top: 20px;

          p {
            color: var(--font-color);
            text-align: left;
            transition: color 2s;

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
              color: var(--font-color);
              transition: color 2s;
            }
          }
        }
      }
    }
  }
}
</style>
