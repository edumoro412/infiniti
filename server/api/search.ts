import type { NewsArticle, NewsResponse } from "~/interfaces/api/new";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchItem = query.q;
  const locale = query.lang ?? "es";

  const config = useRuntimeConfig();
  let url = `https://newsdata.io/api/1/latest?apikey=${config.currentsApiKey}&language=${locale}&qInTitle=${searchItem}`;
  let allNews: NewsArticle[] = [];
  const seenTitles = new Set<string>();
  let pageCounter = 0;

  try {
    while (url && pageCounter < 3) {
      const response: NewsResponse = await $fetch(url, {
        method: "GET",
      });

      if (response.status === "success") {
        const uniqueResults = response.results.filter((article) => {
          if (!article.title || seenTitles.has(article.title)) {
            return false;
          }
          seenTitles.add(article.title);
          return true;
        });

        allNews = allNews.concat(uniqueResults);

        url = response.nextPage
          ? `https://newsdata.io/api/1/latest?apikey=${config.currentsApiKey}&language=${locale}&qInTitle=${searchItem}&page=${response.nextPage}`
          : "";

        pageCounter++;
      } else {
        throw createError({
          statusCode: 500,
          statusMessage: "Error interno al obtener noticias",
        });
      }
    }

    /*  console.log("Estas son todas las noticias", allNews); */
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
