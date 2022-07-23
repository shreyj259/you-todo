import React,{useRef, useState} from 'react'
import {  useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const emailRef=useRef();
    const passRef=useRef();
    const {login} = useAuth();
    const [remember,setRemember]=useState(false);
    const history=useNavigate();
    const [error,setError]=useState();
    const [loading,setLoading]=useState(false);


    const rememberHandler=()=>{
        if(remember)
        window.localStorage.setItem("isLoggedIn",true);
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
          setLoading(true);
           await login(emailRef.current.value,passRef.current.value);
           rememberHandler();
           history("/dashboard");
        }
        catch(err){
          setLoading(false);
            setError("Failed to Login !");
        }
    }

    const printError=<div className="error-box">{error} </div>
  return (<>
    <div className="nav">
                <Link className="active-link" to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
    <div className="inner-box">
        <div className="login-text">
        <span className='login-head'>To Continue</span> <br/>
        We need your Name & Email 
        </div>
        <form onSubmit={handleSubmit}>
        <input ref={emailRef} placeholder="Email" type="email"/> <br/>
        <input type="password" placeholder="Password" ref={passRef} /> <br/>
        {error && printError}
        <button disabled={loading}>Log In</button> <br/>
        <input type="checkbox" onChange={(e)=>setRemember(e.target.checked)} id="remember" name="remember"/> 
        <label htmlFor="remember">Remember Me</label>
       </form>
    </div>
    </>
  )
}
