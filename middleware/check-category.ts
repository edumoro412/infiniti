export default defineNuxtRouteMiddleware((to) => {
  const validCategories = [
    "sports",
    "technology",
    "health",
    "entertainment",
    "business",
    "science",
  ];

  if (!validCategories.includes(to.params.category as string)) {
    return navigateTo("/error");
  }
});
