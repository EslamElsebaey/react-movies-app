import React from 'react'
import {  useContext } from 'react';
import { Link } from 'react-router-dom';
import {counterContext} from "./MoviesStore"

export default function Tvshow() {
 
  
 let { nums  , tvshows  , getMoviesTvPerson} = useContext(counterContext)

 
 

 
 return (
   <>
     <div className="tvshows">
       <div className="container">
                <div className="row gy-5 gx-4 justify-content-center">
             {tvshows.length > 0 ? tvshows.map((tvshow , index)=>{
                return <React.Fragment key={index}>
                <div className="col-lg-3 col-md-6" >
                  <div className="movie-item       shadow-lg   text-center position-relative  ">
                  <div className="rate">
                    <i className="fa-solid fa-star ratestar"></i>
                    <span> {tvshow.vote_average.toFixed(1)}</span> 
                   </div>
                    <Link
                      to={`/singleitem/${tvshow.id}/${tvshow.media_type}`}
                    >
                      <img
                        className="w-100 mb-2"
                        src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                        alt=""
                      />
                    </Link>
                    <h5 className="text-center title">{tvshow.name}</h5>
                    <div className='overview p-3'>
                    <div className='overview-desc'>
                    <p>{tvshow.overview}</p>
                    <Link
                          to={`/singleitem/${tvshow.id}/${tvshow.media_type}`}
                        >
                        <button className="btn showdetails mt-2 btn-info">show details</button>
                        </Link>
                    </div>
                    </div>
                    <div className="releasedate d-flex align-items-center justify-content-between">
                        <span> vote count : {tvshow.vote_count}</span>
                        <span> release date : {tvshow.first_air_date}</span>
                    </div>
                   
                  </div>
                </div>
              </React.Fragment> 
             } ) : <div className="loading-container">
             <div className="lds-ripple">
               <div></div>
               <div></div>
             </div>
           </div>  }
              <nav className="pagenation-nav" aria-label="...">
                    
                      <ul className="pagination pagination-sm d-flex align-items-center justify-content-center">
                    { nums.map( (num)=>{
                      return  <li key={num} className="page-item "><a onClick={ ()=>{ getMoviesTvPerson(num , "tv") } } className="page-link " >{num}</a></li>
                      
                    })}
                    <li className="page-item "><a onClick={ ()=>{ getMoviesTvPerson( Math.floor(Math.random() * 100 ) , "tv"  ) }     }  className="page-link " >Next</a></li> 
                      </ul>
                </nav>
            
               </div>
       </div>
     </div>
   </>
 )
}




