import React, { useState } from 'react'
import './styles/newTask.css'

export const NewTask = (props) => {
    const[name,setName]=useState("");
    const [desc,setDesc]=useState("");

    const changeHandler=(e,type)=>{
        if(type=="name")
        setName(e.target.value);
        if(type=="desc")
        setDesc(e.target.value);
    }
  return (
    <div className='add-new'>
        <input type="text" placeholder='Give your task a title' name="title" id="title" onChange={(e)=>changeHandler(e,"name")} onKeyDown={(e)=>props.addHandler(e,props.boxNum,name,desc)}/>
        <input type="text" placeholder='Description' name="desc" id="desc" onChange={(e)=>changeHandler(e,"desc")} onKeyDown={(e)=>props.addHandler(e,props.boxNum,name,desc)}/>
    </div>
  )
}
