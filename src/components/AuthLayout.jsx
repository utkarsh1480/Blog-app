import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function AuthLayout({authentication = true, children }) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const[loading, Setloaing] = useState(true)

    useEffect(() =>{
        if(authentication &&  authStatus !== authentication){
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){
            navigate('/')
        } 
           Setloaing(false);
    },[authStatus, navigate, authentication])
 
  return (
    (loading) ? <div>Loading............</div>: <div>{children} </div>
  )
}

export default AuthLayout