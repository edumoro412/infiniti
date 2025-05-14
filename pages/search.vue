<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";

const { locale } = useI18n();
const theme = useThemeStore();
const darkTheme = computed(() => theme.darkTheme);

const route = useRoute();
const q = ref(route.query.q as string);

const { data, error } = await useAsyncData("search-news", () =>
  $fetch("/api/search", {
    query: { q: q.value, lang: locale.value },
  })
);
watch(
  () => route.query.q,
  (newQuery) => {
    q.value = newQuery as string;
    data.value = null;
    useAsyncData("search-news", () =>
      $fetch("/api/search", {
        query: { q: q.value },
      })
    );
  }
);
</script>

<template>
  <div class="container" :class="{ 'dark-theme': darkTheme }">
    <div v-if="!error && !data" class="container__loading">
      <Icon
        name="line-md:loading-twotone-loop"
        class="icon"
        :class="{ 'dark-theme': darkTheme }"
      />
    </div>

    <div v-if="error">❌ Error: {{ error.message }}</div>

    <div v-if="data && data.results.length > 0">
      <NewsDisplay :articles="data.results" />
    </div>

    <div v-if="data && data.results.length === 0" class="container__error">
      <h1>Lo sentimos. No hemos encontraron noticias relacionadas</h1>
      <NuxtLink to="/" class="container__error--button"
        ><button
          class="container__error--button"
          :class="{ 'dark-theme__button': darkTheme }"
        >
          Volver al inicio
        </button></NuxtLink
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  padding: 2em 0;
  &__loading {
    @include center();
  }
  &__error {
    padding: 5em 0;
    @include center();
    flex-direction: column;

    &--button {
      display: block;
      background-color: var(--c-secondary);
      padding: 0.5em 1.5em;
      border: none;
      border-radius: 0.625rem;
      margin: 1em 0;
      &:hover {
        background-color: var(--c-fourth);
        color: var(--c-secondary);
      }
    }
  }
}
.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
  &__button {
    background-color: var(--c-primary);
  }
}
</style>
