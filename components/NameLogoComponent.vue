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
  @include flex($justify: flex-start, $gap: 1em);

  &__link {
    @include flex($justify: flex-start, $gap: 0.5em);

    text-decoration: none;
    color: inherit;
  }
}
</style>
