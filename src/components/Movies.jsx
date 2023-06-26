/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {  useContext } from "react";
import { Link } from "react-router-dom";
import {counterContext} from "./Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar  } from '@fortawesome/free-solid-svg-icons'





export default function Movies() {
 
 
  let { nums  , movies , getMoviesTvPerson} = useContext(counterContext)



  return (
    <>
      <div className="movies">
        <div className="container">
          <div className="row justify-content-center">
                {movies.length > 0 ? movies.map((movie , index)=>{
                    return <React.Fragment key={index}>
                    <div className="col-lg-3 col-md-6 " >
                      <div className="movie-item       shadow-lg  text-center position-relative  " >
                        <div className="rate">
                        <FontAwesomeIcon className="ratestar" icon={faStar} />
                         <span> {movie.vote_average.toFixed(1)}</span> 
                        </div>
                        <Link
                          to={`/singleitem/${movie.id}/${movie.media_type}`}
                        >
                          <img
                            className="w-100 mb-2"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt=""
                          />
                        </Link>
                        <h5 className="text-center title">{movie.title}</h5>
                        <div className="overview p-3">
                          <div className="overview-desc">
                            <p>{movie.overview}</p>
                          <Link to={`/singleitem/${movie.id}/${movie.media_type}`} >
                          <button className="btn showdetails mt-2 btn-info">show details</button>
                          </Link>
                          </div>
                        </div>
                        <div className="releasedate d-flex align-items-center justify-content-between">
                          <span> vote count : {movie.vote_count}</span>
                          <span> release date : {movie.release_date}</span>
                        </div>
                       
                      </div>
                    </div>
                  </React.Fragment>} )  :  <div className="loading-container">
                    <div className="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                 </div>  }
                 
              <nav className="pagenation-nav" aria-label="...">
                <ul className="pagination pagination-sm d-flex align-items-center justify-content-center">
               { nums.map( (num , index)=>{
                return  <li  key={index} className="page-item "><a onClick={ ()=>{ getMoviesTvPerson(num , "movie") } } className="page-link " >{num}</a></li>
                
               })}
               <li className="page-item "><a onClick={ ()=>{ getMoviesTvPerson( Math.floor(Math.random() * 100 ) , "movie"  ) }     }  className="page-link " >Next</a></li> 
                </ul>
              </nav>
          </div>
        </div>
      </div>
    </>
  );
}
