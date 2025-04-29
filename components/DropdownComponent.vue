<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const categories = ["Deportes", "Política", "Ciencia", "Tecnología", "Salud"];

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="dropdown">
    <Icon
      name="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
      style="font-size: 1.7em"
      class="dropdown__icon"
      aria-label="Icono del menú"
      @click="showDropdown = !showDropdown"
    />
    <ul
      v-if="showDropdown"
      class="dropdown__menu"
      :class="{ 'dark-theme': themeStore.darkTheme }"
    >
      <li v-for="category in categories" :key="category">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  display: flex;
  align-items: center;

  &__icon {
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__menu {
    position: absolute;
    top: 120%;
    right: 0;
    background-color: var(--c-primary);
    color: var(--c-secondary);
    list-style: none;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 150px;

    li {
      padding: 0.3em;
      cursor: pointer;
    }
  }

  .dark-theme {
    background-color: var(--c-secondary);
    color: var(--c-primary);
  }
}

@media (max-width: 26.25rem) {
  .dropdown {
    &__menu {
      width: 70%;
      padding: 0.3em 0.8em;
      font-size: 0.9em;
    }
  }
}
</style>
