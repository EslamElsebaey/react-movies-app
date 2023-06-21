import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


export default function Home({checkLogin}) {
  let [movies, setMovies] = useState([]);
  let [tvshows, setTvshows] = useState([]);
  let [persons, setPersons] = useState([]);

  async function getTrending(type, setterFunction ) {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/" +
        type +
        "/day?api_key=56f77d211d0e245479bc8ca9bc057fea"
    );
    setterFunction(data.results.filter((result) => { return result.profile_path !== null }));
    checkLogin()
  }
  

  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTvshows);
    getTrending("person", setPersons);
    checkLogin()
  }, []);

  return (
    <>
   
      <div className="home">
        <div className="container">
          <div className="row mb-5 gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="trendingmovies">
                <h2>
                  Trending movies  to watch now
                </h2>
                <p>Most watched movies by days</p>
              </div>
            </div>
            {movies.length > 0 ?  movies.slice(0, 16).map((movie ) => {
              if (movie.title === undefined) {
                movie.title = movie.name;
              }
              return (
                <React.Fragment key={movie.id}>
                  <div className="col-lg-2 col-md-3"  >
                    <div className="home-movies-item    position-relative">
                      <div className="rate">
                        {movie.vote_average.toFixed(1)}
                      </div>
                      <Link  to={`/singleitem/${movie.id}/${movie.media_type}`}>
                      <img
                        className="w-100 mb-2"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                      />
                      </Link>
                      <h5 className="text-center movies-title">{movie.title}</h5>
                    </div>
                  </div>
                </React.Fragment>
              );
            })  : <div className="loading-container">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>}
          </div>

          {/* ************************************************ */}
          <div className="row mb-5 gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="trendingmovies">
                <h2>
                  Trending  Tv shows  to watch now
                </h2>
                <p>Most watched tv shows by days</p>
              </div>
            </div>
            {tvshows.slice(0, 16).map((tvshow) => {
              return (
                <React.Fragment key={tvshow.id}>
                  <div className="col-lg-2 col-md-3"  >
                    <div className="home-tvshow-item     position-relative">
                      <div className="rate">
                        {tvshow.vote_average.toFixed(1)}
                      </div>
                      <Link  to={`/singleitem/${tvshow.id}/${tvshow.media_type}`}>
                      <img
                        className="w-100 mb-2"
                        src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                        alt=""
                      />
                       </Link>
                      <h5 className="text-center title">{tvshow.name}</h5>
                    </div>
                  </div>
                </React.Fragment>
                )
            })}
          </div>

          {/* ************************************************ */}
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="trendingmovies">
                <h2>
                  Trending  stars  to discover now
                </h2>
                <p>Most watched stars by days</p>
              </div>
            </div>
            {persons.slice(0, 16).map((person , index) => {
              return (
                <React.Fragment key={person.id}>
                  <div className="col-lg-2 col-md-3">
                    <div className="home-person-item    position-relative ">
                    <Link  to={`/singleperson/${person.id}`}>
                      <img
                        className="w-100 mb-2"
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt=""
                      />
                       </Link>
                      <h5 className="text-center title">
                        {person.original_name}
                      </h5>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
