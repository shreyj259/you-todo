import React from 'react'
import { Outlet} from 'react-router'
import './styles/loginscreen.css'

const LoginScreen = () => {
  return (
    <div className='container'>
        <div className='box'>
            <div className="img-container">
            <img src="https://i.ibb.co/jgP77g7/Group.png" alt="" />
            </div>
        </div>
        <div className='box'>
            <div className="form-border-box">
            <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default LoginScreen