import { useEffect, useState } from "react";

import { getHomeMovies } from "../../apiServer/apiHomeMovies";

import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import { Section } from "../../components/Section/Section";
import { Container } from "../../components/Container/Container";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results } = await getHomeMovies();
        setMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeMovies();
  }, []);
  return (
    <>
      <Section>
        <Container>
          <h1 className={css.title}>Trending today</h1>
          <ul className={css.list}>
            {Array.isArray(movies) && <MovieList movies={movies} />}
          </ul>
          {isLoading && <Loader />}
          {error && <span>error</span>}
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
