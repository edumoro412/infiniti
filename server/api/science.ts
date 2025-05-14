import { fetchCategories } from "@/utils/categories";
import type { Lang } from "~/interfaces/lang";

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale || "es";
  return await fetchCategories("science", locale as Lang);
});
