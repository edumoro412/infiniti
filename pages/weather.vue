<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "~/stores/theme";
import type { Weather } from "~/interfaces/api/weather";
import { initI18n, t } from "~/src/i18n";

const theme = useThemeStore();
const darkTheme = computed(() => theme.darkTheme);
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);
const isLoading = ref(true);

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

onMounted(async () => {
  await new Promise<void>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        resolve();
      },
      () => {
        console.error("Error obteniendo ubicación");
        resolve();
      }
    );
  });
  isLoading.value = false;

  await initI18n();
});

const { data: weatherData } = useFetch<Weather>("/api/weather", {
  query: {
    lat: latitude,
    lon: longitude,
  },
  watch: [latitude, longitude],
  immediate: false,
});
</script>

<template>
  <div class="container" :class="{ 'dark-theme': darkTheme }">
    <h1 class="container__title">{{ t("weather.weather") }}</h1>
    <div v-if="isLoading">{{ t("weather.ubication") }}</div>
    <div v-else-if="weatherData" class="weather">
      <div
        v-for="(day, index) in weatherData.daily.time"
        :key="index"
        class="weather__day"
      >
        <h2 v-if="index === 0">{{ t("weather.today") }}</h2>
        <h2 v-else-if="index === 1">{{ t("weather.tomorrow") }}</h2>
        <h2 v-else>{{ formatDate(day) }}</h2>
        <WeatherIconComponent
          :prec="weatherData.daily.precipitation_sum[index]"
          :max="weatherData.daily.temperature_2m_max[index]"
          :min="weatherData.daily.temperature_2m_min[index]"
        />
        <p>
          {{ t("weather.precipitations") }}:
          {{ weatherData.daily.precipitation_sum[index] }}mm
        </p>
        <p>
          {{ t("weather.max") }}:
          {{ weatherData.daily.temperature_2m_max[index] }}°C
        </p>
        <p>
          T{{ t("weather.min") }}:
          {{ weatherData.daily.temperature_2m_min[index] }}°C
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  min-height: 100vh;
  padding: 6em 0;
  &__title {
    text-align: center;
  }
}
.weather {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  &__day {
    width: 23%;
    border: 1px solid var(--border-color);
    padding: 2rem;
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 1024px) {
      width: 30%;
    }

    @media (max-width: 768px) {
      width: 48%;
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }
}

.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
}
</style>
