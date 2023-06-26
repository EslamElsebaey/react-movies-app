import React, { useContext } from 'react'
import {counterContext} from "./Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart  } from '@fortawesome/free-solid-svg-icons'
import { faFacebook  , faGithub , faLinkedin } from "@fortawesome/free-brands-svg-icons"

function Footer() {



  let {isLogin} = useContext(counterContext)
  
  return (
  <footer className={isLogin == null ? "footer-fixed-bottom" : "" }>
   <div className="container">
    <div className="footer-content">
    <p className='developer mb-0'>Made with <FontAwesomeIcon className='heart' icon={faHeart} />   by Eslam Elsebaey</p>
    <div className="social-items " >
            <a  target="_blank" href="https://www.facebook.com/eslam.elsebaey.707/" rel="noreferrer">   <FontAwesomeIcon className='social-icon' icon={faFacebook} />    </a>
            <a  target="_blank" href="https://github.com/EslamElsebaey" rel="noreferrer">  <FontAwesomeIcon className='social-icon' icon={faGithub} /></a>
            <a  target="_blank" href="https://www.linkedin.com/in/eslam-elsebaey-ab9564163/" rel="noreferrer">   <FontAwesomeIcon className='social-icon' icon={faLinkedin} /></a>
    </div>
    </div>
  
   </div>
   
  </footer>
  )
}

export default Footer
