import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Section } from "../../components/Section/Section";
import { Container } from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import Form from "../../components/Form/Form";

import { getSearchMovie } from "../../apiServer/apiHomeMovies";

import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const queryValue = searchParams.get("query");

  useEffect(() => {
    if (!queryValue) return;
    const fetchSearchMovie = async () => {
      setIsLoading(true);
      setSearchQuery(null);
      setIsError(null);
      setIsEmpty(false);
      try {
        const { results } = await getSearchMovie(queryValue);
        if (!results.length) {
          return setIsEmpty(true);
        }
        setSearchQuery(results);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchMovie();
  }, [queryValue]);

  const handleSubmit = (value) => {
    setSearchParams({
      query: value,
    });
  };

  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-center" reverseOrder={false} />
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <span>Error</span>}
          {isEmpty && <span>No results were found for the query.</span>}
          <ul className={css.list}>
            {Array.isArray(searchQuery) && (
              <MovieList movies={searchQuery} location={location} />
            )}
          </ul>
        </Container>
      </Section>
    </>
  );
};
export default MoviesPage;
