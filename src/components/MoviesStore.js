import React, {  createContext  , useState , useEffect, useCallback} from 'react'
import axios from "axios"
import $ from "jquery";
import { useLocation } from 'react-router-dom';

 export let counterContext = createContext(0) ;


export default function CounterContextProvider (props){
      let location =  useLocation(); 
    let [tvshows , setTvshow] =  useState([]);
    let [persons , setPersons] =  useState([]);
     let [movies, setMovies] = useState([]);
  
    let nums = new Array(7).fill(1).map((ele , index)=>{ return index + 1 } )
  
    
   async function getMoviesTvPerson(page , type){
    $("body , html").animate({
      scrollTop : "0"
    }, 0 )
     let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=56f77d211d0e245479bc8ca9bc057fea&page=`+page); 
     if(location.pathname === "/tvshow"){
        setTvshow(data.results.filter(result =>  result.profile_path !== null ));
        localStorage.setItem("tvshowPage" , page);
     }else if(location.pathname === "/people"){
        setPersons(data.results.filter(result =>  result.profile_path !== null ));
        localStorage.setItem("personsPage" , page);
     }else if(location.pathname === "/movies"){
      setMovies(data.results.filter(result =>  result.profile_path !== null ));
      localStorage.setItem("moviesPage" , page);
   }
   }


   $(".page-item").click(function(e){
    $(e.target).css({
      backgroundColor : "#fcb404" , 
      color : "black"
    });
    $(".page-link").not(e.target).css({
      backgroundColor : "transparent" , 
      color : "#fff"
    })
    
  })

  
  

     
 useEffect(  ()=>{

    if(location.pathname === "/tvshow"){
        if(localStorage.getItem("tvshowPage") !== null){
            getMoviesTvPerson(localStorage.getItem("tvshowPage") , "tv")
          $(".page-link").eq(localStorage.getItem("tvshowPage") - 1).css({
            backgroundColor : "#edaf18" , 
            color : "black"
          });
         }else{
            getMoviesTvPerson(1 , "tv");
         }
    }else if (location.pathname === "/people"){
        if(localStorage.getItem("personsPage") !== null){
            getMoviesTvPerson(localStorage.getItem("personsPage") , "person")
          $(".page-link").eq(localStorage.getItem("personsPage") - 1).css({
            backgroundColor : "#edaf18" , 
            color : "black"
          });
         }else{
            getMoviesTvPerson(1 , "person");
         }
    }else if (location.pathname === "/movies"){
      if(localStorage.getItem("moviesPage") !== null){
        getMoviesTvPerson(localStorage.getItem("moviesPage") , "movie")
      $(".page-link").eq(localStorage.getItem("moviesPage") - 1).css({
        backgroundColor : "#edaf18" , 
        color : "black"
      });
     }else{
        getMoviesTvPerson(1 , "movie");
     }
    }
   
  
    
   } , [location.pathname] )
 
   
    return <counterContext.Provider value={{persons , nums , getMoviesTvPerson , tvshows , movies}}>
        {props.children}
    </counterContext.Provider>

}