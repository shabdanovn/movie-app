import React, { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames'
import './Navbar.scss'
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAppDispatch , useAppSelector} from '../../redux/store';
import { clearSearchedMovies, getSearchedMovies } from '../../redux/slices/movie.slice';
import { MovieType } from '../../types/movies';

interface INavbar{
  setMovies?: (movies:MovieType[]) => void
}

const Navbar = ({setMovies}:INavbar) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [word, setWord] = useState<string>('')
    const dispatch = useAppDispatch()
    const {movies, searchedMovies} = useAppSelector(state=> state.movies)

    const clickHandler = () => {
      if(word) {
        dispatch(getSearchedMovies(word))
        window.scrollTo({top: 0})
      }
    }

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if(word) {
        dispatch(getSearchedMovies(word));
        window.scrollTo({ top: 0 });
      }
    }
  };

    useEffect(() => {
      if(setMovies){
        setMovies(searchedMovies)
        if(searchedMovies.length === 0) 
          setMovies(movies)
      }
    }, [searchedMovies, setMovies, movies])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setWord(e.target.value)
      if (!e.target.value && setMovies) {
        dispatch(clearSearchedMovies())
      }
    }


    return (
      <div className={cn("navbar")}>
        <div className={cn("navbar__content")}>
          <div className={cn("nav")}>
            {location.pathname === "/" ? (
              <HomeIcon color="primary" fontSize="large" />
            ) : (
              <HomeIcon
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
                fontSize="large"
              />
            )}

            {location.pathname === "/saved-page" ? (
              <BookmarkIcon color="primary" fontSize="large" />
            ) : (
              <BookmarkIcon
                onClick={() => navigate("/saved-page")}
                style={{ cursor: "pointer" }}
                fontSize="large"
              />
            )}
          </div>

          {location.pathname === "/" && (
            <div className={cn("searchbar")}>
              <input
                type={"text"}
                placeholder="movie name"
                onKeyDown={keyDownHandler}
                value={word}
                onChange={changeHandler}
              />
              <div onClick={clickHandler}>
                <SearchIcon fontSize="large" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default Navbar;