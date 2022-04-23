export type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average?: number;
  release_date?: string;
  overview?: string;
  genre_ids?: number[];
  runtime?: number
  genres?: GenreType[]
};

export type GenreType = {
    id: number,
    name: string
}

export type VideosType = {
    id: string,
    type: string,
    key: string,
    name: string
}

export type GetSimilarMoviesDataType = {
    id: number,
    page: number
}