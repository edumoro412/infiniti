<script setup lang="ts">
import { ref } from "vue";

interface Noticia {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

const noticias = ref<Noticia[]>([]);
const loading = ref(false);

async function obtenerNoticias() {
  loading.value = true;
  try {
    /* const datos: any = await $fetch("/api/noticias"); */
    /*    noticias.value = datos.news;
    console.log("Noticias obtenidas:", noticias.value); */
  } catch (err) {
    console.error("Error al obtener noticias:", err);
  } finally {
    loading.value = false;
  }
}

obtenerNoticias();
</script>

<template>
  <div>
    <h1>Noticias</h1>
    <div v-if="loading">Cargando noticias...</div>
    <ul v-else>
      <li v-for="noticia in noticias" :key="noticia.id">
        <h2>{{ noticia.title }}</h2>
        <p>{{ noticia.description }}</p>
        <a :href="noticia.url" target="_blank">Leer más</a>
      </li>
    </ul>
  </div>
</template>
