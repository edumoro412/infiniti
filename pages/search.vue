<script setup lang="ts">
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";

const { locale } = useI18n();
const theme = useThemeStore();
const darkTheme = computed(() => theme.darkTheme);

const route = useRoute();
const q = computed(() => route.query.q as string);

const { data, error } = await useAsyncData(
  () =>
    $fetch("/api/search", {
      query: { q: q.value, lang: locale.value },
    }),
  { watch: [q, locale] }
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
    <div v-if="data?.results.length === 0">{{ $t("search.error") }}</div>

    <div v-else class="container__error">
      <h1>{{ $t("search.error") }}</h1>
      <NuxtLink to="/"
        ><button
          class="container__error--button"
          :class="{ 'dark-theme__button': darkTheme }"
        >
          {{ $t("search.return") }}
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
    @include flex(column);
    &--button {
      display: block;
      padding: 0.5em 1.5em;
      border: none;
      border-radius: 0.625rem;
      margin: 1em 0;
      &:hover {
        background-color: var(--c-primary);
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
    color: var(--c-secondary);
    &:hover {
      background-color: var(--c-secondary);
      color: var(--c-primary);
    }
  }
}
</style>
