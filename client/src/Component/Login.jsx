

import React from 'react'
import "./login.css"
import { SiTodoist } from "react-icons/si";

const Login = () => {

    const loginwithgoogle = ()=>{
        window.open("https://todo-backend-9hds.onrender.com/","_self")
    }
  return (
    <>
        <div className="login-page">
        {/* <img src="\public\img/electricity.png" alt="" className='thunder-icon'/> 
         */}
         <SiTodoist    className='ligh'/>

           <span style={{fontSize:"100px", padding:"20px", fontWeight:"bolder", color:"white"}}>𝚂𝚞𝚙𝚎𝚛 𝙳𝚊𝚢</span>
           
           <p style={{fontSize:"25px"}}>Start having a Super Day!</p>
            <div className="form">
              
              <div className='google-login'>
            <button className='google-btn' onClick={loginwithgoogle}>
                  <img src="/public/img/search.png" alt="" className='google-icon' /> 
                  <span> Sign In With Google</span>
                </button>
                </div>
             
              
            </div>
        </div>
    </>
  )
}

export default Login
