import type { NewsArticle, NewsResponse } from "@/interfaces/api/new";

export async function fetchCategories(category: string) {
  const config = useRuntimeConfig();
  let url = `https://newsdata.io/api/1/news?apikey=${config.currentsApiKey}&language=es&country=es&category=${category}`;
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
          ? `https://newsdata.io/api/1/news?apikey=${config.currentsApiKey}&language=es&country=es&category=${category}&page=${response.nextPage}`
          : "";
        pageCounter++;
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Error interno al obtener noticias",
        });
      }
    }

    const uniqueNews = allNews.filter(
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
      error instanceof Error
        ? error.message
        : `Error al obtener las noticias de ${category}`;
    throw createError({
      statusCode: 500,
      statusMessage: message,
    });
  }
}
