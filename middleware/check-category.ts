export default defineNuxtRouteMiddleware((to) => {
  const validCategories = [
    "sports",
    "technology",
    "health",
    "entertainment",
    "business",
    "science",
  ];

  const category = to.params.category as string;

  if ((to.params.category as string) === "deportes") {
    return navigateTo("/sports");
  } else if (category === "tecnologia") {
    return navigateTo("/technology");
  } else if (category === "salud") {
    return navigateTo("/health");
  } else if (category === "entretenimiento") {
    return navigateTo("/entertainment");
  } else if (category === "negocios") {
    return navigateTo("/business");
  } else if (category === "ciencia") {
    return navigateTo("/science");
  } else {
    if (!validCategories.includes(category) && to.path !== "/error") {
      return navigateTo("/error");
    }
  }
});
