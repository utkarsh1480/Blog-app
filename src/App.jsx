import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login, logout } from './store/auth.slice.js'
import './App.css'

import { Header, Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'
function App() {
  
const [isLoading, setisLoading] = useState(true);
const dispatch = useDispatch();

useEffect(() =>{
  authService.getcurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login(userData));
    } else{
      dispatch(logout());
    }
  })
  .finally(() => setisLoading(false) )

}, [])


 return (!isLoading) ? (
 <div className='min-h-screen flex flex-col justify-between bg-gray-400' >
    <Header />
    <main className='flex-grow'>
      <Outlet />
    </main>
    <Footer />
 </div>
 ) : null;
}

export default App
