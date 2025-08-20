

import React from 'react'
import "./login.css"
import { SiTodoist } from "react-icons/si";
import searchIcon from '../assets/search.png'

const Login = () => {

    // const loginwithgoogle = ()=>{
    //     window.open("https://todo-backend-steel-six.vercel.app/auth/google/callback","_self")

        

    // }


    const loginwithgoogle = () => {
  window.open("https://todo-5v1r.onrender.com/auth/google?state=todo", "_self");
}
  return (
    <>
        <div className="login-page">
        {/* <img src="\public\img/electricity.png" alt="" className='thunder-icon'/> 
         */}
         {/* <SiTodoist    className='ligh'/> */}

           <span style={{fontSize:"100px", padding:"20px", fontWeight:"bolder", color:"white"}}>Todo</span>
           
           <p style={{fontSize:"25px"}}>Start having a Super Day!</p>
            <div className="form">
              
              <div className='google-login'>
            <button className='google-btn' onClick={loginwithgoogle}>
                  <img src={searchIcon} alt="" className='google-icon' /> 
                  <span> Sign In With Google</span>
                </button>
                </div>
             
              
            </div>
        </div>
    </>
  )
}

export default Login

