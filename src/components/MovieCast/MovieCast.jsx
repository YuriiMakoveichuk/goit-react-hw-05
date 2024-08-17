import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastMovie } from "../../apiServer/apiHomeMovies";

import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [castsMovie, setCastsMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCastMovie = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCastMovie(movieId);
        console.log(data);
        setCastsMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastMovie();
  }, [movieId]);

  return (
    <>
      <ul className={css.list}>
        {castsMovie !== null &&
          castsMovie.cast.map((castMovie) => {
            return (
              castMovie.profile_path !== null && (
                <li className={css.item} key={castMovie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${castMovie.profile_path}`}
                    alt={castMovie.name}
                  />
                  <h4 className={css.text}>{castMovie.name}</h4>
                  <p>Character: {castMovie.character}</p>
                </li>
              )
            );
          })}
      </ul>
      {isLoading && <Loader />}
      {error && <span>error</span>}
    </>
  );
};

export default MovieCast;
