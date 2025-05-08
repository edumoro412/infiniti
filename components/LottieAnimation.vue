<script setup>
onMounted(() => {
  if (!customElements.get("dotlottie-player")) {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }
});
</script>

<template>
  <div>
    <dotlottie-player
      src="https://lottie.host/9a4773b0-ca75-4878-91a8-f39ae05bccca/QE0GdvoeeH.lottie"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px"
      loop
      autoplay
    />
  </div>
</template>

<style scoped></style>
