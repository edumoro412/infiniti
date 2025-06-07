export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  pubDate: string;
  image_url: string;
  source_name: string;
  language: string;
  country: string[];
  category: string[];
  description: string;
  creator?: string[];
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  nextPage: string | null;
  results: NewsArticle[];
}
export interface NewResponse {
  status: string;
  totalResults: number;
  nextPage: string | null;
  results: NewsArticle;
}

export interface NewsDisplayProps {
  articles: NewsArticle[];
  banner?: string;
}
