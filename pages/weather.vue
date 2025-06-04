<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useThemeStore } from "~/stores/theme";
import type { Weather } from "~/interfaces/api/weather";
import { useI18n } from "#imports";

const { locale } = useI18n();
const theme = useThemeStore();
const darkTheme = computed(() => theme.darkTheme);
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);
const isLoading = ref(true);
const permissionStatus = ref<PermissionState | null>(null);

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString(locale.value, {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const checkPermission = async () => {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    permissionStatus.value = result.state;
    result.onchange = () => {
      permissionStatus.value = result.state;
    };
  } catch (err) {
    console.error("No se pudo comprobar el permiso de geolocalización", err);
    permissionStatus.value = null;
  }
};

const getLocation = () => {
  isLoading.value = true;
  return new Promise<void>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        resolve();
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error.message);
        resolve();
      }
    );
  }).finally(() => {
    isLoading.value = false;
  });
};

onMounted(async () => {
  await checkPermission();
  if (permissionStatus.value !== "denied") {
    await getLocation();
  } else {
    isLoading.value = false;
  }
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
  <div :class="['container', { 'dark-theme': darkTheme }]">
    <h1 class="container__title">{{ $t("weather.weather") }}</h1>

    <div v-if="permissionStatus === 'denied'" class="permission-warning">
      <p>{{ $t("weather.permissionDenied") }}</p>
      <p>{{ $t("weather.permissionDeniedHelp") }}</p>
    </div>

    <div v-else-if="isLoading">{{ $t("weather.ubication") }}</div>

    <div v-else-if="weatherData" class="weather">
      <div
        v-for="(day, index) in weatherData.daily.time"
        :key="index"
        class="weather__day"
      >
        <h2 v-if="index === 0">{{ $t("weather.today") }}</h2>
        <h2 v-else-if="index === 1">{{ $t("weather.tomorrow") }}</h2>
        <h2 v-else>{{ formatDate(day) }}</h2>

        <WeatherIconComponent
          :prec="weatherData.daily.precipitation_sum[index]"
          :max="weatherData.daily.temperature_2m_max[index]"
          :min="weatherData.daily.temperature_2m_min[index]"
        />

        <p>
          {{ $t("weather.precipitations") }}:
          {{ weatherData.daily.precipitation_sum[index] }}mm
        </p>
        <p>
          {{ $t("weather.max") }}:
          {{ weatherData.daily.temperature_2m_max[index] }}°C
        </p>
        <p>
          {{ $t("weather.min") }}:
          {{ weatherData.daily.temperature_2m_min[index] }}°C
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  padding: 4em 2em;
  background: linear-gradient(135deg, #81ceec, #034879);

  color: var(--c-secondary);
  @include flex(column);
  transition: background-color 0.3s ease, color 0.3s ease;

  &__title {
    @include title();
  }
}

.weather {
  @include flex($align: flex-start);

  width: 100%;
  max-width: 1200px;

  &__day {
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.1);
    color: inherit;
    border-radius: 1.5rem;
    padding: 2rem;
    width: 22%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    }

    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: inherit;
      text-align: center;
    }

    p {
      margin: 0.4rem 0;
      font-size: 0.95rem;
      line-height: 1.5;
      text-align: center;
    }

    @media (max-width: 1024px) {
      width: 45%;
    }

    @media (max-width: 768px) {
      width: 100%;
      padding: 1.5rem;
    }
  }
}

.dark-theme {
  background: linear-gradient(135deg, var(--c-fourth), #121212);
  color: var(--c-secondary);

  .weather__day {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
}

.retry {
  @include flex(column);
  &-button {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    background-color: var(--c-primary);
    color: white;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--c-secondary);
      color: black;
    }

    &__darktheme {
      background-color: var(--c-secondary);
      color: var(--c-primary);

      &:hover {
        background-color: var(--c-fourth);
        color: var(--c-secondary);
      }
    }
  }
}

.permission-warning {
  background: #ffdddd;
  border: 1px solid #ff5c5c;
  color: #a70000;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.8rem;
  font-weight: 600;
  text-align: center;
}
</style>
