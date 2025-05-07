import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const darkTheme = ref(false);

  onMounted(() => {
    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme !== null) {
      darkTheme.value = savedTheme === "true";
    } else {
      darkTheme.value = true;
    }
  });

  const toggleDarkTheme = () => {
    darkTheme.value = !darkTheme.value;
  };

  watch(darkTheme, (newValue) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkTheme", newValue.toString());
    }
  });

  return { darkTheme, toggleDarkTheme };
});
