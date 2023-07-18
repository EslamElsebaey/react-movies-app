import { Link, useNavigate } from 'react-router-dom';
import React ,  { useEffect, useState  } from 'react';
import axios from 'axios';
import  Joi  from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner  } from '@fortawesome/free-solid-svg-icons'



export default function Login() {
  
  let  [loginUser , setLoginUser] = useState({
    "email":"",
    "password":"",
  })
  
  let navigation = useNavigate()

  const [ loginAccept , setLoginAccept ] = useState(""); 
  const [errors , setErrors] = useState([]);
  const [succes , setSuccess] = useState("");

  function matchLoginUser(event){
    let myUser = {...loginUser} ; 
    myUser[event.target.name] = event.target.value;
    setLoginUser(myUser)
  }



 
  function validateLoginUser() {
   let schema = Joi.object({
     email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
     password :  Joi.string().pattern(new RegExp('^[a-z][A-Za-z0-9]{3,20}$')).required(),
   })
     let validate =   schema.validate(loginUser , {abortEarly  : false}); 
     if(validate.error !== undefined){
      setErrors(validate.error.details)
      return false
     }else{
      setErrors("")
      return true
     }
    }
  

  
   

    async function addLoginUser(eventinfo){
      eventinfo.preventDefault();
      if(validateLoginUser() === true){
        let {data} =  await axios.post("https://movies-api.routemisr.com/signin" , loginUser) ;
        setLoginAccept(data.message);
        console.log(data)
        if(data.message === "success"){
          setSuccess(data.message)
          console.log(data.token)
          localStorage.setItem("newUser" , data.token );
          setTimeout(() => {
            navigation("/home");
          }, 2500);
        }
      }
      
    }
  

    
  
  
  
  return (
    <>
     
    <div className="login pt-4 mt-4">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="login-item ">
          {errors.length > 0 ?  <ul className='alert alert-danger mt-3 errorslist'>
          {errors.length > 0 ? errors.map((error , index) => {
            if(error.message.includes("pattern")){
              error.message = "Password must start with small character";
            }
            return <li key={index} className=''>{error.message}</li>
          }) : ""}
          </ul> : "" }  
          {succes.includes("success") ? <h5 className=' d-flex align-items-center  registermessage'> Login Succeeded , Going to Home <FontAwesomeIcon spin className='ms-2' icon={faSpinner} />    </h5>  :""}
          <h1 className="mb-3 text-center">Login</h1>
          <form onSubmit={  (eventinfo)=>{ addLoginUser(eventinfo) }}>
            <label htmlFor="">Eamil :</label>
            <input type="text" onChange={ (event)=>{matchLoginUser(event)} } className="form-control email " name='email' />
            { loginAccept.includes("email") ? <p className='text-danger emailmessage '>{loginAccept}</p> : "" }
            <label htmlFor="">Password : </label>
            <input type="password" onChange={ (event)=>{matchLoginUser(event)} }  className="form-control password" name='password' />
            { loginAccept.includes("password") ? <span className='text-danger passwordmessage mb-3 d-block '>{loginAccept}</span> : "" }
            <div className='row align-items-center'>
              <div className="col-md-6 text-center-sm">
              <button type='submit' className=' loginbtn  mt-2 '>Login</button>
              </div>
              <div className="col-md-6 registerBtn">
                <p>You don't have account ? <Link to="/register">Register</Link></p>
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
