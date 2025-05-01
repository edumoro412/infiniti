export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    console.log("Configuración de Currents API:", config.currentsApiKey);
    const response = await $fetch(`https://newsapi.org/v2/everything`, {
      method: "GET",
      params: {
        q: "deporte",
        language: "es",
        sortBy: "popularity",
        pageSize: 30,
        apiKey: config.currentsApiKey,
      },
    });

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
