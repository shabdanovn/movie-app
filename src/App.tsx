import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import MoviePage from './pages/MoviePage/MoviePage';
import SavedPage from './pages/SavedPage/SavedPage';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="movie-page/:id" element={<MoviePage />} />
          <Route path="/saved-page" element={<SavedPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
