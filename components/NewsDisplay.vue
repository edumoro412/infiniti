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
          <h2 class="news__item--title">{{ article.title }}</h2>
          <img
            :src="article.image_url || '/noticia.png'"
            :alt="`Imagen de la noticia: ${article.title}`"
            class="news__item--image"
            @error="(e) => { const target = e.target as HTMLImageElement; target.src = '/noticia.png'; }"
          />
          <p>{{ truncText(article.description, 200) }}</p>
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
  @include grid();
  &__item {
    min-width: fit-content;
    padding: 1em;
    background-color: var(--c-secondary);
    border-radius: 2em;
    transition: all 0.2s ease-in-out;
    &--title {
      padding: 1em 0;
    }
    &--image {
      width: 100%;
    }
    &:hover {
      transform: scale(1.02);
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
