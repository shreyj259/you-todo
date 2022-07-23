import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate , Link}  from 'react-router-dom';


export default function Signup() {
    const emailRef=useRef();
    const passRef=useRef();
    const nameRef=useRef();
    const {signup} = useAuth()
    const history=useNavigate();

    const [error,setError]=useState();
    const [loading,setLoading]=useState();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(passRef.current.value.length<6){
          return setError("Password sould be atleast 6 characters long");
        }
        try{
          setLoading(true);
          setError('');
           await signup(emailRef.current.value,passRef.current.value);
           setLoading(false);
           history("/dashboard");
        }
        catch(err){
          setLoading(false);
          setError("Failed to Create a new account");
        }
    }
    const printError=<div className="error-box">{error} </div>
  return (<>
  <div className="nav">
                <Link  to="/login">Log In</Link>
                <Link className="active-link" to="/signup">Sign Up</Link>
            </div>
    <div className="inner-box">
        <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder="Full Name" />  <br/>
        <input ref={emailRef} type="email" placeholder='Email'/> <br/>
        <input type="password" ref={passRef} placeholder="Password" /> <br/>
        {error && printError}
        <button disabled={loading }>Sign Up</button>
        <input type="checkbox"  id="remember" name="remember"/> 
        <label htmlFor="remember">Remember Me</label>
        </form>
    </div>
    </>
  )
}
