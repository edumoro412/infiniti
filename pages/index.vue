<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { Icon } from "#components";
import { useThemeStore } from "~/stores/theme";
import { useI18n } from "vue-i18n";

const store = useThemeStore();
const darkTheme = computed(() => store.darkTheme);
const loading = ref(false);
const articles = ref<NewsArticle[]>([]);
const { locale } = useI18n();

const fetchData = async () => {
  loading.value = true;
  try {
    const response: NewsResponse = await $fetch(
      `/api/news?locale=${locale.value}`,
      {
        method: "GET",
      }
    );
    articles.value = response.results;
    localStorage.setItem("newsData", JSON.stringify(articles.value));
    localStorage.setItem("newsTimestamp", new Date().getTime().toString());
  } catch (err) {
    console.error("Error al obtener noticias:", err);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

watch(
  () => locale.value,
  () => {
    localStorage.removeItem("newsData");
    localStorage.removeItem("newsTimestamp");
    fetchData();
  }
);
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
