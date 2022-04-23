import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import cn from 'classnames'
import './MoviePage.scss'
import { MovieType, VideosType } from '../../types/movies';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MovieItem from '../../components/MovieItem/MovieItem';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getGenres, getMovieDetails, getSimilarMovies, getVideos, saveMovie, unsaveMovie } from '../../redux/slices/movie.slice';
import { IMG_URL } from '../../utils/constants';

const MoviePage = () => {
  const {id} = useParams()
  const {movie:movieInfo, similarMovies, videos: videosList, isLoading, savedMovies} = useAppSelector(state => state.movies)
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>(similarMovies);
  const [movie, setMovie] = useState<MovieType|null>(movieInfo);
  const [videos, setVideos] = useState<VideosType[]>(videosList);
  const [video, setVideo] = useState<VideosType|null>(null);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(id) {
      dispatch(getMovieDetails(+id))
      dispatch(getSimilarMovies({id: +id, page: 1}))
      dispatch(getVideos(+id))
      dispatch(getGenres())
    }
  }, [dispatch, id])

  useEffect(() => {
    setMovies(similarMovies);
    setMovie(movieInfo);
    setVideos(videosList);
    if(videosList.length !== 0) {
      const item = videosList.find(
        (item) => item.type === "trailer" || item.type === "Trailer"
      );

      if(item) setVideo(item)
    }
  }, [similarMovies, videosList, movieInfo]);

  
  useEffect(() => {
    setVideos(videosList);
    if (videosList.length !== 0) {
      const item = videosList.find(
        (item) => item.type === "trailer" || item.type === "Trailer"
      );

      if (item) setVideo(item);
    }
  }, [videosList]);

  useEffect(() => {
    if(movie){
         if (savedMovies.find((item: MovieType) => item.id === movie.id))
           setIsSaved(true);
    }
  }, [movie]);

  const saveHandle = () => {
      if (isSaved) {
        setIsSaved(false);
        dispatch(unsaveMovie(movie?.id))
      } else {
        setIsSaved(true);
        dispatch(saveMovie(movie))
      }
  };

  useEffect(()=> {
      window.scrollTo({top: 0})
  }, [])


  if(isLoading){
    return <h3>Loading</h3>
  }

  return (
    <Layout>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="movie-info-page">
          <div className={cn("movie-page")}>
            <div className={cn("movie-page__info")}>
              <div className={cn("poster-details")}>
                <img src={`${IMG_URL}/${movie?.poster_path}`} alt="Poster" />
                <div className={cn("poster-details__info")}>
                  <h3>{movie?.title}</h3>
                  <p>
                    <span>Release date:</span> {movie?.release_date}
                  </p>
                  <p>
                    <span>IMDB rating:</span> {movie?.vote_average}
                  </p>
                  {isSaved ? (
                    <BookmarkIcon sx={{ fontSize: 50 }} onClick={saveHandle} />
                  ) : (
                    <BookmarkBorderIcon
                      sx={{ fontSize: 50 }}
                      onClick={saveHandle}
                    />
                  )}
                </div>
              </div>
              <p className={cn("movie-page__description")}>{movie?.overview}</p>
            </div>
            <div className={cn("movie-page__trailer-backdrop")}>
              <img
                src={`${IMG_URL}/${movie?.backdrop_path}`}
                alt="Backdrop poster"
              />
              {videos.length !== 0 && (
                <iframe
                  className="trailer"
                  src={`https://www.youtube.com/embed/${video?.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
          <div className="swiper">
            <h3>Similar movies</h3>
            <div className="swiper__content">
              {movies.map((movie) => {
                return <MovieItem key={movie.id} movie={movie} />;
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default MoviePage