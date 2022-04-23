import React, { ReactElement, ReactChild } from "react";
import './Layout.scss'
import cn from 'classnames'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import { MovieType } from "../../types/movies";

interface ILayout {
  children: ReactElement | ReactChild;
  setMovies?: (movies: MovieType[]) => void
}

const Layout = ({ children, setMovies }: ILayout) => {
  const location = useLocation();
  return (
    <div className={cn("layout")}>
      <Navbar setMovies={setMovies} />
      {children}
      {(location.pathname === "/" || location.pathname === "/saved-page") && (
        <Footer />
      )}
    </div>
  );
};

export default Layout;