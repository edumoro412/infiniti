<script setup lang="ts"></script>
<template>
  <div class="header">
    <div class="header__logo">
      <Icon name="solar:infinity-bold" style="font-size: 3.3em" />
      <h1>INFINITI</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--c-primary);
  color: var(--c-secondary);
  padding: 0.5em;
  display: flex;

  &__logo {
    display: flex;
    align-items: center;
    gap: 1em;
  }
}
</style>
