import { Routes , Route  } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Movies from './components/Movies';
import People from './components/People';
import Register from './components/Register';
import Tvshow from './components/Tvshow';
import Notfound from './components/Notfound';
import Singleitem from './components/Singleitem';
import Protectedroute from './components/Protectedroute';
import Singleperson from './components/Singleperson';
import SearchComp from './components/SearchComp';
import $ from "jquery";
import CounterContextProvider   from "./components/Store"
import Footer from "./components/Footer";
import { useEffect } from "react";






function App() {



 

 $(window).scroll( ()=>{
  if(window.scrollY > 450){
    $(".toTop").fadeIn(400)
  }else{
    $(".toTop").fadeOut(400)
  }
 })

function goToTop(){
  window.scrollTo(0, 0)
}




 
 
 
 
  return (
    <>
    <CounterContextProvider>
    <div onClick={goToTop} className="toTop"> <i className="fas arrowTop fa-arrow-up"></i> </div>
   <Navbar  />
   <Routes>
   <Route path="/"  element={<Protectedroute>  <Home/></Protectedroute> } />
   <Route path="login"  element={  <Login  />  } />
   <Route path="register"  element={   <Register/> } />
    <Route path="home"  element={  <Protectedroute>  <Home/></Protectedroute> } />
    <Route path="singleitem/:itemId/:mediaType"  element={ <Protectedroute><Singleitem/></Protectedroute>   } />
    <Route path="singleperson/:personId"  element={ <Protectedroute> <Singleperson/> </Protectedroute>   } />
    <Route path="SearchComp"  element={ <Protectedroute>  <SearchComp/></Protectedroute>   } />
    <Route path="movies"  element={ <Protectedroute>  <Movies/></Protectedroute>   } />
    <Route path="people"  element={   <Protectedroute>   <People/> </Protectedroute> 
 } />
    <Route path="tvshow"  element={ <Protectedroute>  <Tvshow/> </Protectedroute>     } />
    <Route path="*"  element={<Notfound/>} />
   </Routes>
   <Footer/>
    </CounterContextProvider>
 

  
    
    </>
  );
}

export default App;
