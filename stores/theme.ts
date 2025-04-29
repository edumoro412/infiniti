import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const darkTheme = ref(true);

  const toggleDarkTheme = () => {
    darkTheme.value = !darkTheme.value;
  };

  return { darkTheme, toggleDarkTheme };
});
