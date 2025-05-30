<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useThemeStore } from "~/stores/theme";

const themeStore = useThemeStore();
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const categories = [
  { Deportes: "sports" },
  { Negocios: "business" },
  { Ciencia: "science" },
  { Tecnología: "technology" },
  { Salud: "health" },
  { Entretenimiento: "entertainment" },
];

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};
const handleClick = () => {
  showDropdown.value = false;
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
    <transition name="dropdown-fade">
      <ul
        v-if="showDropdown"
        class="dropdown__menu"
        :class="{ 'dark-theme': themeStore.darkTheme }"
      >
        <li
          v-for="category in categories"
          :key="Object.values(category)[0]"
          class="dropdown__menu--item"
          @click="handleClick"
        >
          <NuxtLink :to="Object.values(category)[0]">{{
            $t(`categories.${Object.values(category)[0]}`)
          }}</NuxtLink>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  @include flex($justify: flex-start);

  &__icon {
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__menu {
    position: absolute;
    @include flex($justify: flex-start, $align: flex-start, $gap: 0.5em);
    top: 120%;
    right: 0;
    background-color: var(--c-primary);
    color: var(--c-secondary);
    list-style: none;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 0.0625rem solid var(--c-secondary);
    z-index: 1000;
    min-width: 9.375em;
    max-width: 20em;

    &--item {
      padding: 0.3em;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }
  }

  .dark-theme {
    background-color: var(--c-secondary);
    color: var(--c-primary);
    border: 0.0625rem solid var(--c-primary);
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-0.625rem);
}
.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
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
