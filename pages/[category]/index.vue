<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";

const category = computed(() => useRoute().params.category);
const loading = ref(false);
const articles = ref<NewsArticle[]>([]);
const themeStore = useThemeStore();
const darkTheme = computed(() => themeStore.darkTheme);
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
  <div class="container" :class="{ 'dark-theme': darkTheme }">
    <h1>Noticias</h1>
    <div v-if="loading" class="loader__container">
      <Icon name="line-md:loading-twotone-loop" />
    </div>
    <ul v-else>
      <li v-for="article in articles" :key="article.title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <a :href="article.link" target="_blank">Leer más</a>
        <img
          :src="article.image_url || '/noticia.png'"
          alt="Imagen de la noticia"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  padding: 2em;
}
.loader__container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  padding: 5em;
}
.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
}
</style>
