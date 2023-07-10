import axios from 'axios';
import Joi from 'joi';
import React, {  useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner  } from '@fortawesome/free-solid-svg-icons'

export default function Register() {
 
  let navigation = useNavigate()
    const [user , setUser] = useState({
      first_name : "" , 
      last_name : "" , 
      email : "" , 
      password : "" , 
    }) ; 
     


    const [errors , setErrors] = useState([]);
    const [succes , setSuccess] = useState("");

    function addUser ( event){
      let myUser = {...user}
      myUser[event.target.name] = event.target.value;
      setUser(myUser)
    }

 async function sendUser (event){
  event.preventDefault();
  if(validateUserData() === true){
    let response = await axios.post("https://movies-api.routemisr.com/signup" , user);
    if(response.data.message.includes("success")){
        setSuccess(response.data.message);
        setErrors([])
        setTimeout(() => {
          navigation("/login")
        }, 2500);
    }else{
      setErrors([]);
      setSuccess(response.data.message);
      $(".registermessage").css("marginTop", "-10px")
    }
  }

 }

 function validateUserData() {
  let schema = Joi.object({
    first_name : Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required(), 
    last_name :Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required(), 
    email : Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
    password :  Joi.string()
    .pattern(new RegExp('^[a-z][A-Za-z0-9]{3,20}$')).required(),
  })
    let validate =   schema.validate(user , {abortEarly  : false}); 
    if(validate.error !== undefined){
      setErrors(validate.error.details);
      console.log(errors)
      return false
    }else{
      return true
    }
    
    
 }
 
  return (
    <>
    <div className="register pt-4  mt-4">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="register-item">
        {errors.length > 0 ?  <ul className='alert alert-danger errorslist'>
          {errors.length > 0 ? errors.map((error , index) => {
              if(error.message.includes("alpha-numeric")){
                error.message = "Name must contains characters only"
              }
              if(error.message.includes("pattern")){
                error.message = "Password must start with small character"
              }
              if(error.message.includes("email")){
                error.message = "Email must be a valid email example johndoe123@gmail.com/net"
              }
            return <li key={index} className=''>{error.message}</li>
          }) : ""}
          </ul> : "" }  
          
         {succes.includes("success") ? <h5 className=' d-flex align-items-center alert alert-success  registermessage'> Register Succeeded, Going to login   <FontAwesomeIcon className='ms-2' spin icon={faSpinner} /> </h5>  :""}
          <h2 className='mb-3 text-capitalize'>Register </h2>
          <form onSubmit={  (event)=>{ sendUser(event)} }>
            <label htmlFor="">First Name : </label>
            <input type="text"  onChange={ addUser   } className="form-control" name='first_name' />
            <label htmlFor="">Last Name : </label>
            <input type="text"   onChange={ addUser   }  className="form-control" name='last_name' />
            <label htmlFor="">Email : </label>
            <input type="email"   onChange={ addUser   } className="form-control" name='email' />
           {succes.includes("registered") ?  <h5 className='text-danger alert alert-danger'>email already registered</h5>  : ""} 
            <label htmlFor="">Password : </label>
            <input type="password"   onChange={ addUser   }  className="form-control" name='password' />
            <div className="row align-items-center">
              <div className="col-md-6 text-center-sm">
              <button type='submit' className=' register-btn '>Register</button>
              </div>
            <div className="col-md-6 login-btn">
            <p>Already have account ? <Link to='/login'>Login</Link></p>
            </div>
             
            </div>
           
          </form>
          </div>
        </div>
      </div>
    
    </div>
    </div>
   
    </>
  )
}
