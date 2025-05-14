<script setup lang="ts"></script>
<template>
  <div class="logo">
    <NuxtLink to="/" class="logo__link">
      <Icon
        name="solar:infinity-bold"
        style="font-size: 3.3em"
        aria-label="Logo de INFINITI"
      />
      <h1 class="logo__link--name">INFINITI</h1>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: 1em;
  &__link {
    display: flex;
    align-items: center;
    gap: 0.5em;
    text-decoration: none;
    color: inherit;
  }
}
</style>
