<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "~/stores/theme";
import type { Weather } from "~/interfaces/api/weather";

const theme = useThemeStore();
const darkTheme = computed(() => theme.darkTheme);
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);
const isLoading = ref(true);

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
});

const { data: weatherData } = useFetch<Weather>("/api/weather", {
  query: {
    lat: latitude,
    lon: longitude,
  },
  watch: [latitude, longitude],
  immediate: false,
});

console.log(weatherData);
</script>

<template>
  <div class="container" :class="{ 'dark-theme': darkTheme }">
    <div v-if="isLoading">Obteniendo ubicación...</div>
    <div v-else-if="weatherData" class="weather">
      <div
        v-for="(day, index) in weatherData.daily.time"
        :key="index"
        class="day-weather"
      >
        <h2>Día {{ index + 1 }}: {{ day }}</h2>
        <p>
          Precipitaciones:
          {{ weatherData.daily.precipitation_sum[index] }}mm
        </p>
        <p>
          Temperatura máxima:
          {{ weatherData.daily.temperature_2m_max[index] }}°C
        </p>
        <p>
          Temperatura mínima:
          {{ weatherData.daily.temperature_2m_min[index] }}°C
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  min-height: 100vh;
  padding: 20em;
}
.weather {
}
.dark-theme {
  background-color: var(--c-fourth);
  color: var(--c-secondary);
}
</style>
