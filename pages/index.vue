<script setup lang="ts">
import { ref } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";

const loading = ref(false);
const articles = ref<NewsArticle[]>([]);

loading.value = true;
onMounted(async () => {
  loading.value = true;
  try {
    const datos: NewsResponse = await $fetch("/api/noticias");
    console.log("Estos son los datos", datos);
    articles.value = datos.results;
  } catch (err) {
    console.error("Error al obtener noticias:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Noticias</h1>
    <div v-if="loading">Cargando noticias...</div>
    <ul v-else>
      <li v-for="article in articles" :key="article.title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <a :href="article.link" target="_blank">Leer más</a>
        <img :src="article.image_url" alt="Image of the new" />
      </li>
    </ul>
  </div>
</template>
