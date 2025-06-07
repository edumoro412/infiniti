<script setup lang="ts">
import { useThemeStore } from "~/stores/theme";

const route = useRoute();
const router = useRouter();
const store = useThemeStore();
const darkTheme = computed(() => store.darkTheme);
const slug = computed(() => route.params.slug as string);
const { data: article, error } = await useAsyncData("article", () =>
  $fetch("/api/new", {
    query: { slug: slug.value },
  })
);

console.log("=====", article);
if (error.value) {
  router.push("/error");
}
</script>
<template>
  <div class="container">
    <div :class="['new', { 'dark-theme': darkTheme }]">
      <img
        class="new__image"
        :src="article?.results[0].image_url ?? '/noticia.png'"
      />
      <h1 :class="['new__title', { 'dark-theme__title': darkTheme }]">
        {{ article?.results[0].title }}
      </h1>
      <h3 :class="['new__source', { 'dark-theme__source': darkTheme }]">
        <Icon name="famicons:newspaper" /> {{ article?.results[0].source_name }}
      </h3>
      <h3
        v-if="article?.results[0].creator"
        :class="['new__writer', { 'dark-theme__writer': darkTheme }]"
      >
        <Icon name="material-symbols:person-edit" />
        {{ article.results[0].creator[0] }}
      </h3>
      <button :class="['new__button', { 'dark-theme__button': darkTheme }]">
        <a :href="article?.results[0].link" target="_blank">
          {{ $t("new.new_link") }}
        </a>
      </button>
      <p
        :class="['new__description', { 'dark-theme__description': darkTheme }]"
      >
        {{ article?.results[0].description ?? $t("new.no_description") }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 95dvh;
  width: 100%;
  height: 100%;
  color: var(--c-primary);
}
.new {
  padding: 4em 1.5em;
  width: 100%;
  margin: 0 auto;
  color: var(--c-primary);
  line-height: 1.6;

  &__image {
    width: 100%;
    max-height: 31.25rem;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  &__source,
  &__writer {
    @include flex($justify: flex-start);
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-primary);
    margin-bottom: 0.5rem;
  }

  &__writer {
    margin-bottom: 1.5rem;
  }

  &__button {
    display: inline-block;
    background-color: #ff4d4d;
    color: white;
    padding: 0.7em 1.4em;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 1.5rem 0;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e63b3b;
    }
  }

  &__description {
    font-size: 1.125rem;
    color: var(--c-primary);
    margin-top: 2rem;
  }
}

.dark-theme {
  background-color: var(--c-primary);
  color: var(--c-secondary);

  &__writer,
  &__source,
  &__description {
    color: var(--c-secondary);
  }
}
</style>
