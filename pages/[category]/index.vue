<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";

const store = useThemeStore();
const darkTheme = computed(() => store.darkTheme);
const category = computed(() => useRoute().params.category);
const loading = ref(false);
const articles = ref<NewsArticle[]>([]);
const fetchData = async () => {
  const cachedData = localStorage.getItem(`newsData_${category.value}`);
  const cachedTimestamp = localStorage.getItem(
    `newsTimestamp_${category.value}`
  );
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
      const response: NewsResponse = await $fetch(`/api/${category.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      articles.value = response.results;

      localStorage.setItem(
        `newsData_${category.value}`,
        JSON.stringify(articles.value)
      );
      localStorage.setItem(
        `newsTimestamp_${category.value}`,
        currentTime.toString()
      );
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
  background-color: var(--c-secondary);
  min-height: 100vh;
  padding: 10em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}
.dark-theme {
  background-color: var(--c-fourth);
  &__icon {
    filter: invert(1);
  }
}
</style>
