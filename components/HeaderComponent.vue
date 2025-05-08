<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();
const showHeader = ref(true);
const lastScrollPosition = ref(0);

const toggleTheme = () => {
  themeStore.toggleDarkTheme();
};

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition < 0) {
    showHeader.value = true;
    return;
  }

  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return; //Este return esta para que si el desplazamiento es muy leve se sale de la funcion aqui y no actualiza el valor de lastScrollPosition porque ha sido muy poco
  }

  showHeader.value = currentScrollPosition < lastScrollPosition.value;

  lastScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="header"
    :class="{
      'dark-theme': !themeStore.darkTheme,
      'header--hidden': !showHeader,
    }"
  >
    <div class="header__logo">
      <NuxtLink to="/" class="header__logo--link">
        <Icon
          name="solar:infinity-bold"
          style="font-size: 3.3em"
          aria-label="Logo de INFINITI"
        />
        <h1 class="header__logo--link-name">INFINITI</h1>
      </NuxtLink>
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--c-primary);
  color: var(--c-secondary);
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease-out;
  z-index: 1000;

  &__logo {
    display: flex;
    align-items: center;
    gap: 1em;
    &--link {
      display: flex;
      align-items: center;
      gap: 0.5em;
      text-decoration: none;
      color: inherit;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1em;
    &--icon {
      font-size: 1.7em;
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
    &--icon-weather {
      transition: transform 0.3s ease-in-out;
      font-size: 2em;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &.dark-theme {
    background-color: var(--c-secondary);
    color: var(--c-primary);
  }

  &--hidden {
    transform: translateY(-100%);
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
