<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { Icon } from "#components";
import { useThemeStore } from "~/stores/theme";

const store = useThemeStore();
const darkTheme = computed(() => store.darkTheme);
const loading = ref(false);
const articles = ref<NewsArticle[]>([]);

const fetchData = async () => {
  const cachedData = localStorage.getItem("newsData");
  const cachedTimestamp = localStorage.getItem("newsTimestamp");
  const currentTime = new Date().getTime();
  if (
    cachedData &&
    cachedTimestamp &&
    currentTime - parseInt(cachedTimestamp) < 5 * 60 * 1000
  ) {
    articles.value = JSON.parse(cachedData);
  } else {
    loading.value = true;
    try {
      const response: NewsResponse = await $fetch("/api/news", {
        method: "GET",
      });
      articles.value = response.results;

      localStorage.setItem("newsData", JSON.stringify(articles.value));
      localStorage.setItem("newsTimestamp", currentTime.toString());
    } catch (err) {
      console.error("Error al obtener noticias:", err);
    } finally {
      loading.value = false;
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="loader__container"
      :class="{ 'dark-theme': darkTheme }"
    >
      <Icon name="line-md:loading-twotone-loop" class="dark-theme__icon" />
    </div>
    <div v-else>
      <NewsDisplay :articles="articles" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader__container {
  background-color: var(--c-fourth);
  min-height: 100vh;
  padding: 10em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}
.dark-theme {
  background-color: var(--c-secondary);
  &__icon {
    filter: invert(1);
  }
}
</style>
