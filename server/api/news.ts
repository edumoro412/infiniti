import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  let url = `https://newsdata.io/api/1/latest?apikey=${config.currentsApiKey}&language=es&country=es&category=top`;
  let allNews: NewsArticle[] = [];
  let pageCounter = 0;

  try {
    while (url && pageCounter < 3) {
      const response: NewsResponse = await $fetch(url, {
        method: "GET",
      });

      if (response.status === "success") {
        allNews = allNews.concat(response.results);
        url = response.nextPage
          ? `https://newsdata.io/api/1/latest?apikey=${config.currentsApiKey}&language=es&category=top&page=${response.nextPage}`
          : "";
        pageCounter++;
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Error interno al obtener noticias",
        });
        break;
      }
    }
    console.log("Estas son todas las noticias", allNews);
    return {
      status: "success",
      totalResults: allNews.length,
      results: allNews,
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
