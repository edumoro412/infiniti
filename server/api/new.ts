import type { NewsResponse } from "~/interfaces/api/new";

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event);
  const config = useRuntimeConfig();

  if (!slug || typeof slug !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug inválido o faltante",
    });
  }

  const url = `https://newsdata.io/api/1/latest?apikey=${config.currentsApiKey}&id=${slug}`;

  try {
    const response: NewsResponse = await $fetch(url);
    console.log("RESPUESTA", response);
    return response;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "No se pudo obtener el artículo",
    });
  }
});
