import React, { useContext } from 'react'
import {counterContext} from "./Store"

function Footer() {



  let {isLogin} = useContext(counterContext)
  
  return (
  <footer className={isLogin == null ? "footer-fixed-bottom" : "" }>
   <div className="container">
    <div className="footer-content">
    <p className='developer mb-0'>Made with <i className="fas fa-heart"></i>  by Eslam Elsebaey</p>
    <div className="social-items " >
            <a  target="_blank" href="https://www.facebook.com/eslam.elsebaey.707/" rel="noreferrer"> <i className="fa-brands fa-facebook  social-icon "></i></a>
            <a  target="_blank" href="https://github.com/EslamElsebaey" rel="noreferrer">  <i className="fa-brands fa-github  social-icon "></i></a>
            <a  target="_blank" href="https://www.linkedin.com/in/eslam-elsebaey-ab9564163/" rel="noreferrer">   <i className="fa-brands fa-linkedin  social-icon "></i></a>
    </div>
    </div>
  
   </div>
   
  </footer>
  )
}

export default Footer
