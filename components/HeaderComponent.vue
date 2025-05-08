<script setup lang="ts">
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();
const toggleTheme = () => {
  themeStore.toggleDarkTheme();
};
</script>

<template>
  <div class="header" :class="{ 'dark-theme': !themeStore.darkTheme }">
    <div class="header__logo">
      <Icon
        name="solar:infinity-bold"
        style="font-size: 3.3em"
        aria-label="Logo de INFINITI"
      />
      <h1 class="header__logo--name">INFINITI</h1>
    </div>
    <div class="header__buttons">
      <Icon
        v-if="themeStore.darkTheme"
        name="material-symbols:dark-mode"
        class="header__buttons--icon"
        aria-label="Icono para el tema oscuro"
        @click="toggleTheme"
      />
      <Icon
        v-else
        name="material-symbols:sunny-rounded"
        class="header__buttons--icon"
        aria-label="Icono para el tema claro"
        @click="toggleTheme"
      />

      <Icon
        name="ic:round-watch-later"
        class="header__buttons--icon"
        aria-label="Icono de las últimas noticias"
      />
      <Icon
        name="fluent:weather-partly-cloudy-day-48-filled"
        class="header__buttons--icon-weather"
        aria-label="Icono de el tiempo"
      />
      <DropdownComponent />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--c-primary);
  color: var(--c-secondary);
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1em;

    &--icon {
      font-size: 1.7em;
      transition: transform 0.3s ease-in-out;
      &-weather {
        transition: transform 0.3s ease-in-out;
        font-size: 2em;
        &:hover {
          transform: scale(1.1);
        }
      }
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &.dark-theme {
    background-color: var(--c-secondary);
    color: var(--c-primary);
  }
}

@media (max-width: 26.25rem) {
  .header {
    transition: transform 0.5s ease-in-out;
    &__buttons {
      font-size: 0.8em;
    }
    &__logo--name {
      display: none;
    }
  }
}
</style>
