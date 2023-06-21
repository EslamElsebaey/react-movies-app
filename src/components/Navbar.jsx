/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState }  from 'react'
import {Link , useNavigate} from "react-router-dom"
import $ from "jquery";




export default function Navbar({isLogin  , userName , setuserName , setIsLogin , inputSearchFunc , setSearchedItem }) {
 

  let navigation = useNavigate()
 
  function logOut(){
  localStorage.removeItem("newUser");
  setIsLogin(null)
  setuserName("");
  navigation("/login");
  localStorage.removeItem("moviesPage")
  localStorage.removeItem("tvshowPage")
  localStorage.removeItem("personsPage")
  closeNavFunc()
 }


 const [closeNav , setCloseNav] = useState(false) ;
 const [toggleNavIcon , setToggleNavIcon] = useState(false) ;




 function closeNavFunc(){
  setCloseNav(true)
  setToggleNavIcon(!toggleNavIcon)
 }






let navbarRef = useRef(null) ; 

useEffect(()=>{
  if(closeNav === true){
    navbarRef.current.classList.remove("show") ;
    setCloseNav(false)
  }
} , [closeNav])



$(".nav-link").click(function (e){
  $(e.target).css("color" , "#edaf18");
  $(".nav-link").not(e.target).css("color" , "white");
})


function emptySearchInput (){
  $(".search-input").val("");
  setSearchedItem([]);
  $(".search-close").addClass("d-none");
}


// scroller progress

window.addEventListener("scroll", () => {
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  $(".scroller").css("width" , `${(scrollTop / height) * 100}%`)
});

 
 
  return (
    <>
   
    <nav className="navbar navbar-expand-lg" >
    {isLogin == null ? "" : <div className="scroller"></div>}
      <div className="container">
      <div className="logoinfo d-flex align-items-center justify-content-center">
            <Link className="navbar-brand text-capitalize" to="home">
            <i className="fa-solid fa-clapperboard logo "></i>
            </Link>
        </div>
      
        <button  onClick={()=>setToggleNavIcon(!toggleNavIcon)}   className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className='nav-icon'><i className= {`fa-solid  ${toggleNavIcon ? "fa-close" :"fa-bars" } `} ></i></span>
        </button>
     
      
      <div  ref={navbarRef}  className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLogin === null ? "" :   <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link homelink " onClick={ ()=> closeNavFunc()}    aria-current="page"       to="home" >home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="movies" aria-current="page" onClick={ ()=> closeNavFunc()}     >movies</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="tvshow" onClick={ ()=> closeNavFunc()}  aria-current="page"     >tv shows</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="people" onClick={ ()=> closeNavFunc()}  aria-current="page" >people</Link>
            </li>
          </ul>}
        
          <ul className="navbar-nav ms-auto  ">
            {isLogin === null ? "" :   <li className="nav-item inputli ">
              <Link to="/SearchComp">
             <div className='position-relative h-100'>
              <input type="text" onKeyUp={(event)=>{ inputSearchFunc(event)  }} className='form-control h-100 search-input' placeholder='Search' />
              <span className='search-close d-none ' onClick={ ()=>{emptySearchInput()}}><i   className="fa-solid fa-circle-xmark"></i></span>
             </div>   
              </Link>
          </li>}
        
          <li className="nav-item social-items d-flex align-items-center" >
            <a  target="_blank" href="https://www.facebook.com/eslam.elsebaey.707/" rel="noreferrer"> <i className="fa-brands fa-facebook  social "></i></a>
            <a  target="_blank" href="https://github.com/EslamElsebaey" rel="noreferrer">  <i className="fa-brands fa-github  social "></i></a>
            <a  target="_blank" href="https://www.linkedin.com/in/eslam-elsebaey-ab9564163/" rel="noreferrer">   <i className="fa-brands fa-linkedin  social "></i></a>
          </li>
          {isLogin ? <>    <li className="nav-item d-flex align-items-center">
            <span className='nav-link'>Hello {userName} <i className="fa-solid face fa-face-grin-beam"></i></span>
            </li> <li className="nav-item d-flex align-items-center ">
               <a onClick={logOut} className="nav-link logout">logout</a>
            </li> </>  :  <><li className="nav-item">
              <Link className="nav-link" onClick={ ()=> closeNavFunc()} to="login">login</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" onClick={ ()=> closeNavFunc()} to="register">register</Link>
            </li></>}
          </ul>
        </div>
       
      </div>
    </nav>

    </>
  )
}
