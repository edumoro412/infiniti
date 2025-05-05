<script setup lang="ts">
import { ref } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { icons } from "@/assets/icons/icons";

const loading = ref(false);
const articles = ref<NewsArticle[]>([]);

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
  <div>
    <h1>Noticias</h1>
    <div v-if="loading" v-html="icons.loader" class="loader__container"></div>
    <ul v-else>
      <li v-for="article in articles" :key="article.title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <a :href="article.link" target="_blank">Leer más</a>
        <img
          :src="article.image_url || '/noticia.png'"
          alt="Image of the new"
        />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.loader__container {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2em;
}
</style>
