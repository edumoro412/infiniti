<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { icons } from "@/assets/icons/icons";
import { useThemeStore } from "~/stores/theme";

const loading = ref(false);
const articles = ref<NewsArticle[]>([]);
const themeStore = useThemeStore();

const darkTheme = computed(() => themeStore.darkTheme);
loading.value = true;
onMounted(async () => {
  loading.value = true;
  try {
    const datos: NewsResponse = await $fetch("/api/news", {
      method: "GET",
    });
    articles.value = datos.results;
  } catch (err) {
    console.error("Error al obtener noticias:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container" :class="{ 'dark-theme': darkTheme }">
    <h1>Noticias</h1>
    <div v-if="loading" class="loader__container">
      <span>{{ icons.loader }}</span>
    </div>
    <ul v-else>
      <li v-for="article in articles" :key="article.title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <a :href="article.link" target="_blank">Leer más</a>
        <img
          :src="article.image_url || '/noticia.png'"
          :alt="`Imagen de la noticia: ${article.title}`"
        />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.container {
  min-height: 100vh;
}
.loader__container {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2em;
}
.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
}
</style>
