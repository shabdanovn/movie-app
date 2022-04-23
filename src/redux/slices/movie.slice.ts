import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moviesApi from "../../api/movies";
import { GenreType, GetSimilarMoviesDataType, MovieType, VideosType } from "../../types/movies";

interface IInitialState {
  movies: MovieType[];
  genres: GenreType[];
  isLoading: boolean;
  movie: MovieType | null;
  error: null | string;
  videos: VideosType[];
  similarMovies: MovieType[]
  searchedMovies: MovieType[],
  savedMovies: MovieType[]
}

const initialState: IInitialState = {
  movies: [],
  genres: [],
  isLoading: false,
  movie: null,
  error: null,
  videos: [],
  similarMovies: [],
  searchedMovies: [],
  savedMovies: []
};

export const getPopular = createAsyncThunk(
    'movies/getPopular',
    async (page:number, {rejectWithValue}) => {
        try {
            const response = await moviesApi.getPopular(page)
            return response.results
        } catch (error: any) {
            const message =
            (error.message &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            return rejectWithValue(message);
        }
    }
)

export const getGenres = createAsyncThunk(
  "movies/getGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await moviesApi.getGenres();
      return response.genres;
    } catch (error: any) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getMovieDetails = createAsyncThunk(
  "movies/getMovieDetails",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await moviesApi.getMovieDetails(id);
      return response;
    } catch (error: any) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getVideos = createAsyncThunk(
  "movies/getVideos",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await moviesApi.getVideos(id);
      return response.results;
    } catch (error: any) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getSimilarMovies = createAsyncThunk(
  "movies/getSimilarMovies",
  async (data:GetSimilarMoviesDataType, { rejectWithValue }) => {
    try {
      const response = await moviesApi.getSimilarMovies(data);
      return response.results;
    } catch (error: any) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getSearchedMovies = createAsyncThunk(
  "movies/getSearchedMovies",
  async (word: string, { rejectWithValue }) => {
    try {
      const response = await moviesApi.getSearchMovies(word);
      return response.results;
    } catch (error: any) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      clearSearchedMovies(state){
        state.searchedMovies = []
      },

      getSavedMovies(state){
        state.savedMovies = moviesApi.getSavedMovies()
      },

      saveMovie(state, {payload}){
        console.log(payload);

        moviesApi.saveMovie(payload)
        state.savedMovies = moviesApi.getSavedMovies();
      },

      unsaveMovie(state, {payload}){
       moviesApi.removeSavedMovie(payload);
       state.savedMovies = moviesApi.getSavedMovies();
      }
    },
    extraReducers(builder) {
        builder.addCase(getPopular.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getPopular.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.movies = payload
        });

        builder.addCase(getPopular.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = "Something went wrong while fetching popular movies"
        });

        builder.addCase(getMovieDetails.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.movie = payload;
        });

        builder.addCase(getMovieDetails.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = "Something went wrong while fetching a movie";
        });

        builder.addCase(getGenres.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getGenres.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.genres = payload;
        });

        builder.addCase(getGenres.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = "Something went wrong while fetching genres";
        });

        builder.addCase(getVideos.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getVideos.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.videos = payload;
        });

        builder.addCase(getVideos.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error =  "Something went wrong while fetching videos";
        });

        builder.addCase(getSimilarMovies.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getSimilarMovies.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.similarMovies = payload;
        });

        builder.addCase(getSimilarMovies.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = "Something went wrong while fetching similar movies";
        });

        builder.addCase(getSearchedMovies.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getSearchedMovies.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.searchedMovies = payload;
        });

        builder.addCase(getSearchedMovies.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = "Something went wrong while fetching searched movies";
        });
    },
})

export const { clearSearchedMovies, saveMovie, getSavedMovies, unsaveMovie } = moviesSlice.actions;
const moviesReducer = moviesSlice.reducer

export default moviesReducer