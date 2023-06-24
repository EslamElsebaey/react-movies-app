import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import $ from "jquery";
import {counterContext} from "./Store"


export default function People() {
 

 let  {persons , nums , getPersons , getMoviesTvPerson} = useContext(counterContext)






setTimeout(() => {
  $(".clicktoshow").animate({
    opacity : "1" ,
  } , 1000);
}, 1700);


setTimeout(() => {
  $(".clicktoshow").animate({
    opacity : "0" ,
  } , 1000);
}, 3000);


 

 return (
   <>
    
     <div className="persons">
       <div className="container">
                <div className="row" >
                  <span className=' d-flex align-items-center justify-content-center clicktoshow'> <i className="fa-solid text-warning me-2 fs-6 fa-circle-exclamation"></i> click on anyone to show details</span>
               { persons.length > 0 ?  persons.map(  (person , index)=> {
                     return <React.Fragment key={index}>
                     <div key={person} className='bigitem  col-lg-3 col-md-6'   >
                        <div  className="person-item     w-100 mb-5"   >
                          <Link to={`/singleperson/${person.id}`}>
                         <img    src={`https://image.tmdb.org/t/p/w500${person.profile_path && person.profile_path}`} alt="" />
                         </Link>
                         <div  className="overlay w-100 ">
                         <h5   className='text-center name'>{person.name}</h5>
                         <Link to={`/singleperson/${person.id}`}>
                         <button  className='detailsBtn'>Show Details</button>
                         </Link>
                         <h6   className='text-center department'>{person.known_for_department}</h6>
                         </div>
                        </div>
                     </div>
                     </React.Fragment>
               } ) : <div   className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div>  }
                 <nav  className="pagenation-nav" aria-label="...">
                <ul  className="pagination pagination-sm d-flex align-items-center justify-content-center">
               { nums.map( (num , index)=>{
                return  <li key={index}  className="page-item "><a onClick={ ()=>{ getMoviesTvPerson(num , "person") } } className="page-link " >{num}</a></li>
               })}
               <li  className="page-item "><a onClick={ ()=>{ getPersons( Math.floor(Math.random() * 100 )  , "person" ) }     }  className="page-link " >Next</a></li> 
                </ul>
              </nav>
               </div>
       </div>
     </div>
   </>
 )
}
