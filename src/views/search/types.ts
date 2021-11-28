export interface tvShow {
  id: number;
  image: { medium: string };
  name: string;
  summary: string;
  genres: string[];
}

export interface searchResponse {
  show: tvShow;
  score: number;
}
