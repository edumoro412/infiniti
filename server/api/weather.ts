import type { Weather } from "~/interfaces/api/weather";
export default defineEventHandler(async (event) => {
  const { lat, lon } = getQuery(event);
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`;
  try {
    const response = await $fetch<Weather>(apiUrl);
    return {
      daily: {
        time: response.daily.time,
        temperature_2m_max: response.daily.temperature_2m_max,
        temperature_2m_min: response.daily.temperature_2m_min,
        precipitation_sum: response.daily.precipitation_sum,
      },
    };
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
    });
  }
});
