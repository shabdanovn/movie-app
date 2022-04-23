import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './MainPage.scss'
import cn from 'classnames'
import MovieItem from '../../components/MovieItem/MovieItem';
import { MovieType } from '../../types/movies';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getGenres, getPopular, getSavedMovies } from '../../redux/slices/movie.slice';
import Button from "@mui/material/Button";

const MainPage = () => {
  const {movies, isLoading, searchedMovies, savedMovies} = useAppSelector(state => state.movies)
  const [moviesList, setMoviesList] = useState<MovieType[]>(movies)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    dispatch(getPopular(page));
    dispatch(getGenres());
    dispatch(getSavedMovies())
  }, [dispatch, page]);
  
   useEffect(() => {
     setMoviesList(movies);
   }, [movies, savedMovies]);
  
  const nextPage = () => {
    setPage(prev => prev+=1)
    window.scrollTo({top: 0})
  }

  const prevPage = () => {
    if(page>1){
      setPage((prev) => (prev -= 1));
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <Layout setMovies={setMoviesList}>
      <div className={cn("main-page")}>
        <h3>Movies</h3>
        <div className={cn("main-page__movies-list")}>
          {moviesList.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })}
        </div>
        {searchedMovies.length === 0 &&
          <div className="main-page__buttons">
            <Button
              variant="outlined"
              onClick={prevPage}
              disabled={page <= 1}
              style={{ marginRight: 20 }}
            >
              Prev page
            </Button>
            <Button variant="text" style={{ marginRight: 20 }}>
              {page}
            </Button>
            <Button variant="contained" onClick={nextPage}>
              Next page
            </Button>
          </div>
        }
      </div>
    </Layout>
  );
};

export default MainPage;