import React, { useEffect, useState } from 'react';
import cn from 'classnames'
import './SavedPage.scss'
import Layout from '../../components/Layout/Layout';
import MovieItem from '../../components/MovieItem/MovieItem';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getSavedMovies } from '../../redux/slices/movie.slice';

const SavedPage = () => {
    const {savedMovies} = useAppSelector(state => state.movies)
    const [movies, setMovies] = useState(savedMovies);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSavedMovies())        
    }, [dispatch])

    useEffect(() => {
      setMovies(savedMovies);
    }, [savedMovies]);

    return (
        <Layout>
            <div className={cn('saved-page')}>
                <h3>Saved movies</h3>
                <div className={cn('saved-page__movies-list')}>
                    {
                        movies.map((movie) => {
                            return <MovieItem key={movie.id} movie={movie}/>
                        })
                    }  
                </div>
            </div>
        </Layout>
    );
};

export default SavedPage;