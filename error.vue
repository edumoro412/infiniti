<script setup lang="ts">
import { useThemeStore } from "~/stores/theme";
import { useRouter } from "vue-router";

const store = useThemeStore();
const darkTheme = computed(() => store.darkTheme);
const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="error" :class="{ 'dark-theme': darkTheme }">
    <h1 class="error__title" :class="{ 'dark-theme__title': darkTheme }">
      404: Lo sentimos, no hemos podido encontrar esa página
    </h1>
    <section class="error__animation">
      <LottieAnimation />
    </section>
    <NuxtLink to="/" class="error__button">
      <button class="error__button--button" @click="goHome">
        Regresar al inicio
      </button>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.error {
  position: relative;
  padding: 10em 0;
  height: 100%;
  background: linear-gradient(45deg, #ff6a00, #ee0979);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &__title {
    color: var(--c-primary);
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__animation {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button {
    display: flex;
    justify-content: center;
    &--button {
      background-color: var(--c-primary);
      padding: 1rem 2rem;
      color: white;
      font-size: 1.2rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: var(--c-secondary);
        transform: scale(1.1);
        color: black;
      }
    }
  }

  .dark-theme {
    background-color: var(--c-fourth);

    &__title {
      color: var(--c-secondary);
    }

    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
</style>
