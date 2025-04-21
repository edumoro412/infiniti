// server/api/noticias.ts
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(
      "https://api.currentsapi.services/v1/latest-news",
      {
        method: "GET",
        headers: {
          Authorization: config.currentsApiKey,
        },
        params: {
          language: "es",
        },
      }
    );

    console.log("Respuesta de Currents API:", response);
    return response;
  } catch (error) {
    console.error("Error al obtener noticias desde Currents API:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Error interno al obtener noticias",
    });
  }
});
