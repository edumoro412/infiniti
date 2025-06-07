<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <div class="container">
      <nav class="links">
        <a href="/sports">{{ $t("categories.sports") }}</a>
        <a href="/business">{{ $t("categories.business") }}</a>
        <a href="/science">{{ $t("categories.science") }}</a>
        <a href="/technology">{{ $t("categories.technology") }}</a>
        <a href="/health">{{ $t("categories.health") }}</a>
        <a href="/entertainment">{{ $t("categories.entertainment") }}</a>
      </nav>
    </div>
    <div class="icons">
      <NuxtLink
        to="https://github.com/edumoro412/infiniti"
        target="_blank"
        class="icons__icon"
      >
        <Icon name="mdi:github" size="2em" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/in/eduardo-moro-de-macedo-864600273/"
        target="_blank"
        class="icons__icon"
      >
        <Icon name="mdi:linkedin" size="2em" />
      </NuxtLink>
    </div>
    <div class="bottom-text">
      © {{ new Date().getFullYear() }} Infiniti. Todos los derechos reservados.
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 2rem 1rem;
  font-family: "Inter", sans-serif;
  transition: background 0.3s, color 0.3s;
  background-color: #121212;
  color: var(--c-secondary);

  .container {
    @include flex(column);
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .logo-section {
    text-align: center;

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    p {
      margin: 0.25rem 0 0;
      font-size: 0.9rem;
    }
  }

  .links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;

    a {
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;

      &:hover {
        color: #ff4d4d;
      }
    }
  }

  .icons {
    padding: 2em 0 0 0;
    @include flex();
    &__icon {
      cursor: pointer;
      color: white;

      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
.bottom-text {
  text-align: center;
  font-size: 0.8rem;
  margin-top: 2rem;
  opacity: 0.7;
}
</style>
