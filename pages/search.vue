<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";

const theme = useThemeStore();
const darkTheme = computed(() => theme.darkTheme);

const route = useRoute();
const q = ref(route.query.q as string);

const { data, error } = await useAsyncData("search-news", () =>
  $fetch("/api/search", {
    query: { q: q.value },
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
      <h1>No se encontraron noticias</h1>
      <NuxtLink to="/" class="container__error--button"
        >Volver al inicio</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  padding: 10em 0;
  &__loading {
    @include center();
  }
  &__error {
    @include center();
    flex-direction: column;

    &--button {
      display: block;
    }
  }
}
.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
}
</style>
