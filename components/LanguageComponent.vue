<script setup lang="ts">
import { useI18n } from "#imports";
import type { Lang } from "~/interfaces/lang";
import { useThemeStore } from "~/stores/theme";

const { locale, setLocale } = useI18n();
const store = useThemeStore();
const darkTheme = computed(() => store.darkTheme);
const showLanguageDropdown = ref(false);

const languages = [
  { code: "es", name: "Español", flag: "circle-flags:es-variant" },
  { code: "en", name: "English", flag: "circle-flags:us" },
  { code: "fr", name: "Français", flag: "circle-flags:fr" },
  { code: "pt", name: "Português", flag: "circle-flags:pt" },
  { code: "de", name: "Deutsch", flag: "circle-flags:de" },
  { code: "it", name: "Italiano", flag: "circle-flags:it" },
];

const currentFlag = ref(
  languages.find((lang) => lang.code === locale.value)?.flag ||
    "circle-flags:es-variant"
);

const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const changeLanguage = (langCode: string) => {
  setLocale(langCode as Lang);
  showLanguageDropdown.value = false;
  localStorage.removeItem("newsData_health");
  localStorage.removeItem("newsData_science");
  localStorage.removeItem("newsData_sports");
  localStorage.removeItem("newsData_business");
  localStorage.removeItem("newsData_technology");
  localStorage.removeItem("newsData_entertainment");
  window.location.reload();
};

watch(locale, (newLocale) => {
  currentFlag.value =
    languages.find((lang) => lang.code === newLocale)?.flag ||
    "circle-flags:es-variant";
});

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const dropdown = document.querySelector(".language-selector__dropdown");
  const flagIcon = document.querySelector(".current-flag");

  if (
    showLanguageDropdown.value &&
    !dropdown?.contains(target) &&
    !flagIcon?.contains(target)
  ) {
    showLanguageDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.addEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="language-selector">
    <Icon
      :name="currentFlag"
      class="current-flag"
      aria-label="Selector de idioma"
      @click="toggleLanguageDropdown"
    />
    <div
      v-if="showLanguageDropdown"
      class="language-selector__dropdown"
      :class="{ 'dark-theme': darkTheme }"
    >
      <div
        v-for="lang in languages"
        :key="lang.code"
        class="language-selector__dropdown--option"
        :class="{ 'dark-theme__dropdown': darkTheme }"
        @click="changeLanguage(lang.code)"
      >
        <Icon :name="lang.flag" class="language-flag" />
        <span>{{ lang.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.current-flag {
  font-size: 1.4em;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}
.language-selector {
  position: relative;

  &__dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    background-color: var(--c-primary);
    border: 1px solid var(--c-secondary);
    border-radius: 8px;
    padding: 0.5em;
    min-width: 150px;
    z-index: 1001;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: var(--c-secondary);

    &--option {
      @include flex($justify: flex-start, $gap: 0.5em);

      padding: 0.5em;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 4px;

      &:hover {
        background-color: var(--c-secondary);
        color: var(--c-primary);
      }
      .language-flag {
        font-size: 1.5em;
      }
    }
  }
}

.dark-theme {
  background-color: var(--c-secondary);
  border-color: var(--c-primary);
  color: var(--c-primary);

  &__dropdown:hover {
    background-color: var(--c-primary);
    color: var(--c-secondary);
  }
}
</style>
