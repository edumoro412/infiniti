export default defineNuxtRouteMiddleware((to) => {
  const categoryMap: Record<string, string> = {
    deportes: "sports",
    tecnologia: "technology",
    salud: "health",
    entretenimiento: "entertainment",
    negocios: "business",
    ciencia: "science",
  };

  const validCategories = Object.values(categoryMap);
  const category = to.params.category as string;

  if (categoryMap[category]) {
    return navigateTo(`/${categoryMap[category]}`);
  }
  if (!validCategories.includes(category) && to.path !== "/error") {
    return navigateTo("/error");
  }
});
