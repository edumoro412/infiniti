<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";

definePageMeta({
  middleware: "check-category",
});

const { locale } = useI18n();
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
      const response: NewsResponse = await $fetch(
        `/api/${category.value}?locale=${locale.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
console.log("cateogria", category.value);
onMounted(() => {
  fetchData();
});

const banner = computed(() => {
  switch (category.value) {
    case "sports":
      return "sports_banner.png";
    case "technology":
      return "technology_banner.png";
    case "business":
      return "business_banner.png";
    case "science":
      return "science_banner.png"; //falta
    case "health":
      return "health_banner.png";
    case "entertainment":
      return "entertainment_banner.png"; //mejorar
    default:
      return "news_banner_2.png";
  }
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
      <NewsDisplay :articles="articles" :banner="banner" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader__container {
  background-color: var(--c-secondary);
  min-height: 100vh;
  padding: 10em 0;
  @include flex();
  font-size: 2em;
}
.dark-theme {
  background-color: var(--c-fourth);
  &__icon {
    filter: invert(1);
  }
}
</style>
