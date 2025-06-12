// import React, { useEffect, useState } from "react";
// import "./header.css";
// import { NavLink } from "react-router-dom";
// import axios from "axios"
// import { SiTodoist } from "react-icons/si";

// const Header = () => {

//   const [userdata,setUserdata] = useState({});
//   console.log("response",userdata);
//   const getUser = async()=>{
//     try {
//       const response = await axios.get("http://localhost:6005/login/success",{withCredentials:true});
      
//       setUserdata(response.data.user)
      
//     } catch (error) {
//       console.log("error",error);
      
//     }
//   }

//   // logout function
//   const logout = ()=>{
//     window.open("http://localhost:6005/logout","_self")
//   }


//   useEffect(()=>{
//     getUser()
//   },[])


//   // const logout = async () => {
//   //   try {
//   //     // Call the backend logout route
//   //     await axios.get("http://localhost:6005/auth/logout", { withCredentials: true });
      
//   //     // Clear localStorage/sessionStorage if you use it
//   //     localStorage.clear(); // Or sessionStorage.clear() depending on your storage method
  
//   //     // Redirect to login page
//   //     window.location.href = "http://localhost:5173/login"; // Adjust as necessary
//   //   } catch (error) {
//   //     console.error("Logout error:", error);
//   //   }
//   // };
  
//   return (
      


//     <header>
      
//       <nav>
//         <div className="left"><div className="text"><SiTodoist  className="todo-icon" /> todo</div></div>
//         <div className="right">
//         <ul>

//   {
//     Object?.keys(userdata)?.length > 0 ? (
//       <>
//         <li className="butt"><NavLink to={"/"}>Home</NavLink></li>
//        {/* <li  className="butt"tyle={{color:"black",fontWeight:"bold"}}>{userdata?.displayName?.split(" ")[0]}</li> */}
//         <li className="butt"><NavLink to={"/dashboard"}>Todo</NavLink></li>
//         <li onClick={logout} className="logout">Logout</li>
//         <li><img src={userdata?.image} alt="Profile" style={{borderRadius:"50%", border:"3px solid #494949"}} /></li>

      
//       </>
//     ) : (
   
//       <li className="login"><NavLink to={"/login"}>Login</NavLink></li> 
//     )
//   }
// </ul>

//         </div>
//       </nav>
//     </header>
    
//   );
// };

// export default Header;



import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import axios from "axios"
import { SiTodoist } from "react-icons/si";

const Header = () => {
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  const getUser = async () => {
    try {
      const response = await axios.get("https://todo-backend-steel-six.vercel.app/login/success", { withCredentials: true });
      setUserdata(response.data.user)
    } catch (error) {
      console.log("error", error);
    }
  }

  // logout function
  const logout = () => {
    window.open("https://todo-backend-steel-six.vercel.app/logout", "_self")
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <header className="modern-header">
      <nav className="nav-container">
        <div className="brand-section">
          <div className="brand-content">
            <SiTodoist className="brand-icon" />
            <span className="brand-text">Todo</span>
          </div>
        </div>
        
        <div className="nav-section">
          {Object?.keys(userdata)?.length > 0 ? (
            <div className="user-nav">
              <NavLink to="/" className="nav-link">
                <span>Home</span>
              </NavLink>
              
              <NavLink to="/dashboard" className="nav-link">
                <span>Todo</span>
              </NavLink>
              
              <div className="user-menu">
                <div className="user-info">
                  <img 
                    src={userdata?.image} 
                    alt="Profile" 
                    className="user-avatar"
                  />
                  <span className="user-name">
                    {userdata?.displayName?.split(" ")[0]}
                  </span>
                </div>
                
                <button onClick={logout} className="logout-btn">
                  <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="login-btn">
              <svg className="login-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
