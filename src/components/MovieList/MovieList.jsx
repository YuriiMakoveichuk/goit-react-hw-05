import { Link } from "react-router-dom";

import css from "./MovieList.module.css";

const MovieList = ({ movies, location }) => {
  return (
    <>
      {movies.map((movie) => {
        return (
          <li className={css.item} key={movie.id}>
            <Link
              className={css.link}
              state={{ from: location }}
              to={`/movies/${movie.id}`}
            >
              {movie.title}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default MovieList;
