import { MovieType } from './../types/movies';
import axios from 'axios'
import { GetSimilarMoviesDataType } from '../types/movies';
import { API_KEY, BASE_URL } from '../utils/constants';

const getPopular =async (page: number) => {
    try {
        const response = await axios.get(
          `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );

        return response.data
    } catch (error) {
        return error
    }
}

const getGenres = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return response.data
  } catch (error) {
    return error;
  }
};

const getMovieDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const getVideos = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


const getSearchMovies = async (word: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${word}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const getSimilarMovies = async ({id, page}: GetSimilarMoviesDataType) => {
  try {
    const response = await axios.get(
      `${BASE_URL}movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const getSavedMovies = () => {
  try {
    const items = localStorage.getItem("saved-movies");
    const movies = items ? JSON.parse(items) : [];
    return movies;
  } catch (error) {
    return error;
  }
};

const saveMovie = (movie: MovieType) => {
  console.log(movie)
  try {
    const items = localStorage.getItem("saved-movies");
    const movies = items ? JSON.parse(items) : [];
    if (!movies.find((item: MovieType) => item.id === movie.id))
      movies.push(movie);
    localStorage.setItem("saved-movies", JSON.stringify(movies));
  } catch (error) {
    return error;
  }
}

const removeSavedMovie = (id: number) => {
  try {
    const items = localStorage.getItem("saved-movies");
    if (items) {
      let movies = JSON.parse(items);
      movies = movies.filter((movie: MovieType) => movie.id !== id);
      localStorage.setItem("saved-movies", JSON.stringify(movies));
    }
  } catch (error) {
    return error;
  }
};


const moviesApi = {
    getPopular, getGenres, getSearchMovies,
    getMovieDetails, getVideos, getSimilarMovies,
    getSavedMovies, saveMovie, removeSavedMovie
}

export default moviesApi