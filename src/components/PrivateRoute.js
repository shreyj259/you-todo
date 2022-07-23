import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute() {

    const {currentUser}=useAuth();
    const log=window.localStorage.getItem("isLoggedIn");

  return (
    log==true||currentUser!==null?<Outlet/>:<Navigate to="/login" />
  )
}
