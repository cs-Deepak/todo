import { useState } from 'react'
import './App.css'
import Home from './Component/Home'
import Header from './Component/Headers'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import Error from './Component/Error'
import { Routes,Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import Document from './Component/Document'
import Chartbar from './Component/footer/Chartbar'
import Linechart from './Component/footer/Linechart'
import Setting from './Component/footer/Setting'
import Zip from './Component/footer/Zip'



function App() {
  const [count, setCount] = useState(0)
    const location = useLocation(); 

  return (
    <>
     {/* Conditionally render Header based on current path */}
     {location.pathname !== '/login'  && <Header />}

<Routes>
 
  <Route path='/' element={<Home />} />
  <Route path='/login' element={<Login />} />
  <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/document' element={<Document />} />     
  <Route path='/chartbar' element={<Chartbar />} />    
  <Route path='/linechart' element={<Linechart />} />    
  <Route path='/setting' element={<Setting />} />     
  <Route path='/zip' element={<Zip />} />     
  <Route path='*' element={<Error />} />  

</Routes>


      {/* {location.pathname !== '/login' && <Footer />} */}

      
    </>
  )
}

export default App
