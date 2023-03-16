import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import axios from "axios";
import "./header.css";
import "animate.css";
import CarouselRFC from "./CarouselRFC";

//-------------------------------CODIGO HEADER------------------------------------------
function Header() {
  const apiKey = "9a761624";
  const API_KEY_Yandex =
    "trnsl.1.1.20230310T221830Z.3704b29f9f640b45.64d2c2d45a9ceb23d4003a58dec791f787679cac";

  const [movieTitle, setMovieTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);
  const [error, setError] = useState(null);
  const [searchCount, setSearchCount] = useState(0);

  const searchMovie = async (movieTitle) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`
      );

      const searchResults = response.data.Search;
      if (searchResults) {
        setMovieData(searchResults);
        setShowCarousel(false);
        setError(null);
        setSearchCount(count => count + 1);
      } else {
        setError('No se encontraron resultados para la búsqueda');
        setMovieData(null);
        setSelectedMovie(null);
        setSearchCount(count => count + 1);
      }

    } catch (error) {
      console.error(error);
      setError("Hubo un error al buscar la película. Por favor, intenta de nuevo.");
      setMovieData(null);
      setSelectedMovie(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie(movieTitle);
    setShowCarousel(false);
  };

  const handleChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleSelectedMovie = async (imdbID) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
      );
      setSelectedMovie(response.data);

      const translatedPlot = await translatePlot(response.data.Plot);
      setSelectedMovie((prevState) => ({
        ...prevState,
        Plot: translatedPlot,
      }));

      const movieDescriptionRef = document.getElementById(
        "movieDescriptionRef"
      );
      movieDescriptionRef.scrollIntoView({ behavior: "auto" });
      setShowScrollTopBtn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const translatePlot = async (plot) => {
    const response = await axios.get(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY_Yandex}&text=${plot}&lang=en-es`
    );

    return response.data.text[0];
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header>
      <nav className="nav">
        <h1 
          className="title animate__animated animate__pulse"
          onClick={ () => window.location.reload()}>
          DATA MOVIE APK
        </h1>

        <p className="welcomeText">
          <Typewriter
            options={{
              strings: [
                "Bienvenido(a) a DATA MOVIE APK...\n Aquí podrás encontrar información sobre todas tus películas favoritas, y en donde se encuentran disponibles para su reproducción... Ahora, que comience la función... Y no te olvides del Pop-Corn!",
              ],
              autoStart: true,
              loop: false,
              cursor: "▊",
              delay: 30,
              deleteSpeed: 90000000000000,
            }}
          />
        </p>
      </nav>

      <form className="form animate__animated animate__fadeIn" onSubmit={handleSubmit}>
        <input
          className="InputSearch"
          type="text"
          name="movieTitle"
          value={movieTitle}
          placeholder="¿Qué película deseas buscar?"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <span class="material-symbols-outlined"> search </span>
        </button>
      </form>

      {showCarousel && <CarouselRFC className="carousel animate__animated animate__fadeIn" />}

      {error && (
        <div 
          className="errorDiv animate__animated animate__backInLeft" 
          key={searchCount}>

          <div className="errorImgDiv">
            <img 
              src="img/error-404.jpg" 
              alt="Error 404"
              className="errorImg" />
          </div>
          <p className="errorP">
            Lo sentimos, pero como actualmente nuestra App no cuenta con la tecnología NPL (Natural Language Proccessing), debes escribir el nombre de tu película sin faltas ortográficas, y sino la encuentras con su nombre de la versión Latam, intenta con su nombre original en Inglés.
            <br />
            ¡En una próxima actualización mejoraremos esto!
          </p>
        </div>
      )}      

      {movieData &&
        (Array.isArray(movieData) ? (
          <div key={searchCount} className="movieListDiv animate__animated animate__backInUp">
            <ul className="movieList">
              {movieData.map((movie) => (
                <li className="movieListItem" key={movie.imdbID}>
                 <div className="movieListItemDivImg">
                   <img src={movie.Poster} alt={movie.title} />
                 </div>
                  <h2>{movie.Title}</h2>
                  <h3>{movie.Year}</h3>
                  <button
                    onClick={() => handleSelectedMovie(movie.imdbID)}
                    className="btn btn-primary"
                  >
                    Ver Más
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="movieDescription">
              <img
                className="movieImg"
                src={movieData.poster}
                alt={movieData.title}
              />
              <div className="movieInfo">
                <h2>Película: {movieData.title}</h2>
                <h3>Año de Lanzamiento: {movieData.year}</h3>
                <h3>Actores: {movieData.actors}</h3>
                <h3>Director: {movieData.writer}</h3>
                <h3>Duración: {movieData.runtime}</h3>
              </div>
            </div>

            <p className="sinopsis">Sinópsis: {movieData.Plot}</p>
          </>
        ))}

      {selectedMovie && (
        <div id="movieDescriptionRef">
          <div className="movieDescription">
            <img
              className="movieImg"
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
            />

            <div className="movieInfo">
              <h2>Película: {selectedMovie.Title}</h2>
              <h3>Año de Lanzamiento: {selectedMovie.Year}</h3>
              <h3>Actores: {selectedMovie.Actors}</h3>
              <h3>Director: {selectedMovie.Writer}</h3>
              <h3>Duración: {selectedMovie.Runtime}</h3>
              <div className="sinopsisDiv">
                <p className="sinopsis">
                  <strong>Sinópsis:</strong> {selectedMovie.Plot}
                </p>
              </div>
            </div>

            <button
              className={`scrollTopBtn ${
                showScrollTopBtn
                  ? "showBtn animate__animated animate__fadeIn"
                  : "hidden"
              }`}
              onClick={scrollUp}
            >
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p className="devBy">
          Sitio desarrollado por Moisés Berdichevsky <br />
          &copy;MEBA
        </p>
        <div className="poweredDiv">
          <p className="powered">POWERED BY REACT</p>
          <img
            src="../img/logo192.png"
            alt="Logo de React"
            className="logoReact"
          />
        </div>
      </footer>
    </header>
  );
}

export default Header;

