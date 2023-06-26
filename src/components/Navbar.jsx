/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState , useContext }  from 'react'
import {Link , useNavigate} from "react-router-dom"
import $ from "jquery";
import {counterContext} from "./Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinBeam  , faClapperboard , faBars , faClose , faSearch , faCircleXmark } from '@fortawesome/free-solid-svg-icons'




export default function Navbar() {
 


  let {isLogin  , userName , setuserName , setIsLogin , inputSearchFunc , setSearchedItem } = useContext(counterContext)
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
 const [togglSearchIcon , setToggleSearchIcon] = useState(false) ;
 const [activeNavLink , setActiveNavLink] = useState(null)




 function closeNavFunc(){
  setCloseNav(true)
  setToggleNavIcon(!toggleNavIcon)
 }


 function handleActiveNavLink (id){
  setActiveNavLink(id)
 }






let navbarRef = useRef(null) ; 

useEffect(()=>{
  if(closeNav === true){
    navbarRef.current.classList.remove("show") ;
    setCloseNav(false)
  }
} , [closeNav , isLogin])




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
        <div className='d-flex align-items-center'>
        <div className="logoinfo d-flex align-items-center justify-content-center">
            <Link className="navbar-brand text-capitalize" to="home">
            <FontAwesomeIcon className='logo' icon={faClapperboard} />
            </Link>
      </div>
      {isLogin === null ? "" :  <div className="nav-item  hello-user-mainNav   d-flex align-items-center">
            <span className='nav-link'>Hello {userName} <FontAwesomeIcon  className='face' icon={faFaceGrinBeam} />   </span>
            </div>
      }
        </div>
     
     

      <div className='search-bars-div'>
        {isLogin ?   <button onClick={()=>setToggleSearchIcon(!togglSearchIcon)} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent2" aria-expanded="false" aria-label="Toggle navigation" className='search-btn' >
        <FontAwesomeIcon icon={ togglSearchIcon ?  faClose   : faSearch} />
        </button>: "" }
        <button  onClick={   ()=> setToggleNavIcon(!toggleNavIcon)}   className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className='nav-icon'> <FontAwesomeIcon icon={ toggleNavIcon ?  faClose   : faBars} />   </span>
        </button>
       
      </div>
        
     <div className="collapse navbar-collapse " id="navbarSupportedContent2">
      <ul className='navbar-nav'>
      <li className="nav-item inputli inputli-small  ">
              <Link to="/SearchComp">
             <div className='position-relative h-100'>
              <input type="text" onChange={(event)=>{ inputSearchFunc(event)  }} className='form-control h-100 search-input' placeholder='Search' />
              <span className='search-close d-none ' onClick={ ()=>{emptySearchInput()}}><FontAwesomeIcon icon={faCircleXmark} /></span>
             </div>   
              </Link>
      </li>
      </ul>
    
     </div>
      
      <div  ref={navbarRef}  className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLogin === null ? "" :   <ul className= "navbar-nav me-auto   mb-lg-0">
            <li className="nav-item">
              <Link className= {`nav-link  ${activeNavLink === 1 ? "activeNavLink" : "" }`}  onClick={ ()=> {closeNavFunc(); handleActiveNavLink(1) } }    aria-current="page"       to="home" >home</Link>
            </li>

            <li className="nav-item">
            <Link className= {`nav-link ${activeNavLink === 2 ? "activeNavLink" : "" }`}  onClick={ ()=> {closeNavFunc(); handleActiveNavLink(2) } }    aria-current="page"      to="movies" >movies</Link>
            </li>
            <li className="nav-item">
              <Link className= {`nav-link ${activeNavLink === 3 ? "activeNavLink" : "" }`}  onClick={ ()=> {closeNavFunc(); handleActiveNavLink(3) } }    aria-current="page"      to="tvshow" >tv shows</Link>
            </li>
           
            <li className="nav-item">
              <Link className= {`nav-link ${activeNavLink === 4 ? "activeNavLink" : "" }`}  onClick={ ()=> {closeNavFunc(); handleActiveNavLink(4) } }    aria-current="page"     to="people" >people</Link>
            </li>
          </ul>}
        
          <ul className="navbar-nav ms-auto  ">
            {isLogin === null ? "" :   <li className="nav-item inputli   ">
              <Link to="/SearchComp">
             <div className='position-relative h-100'>
              <input type="text" onChange={(event)=>{ inputSearchFunc(event)  }} className='form-control h-100 search-input' placeholder='Search' />
              <span className='search-close d-none ' onClick={ ()=>{emptySearchInput()}}><FontAwesomeIcon icon={faCircleXmark} /></span>
             </div>   
              </Link>
          </li>}
          {isLogin ? <>    <li className="nav-item hello-user-ulNav  d-flex align-items-center">
            <span className='nav-link'>Hello {userName} <FontAwesomeIcon  className='face' icon={faFaceGrinBeam} /></span>
            </li> <li className="nav-item  d-flex align-items-center ">
               <button onClick={logOut} className="nav-link logout">logout</button>
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
