import type { NewsResponse } from "~/interfaces/api/new";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `https://newsdata.io/api/1/latest?apikey=${config.currentsApiKey}&language=es&country=es&category=top`;

  try {
    const response: NewsResponse = await $fetch(url, {
      method: "GET",
    });

    if (response.status !== "success" || !response.results) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error interno al obtener noticias",
      });
    }

    const uniqueNews = response.results.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.title === article.title)
    );

    return {
      status: "success",
      totalResults: uniqueNews.length,
      results: uniqueNews,
    };
  } catch (error: unknown) {
    console.error("Error al obtener noticias:", error);
    const message =
      error instanceof Error ? error.message : "Error al obtener noticias";
    throw createError({
      statusCode: 500,
      statusMessage: message,
    });
  }
});
