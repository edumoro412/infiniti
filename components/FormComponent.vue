<script setup lang="ts">
import { useRoute } from "vue-router";
import { useThemeStore } from "~/stores/theme";
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();

const search = ref("");
const darkTheme = computed(() => themeStore.darkTheme);

const handleSubmit = () => {
  if (!search.value.trim()) return;
  router.push({ path: "/search", query: { q: search.value } });
};

onMounted(() => {
  const q = route.query.q as string;
  if (q) {
    search.value = q;
  }
});
</script>

<template>
  <form
    action="/search"
    class="form"
    :class="{ 'dark-form': darkTheme }"
    @submit.prevent="handleSubmit"
  >
    <input
      v-model="search"
      type="text"
      class="form__input"
      :class="{ 'dark-form__input': darkTheme }"
      :v-bind="search"
    />
    <button
      type="submit"
      class="form__button"
      :class="{ 'dark-form__button': darkTheme }"
    >
      <Icon
        name="material-symbols:search-rounded"
        class="form__button--icon"
        :class="{ 'dark-form__button--icon': darkTheme }"
      />
    </button>
  </form>
</template>

<style scoped lang="scss">
.form {
  @include flex($align: flex-start);

  padding: 0 0 2em 0;
  gap: 1em;
  align-items: center;
  &__input {
    background-color: #abacad;
    padding: 0.4em;
    border-radius: 0.5em;
    border: none;
    text-align: center;
    color: #000;
    font-size: 1em;
    width: 12.5em;
    transition: all 0.3s ease;
    &:focus {
      outline: none;
    }
  }

  &__button {
    background-color: #abacad;
    border: none;
    padding: 0.4em 1.2em;
    border-radius: 1em;
    color: #000;
    @include flex();

    cursor: pointer;
    transition: all 0.3s ease;

    &--icon {
      color: #000;
    }
    &:hover {
      background-color: var(--c-secondary);
      .form__button--icon {
        color: #000;
      }
    }

    &--icon {
      font-size: 1.5em;
      color: #000;
      transition: color 0.3s ease;
    }
  }
}

.dark-form {
  &__input {
    background-color: var(--c-secondary);
    color: black;
  }

  &__button {
    background-color: var(--c-secondary);

    &--icon {
      color: var(--c-fourth);
    }

    &:hover {
      background-color: var(--c-primary);
      .dark-form__button--icon {
        color: var(--c-secondary);
      }
    }
  }
}
</style>
