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
    return;
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
    <NameLogoComponent />
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
      <LanguageComponent />
      <NuxtLink to="/weather">
        <Icon
          name="fluent:weather-partly-cloudy-day-48-filled"
          class="header__buttons--icon-weather"
          aria-label="Icono del tiempo"
        />
      </NuxtLink>
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
  @include flex($justify: space-between, $align: center);

  transition: transform 0.3s ease-out;
  z-index: 1000;

  &__buttons {
    @include flex($justify: flex-start, $gap: 1em);
    position: relative;

    &--icon {
      font-size: 1.7em;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;

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
