import { fetchCategories } from "@/utils/categories";

export default defineEventHandler(async () => {
  return await fetchCategories("technology");
});
