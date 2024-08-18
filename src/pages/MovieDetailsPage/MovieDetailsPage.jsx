import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import { Container } from "../../components/Container/Container";
import { Section } from "../../components/Section/Section";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";

import { getDetailsMovie } from "../../apiServer/apiHomeMovies";

import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchDetailsMovie = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDetailsMovie(movieId);
        setDetailsMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailsMovie();
  }, [movieId]);

  return (
    <>
      {detailsMovie !== null && (
        <>
          <Section>
            <Container>
              <GoBackBtn backLinkRef={backLinkRef} />
              <div className={css.boxMain}>
                <div className={css.boxImg}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${detailsMovie.backdrop_path}`}
                    alt={detailsMovie.title}
                  />
                </div>
                <div className={css.details}>
                  <h2 className={css.title}>
                    {detailsMovie.title} (
                    {detailsMovie.release_date.slice(0, 4)})
                  </h2>
                  <p className={css.text}>
                    User score: {Math.round(detailsMovie.vote_average * 10)}%
                  </p>
                  <h3 className={css.subtitle}>Overview</h3>
                  <p className={css.text}>{detailsMovie.overview}</p>
                  <h3 className={css.subtitle}>Genres</h3>
                  <p>
                    {detailsMovie.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <div className={css.information}>
                <h3 className={css.informationTitle}>Additional information</h3>
                <ul className={css.list}>
                  <li className={css.item}>
                    <Link className={css.link} to="cast">
                      Cast
                    </Link>
                  </li>
                  <li className={css.item}>
                    <Link className={css.link} to="reviews">
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </Section>
          <Section>
            <Container>
              <div>
                <Outlet />
              </div>
            </Container>
          </Section>
        </>
      )}
      {isLoading && <Loader />}
      {error && <span>error</span>}
    </>
  );
};

export default MovieDetailsPage;
