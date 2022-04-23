import React, { useEffect, useState } from 'react';
import { GenreType, MovieType } from '../../types/movies';
import './MovieItem.scss'
import { useNavigate } from 'react-router-dom';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IMG_URL } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getMovieDetails, saveMovie, unsaveMovie } from '../../redux/slices/movie.slice';


interface IMovieItem{
    movie: MovieType
}

const MovieItem = ({movie}:IMovieItem) => {
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const {genres, savedMovies} = useAppSelector(state => state.movies)
    const [genresList, setGenresList] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
      const array = Object.values(
        genres
          .filter((genre: GenreType) => movie.genre_ids?.includes(genre.id))
          .map((genre) => genre.name)
      );

      setGenresList(array.slice(0, 3).join(" "));
    }, [genres, movie.genre_ids]);

    useEffect(() => {
      if (savedMovies.find((item: MovieType) => item.id === movie.id))
        setIsSaved(true);
    }, []);

    const saveHandle = () => {
      if(isSaved){
        setIsSaved(false)
        dispatch(unsaveMovie(movie.id));
      }else{
        setIsSaved(true)
        dispatch(saveMovie(movie));
      }
    }

    const clickHandle = () => {
      navigate(`/movie-page/${movie.id}`)
      window.scrollTo({top: 0})
    }
    
    return (
      <div className="movie-item">
        <img
          onClick={clickHandle}
          src={`${IMG_URL}/${movie.poster_path}`}
          alt="Movie poster"
        />
        <div className="movie-item__content">
          <p className="title" onClick={clickHandle}>
            {movie.title}
          </p>
          <p className="genres">{genresList}</p>
          {isSaved ? (
            <BookmarkIcon
              fontSize="large"
              onClick={saveHandle}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "15px",
              }}
            />
          ) : (
            <BookmarkBorderIcon
              fontSize="large"
              onClick={saveHandle}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "15px",
              }}
            />
          )}
        </div>
      </div>
    );
};

export default MovieItem;