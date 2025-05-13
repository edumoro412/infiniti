<script setup lang="ts">
import IconClearDay from "@/assets/icons/clear-day.svg";
import IconCloudy from "@/assets/icons/cloudy.svg";
import IconPartlyCloudRain from "@/assets/icons/partly-cloudy-day-rain.svg";
import IconPartlyCloud from "@/assets/icons/partly-cloudy-day.svg";
import IconRain from "@/assets/icons/rain.svg";
import IconNotAvailable from "@/assets/icons/not-available.svg";

defineProps<{
  prec: number;
  max: number;
  min: number;
}>();
</script>
<template>
  <div class="icon">
    <IconClearDay v-if="prec === 0 && max > 20 && min > 10" alt="Día soleado" />
    <IconPartlyCloud
      v-else-if="prec === 0 && max > 15 && max <= 23 && min >= 5"
      alt="Parcialmente nublado"
    />
    <IconCloudy v-else-if="prec === 0 && max <= 15 && min < 10" alt="Nublado" />
    <IconPartlyCloudRain
      v-else-if="prec > 0 && prec <= 5 && max > 10"
      alt="Chubascos leves"
    />
    <IconRain v-else-if="prec > 5" alt="Lluvia fuerte" />

    <IconNotAvailable v-else alt="Sin datos claros" />
  </div>
</template>

<style scoped lang="scss">
.icon {
  font-size: 15em;
  color: white !important;
}
</style>
