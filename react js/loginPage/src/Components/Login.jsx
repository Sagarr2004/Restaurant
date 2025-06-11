import React from 'react'
import {useState} from 'react';
import { MdOutlineMailOutline , MdLockOutline} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import './SignUp.css'


export default function Login() {
 
    const data = {
        name:"",
        email:"",
        password:""
     }
     const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
     });
   //   const [clearText,setClearText] = useState('');

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

  function handleClear() {
   console.log("HandleClear is Click");
   setFormData({
       name: '',
       email: '',
       password: ''
   });
}

     const[action,setAction] = useState("Sign Up");
  return (
    
    <div className="container">
       <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
       </div>
        <div className="inputs">
            {action === "Login" ? <div/> : <div className="input">
           <FaRegUser className='icon' />
            <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleInputChange} />
           </div>}

           <div className="input">
           <MdOutlineMailOutline className='icon'/>
            <input type="email"  name='email' placeholder='Email'  value={formData.email} onChange={handleInputChange} />
           </div>

           <div className="input">
           <MdLockOutline className='icon'/>
            <input type="password"  name='password' placeholder='Password'  value={formData.email} onChange={handleInputChange}/>
           </div>
        </div>
        {action === "Sign Up" ? <div/> :
        <div className="forgo   t-password"> Lost Password? <span>Click Here!</span> </div>}
        <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up"); handleClear(); }} >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => { setAction("Login"); handleClear(); }}
                >
                    Login
                </div>
            </div>
    </div>
   
  )
}