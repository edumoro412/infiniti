export default defineNuxtRouteMiddleware((to) => {
  const validCategories = [
    "sports",
    "technology",
    "health",
    "entertainment",
    "business",
    "science",
  ];

  if ((to.params.category as string) === "deportes") {
    return navigateTo("/sports");
  } else if ((to.params.category as string) === "tecnologia") {
    return navigateTo("/technology");
  } else if ((to.params.category as string) === "salud") {
    return navigateTo("/health");
  } else if ((to.params.category as string) === "entretenimiento") {
    return navigateTo("/entertainment");
  } else if ((to.params.category as string) === "negocios") {
    return navigateTo("/business");
  } else if ((to.params.category as string) === "ciencia") {
    return navigateTo("/science");
  } else {
    if (!validCategories.includes(to.params.category as string)) {
      return navigateTo("/error");
    }
  }
});
