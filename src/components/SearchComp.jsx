import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import {counterContext} from "./Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar  } from '@fortawesome/free-solid-svg-icons'

export default function SearchComp() {
  
  let {searchedItem } = useContext(counterContext);
  
    return (
    <>
         <div className="searchcomp">
                <div className="container">
                    <div className="row ">
                     {searchedItem.length > 0 ? searchedItem.filter((value) => {
                        return value.poster_path !== null}).map((movieTvshow , index)=> {
                       return <React.Fragment key={index}>
                        <div className="col-lg-4 col-md-6" >
                        <div className="movie-item shadow-lg   text-center position-relative  ">
                        <div className="rate">
                          <FontAwesomeIcon className="ratestar" icon={faStar} />
                          <span> {movieTvshow.vote_average}</span> 
                        </div>
                        <Link
                              to={`/singleitem/${movieTvshow.id}/${movieTvshow.media_type}`}
                            >
                              <img
                                className="w-100 mb-2"
                                src={`https://image.tmdb.org/t/p/w500${movieTvshow.poster_path}`}
                                alt=""
                              />
                        </Link>
                        {movieTvshow.title === undefined ? <h5 className="text-center title">{movieTvshow.name}</h5> :
                            <h5 className="text-center title">{movieTvshow.title}</h5> }
                             <div className="overview p-3">
                              <Link to={`/singleitem/${movieTvshow.id}/${movieTvshow.media_type}`} >
                              <button className="btn showdetails mt-2 btn-info">show details</button>
                              </Link>
                             
                            </div>
                        </div>
                        </div>
                    </React.Fragment>
                    } )  :  <div className='search-results-div'></div> } 
                     
                
                
                </div>
                </div>
        </div>
    </>
  )
}


