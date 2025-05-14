const lang = localStorage.getItem("lang") || "es";
let translations: Record<string, string> = {};

export async function initI18n() {
  const module = await import(`./${lang}.json`);
  translations = module.default;
}

export function setLang(newLang: string) {
  localStorage.setItem("lang", newLang);
  return initI18n();
}

export function t(key: string): string {
  const parts = key.split(".");
  let result: unknown = translations;

  for (const part of parts) {
    if (typeof result === "object" && result !== null && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  if (typeof result === "string") {
    return result;
  }

  return key;
}
