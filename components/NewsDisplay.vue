<script setup lang="ts">
import type { NewsArticle } from "~/interfaces/api/new";
import { useThemeStore } from "~/stores/theme";
const themeStore = useThemeStore();

const darkTheme = computed(() => themeStore.darkTheme);
defineProps<{
  articles: NewsArticle[];
}>();
</script>
<template>
  <div class="container" :class="{ 'dark-theme': darkTheme }">
    <h1 class="container__title">{{ $t("news_display.news") }}</h1>
    <FormComponent />
    <ul class="news">
      <li
        v-for="article in articles"
        :key="article.title"
        class="news__item"
        :class="{ 'dark-theme-news': darkTheme }"
      >
        <NuxtLink
          :to="article.link"
          target="_blank"
          alt="noticia"
          :title="article.title"
        >
          <img
            :src="article.image_url || '/noticia.png'"
            :alt="`Imagen de la noticia: ${article.title}`"
            class="news__item--image"
            @error="(e) => { const target = e.target as HTMLImageElement; target.src = '/noticia.png'; }"
          />
          <h2 class="news__item--title">{{ article.title }}</h2>
          <!-- <p>{{ truncText(article.description, 200) }}</p> -->
          <h3 class="news__item--source">
            <Icon name="famicons:newspaper" />{{ article.source_name }}
          </h3>
          <h4 v-if="article.creator" class="news__item--writer">
            <Icon name="material-symbols:person-edit" />{{
              truncText(article.creator[0], 40)
            }}
          </h4>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  padding: 5em 0;
  &__title {
    @include title();
  }
}

.news {
  @include grid(2em);
  &__item {
    min-width: fit-content;
    background-color: var(--c-secondary-dark);
    border-radius: 2em;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    &--title {
      padding: 1em 1em 0.5em;
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.3;
    }
    &--source {
      @include flex($justify: flex-start, $gap: 0.5em);
      padding: 0.5em;
      font-size: 0.9em;
    }
    &--writer {
      @include flex($justify: flex-start, $gap: 0.5em);
      padding: 0 0.5em 2em 0.5em;
      font-size: 0.9em;
    }

    &--image {
      width: 100%;
      max-width: 25rem;
      height: auto;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 1em;
    }
    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    }
  }
}

.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
  &-icon {
    filter: invert(1);
  }
  &-news {
    background-color: var(--c-primary);
  }
}
</style>
