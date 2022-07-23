import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import ProjectLayout from './ProjectLayout'
import SideBar from './SideBar'
import './styles/dashboard.css'

const Dashboard = () => {
  const [source,setSource]=useState();
  const [destination,setDestination]=useState();

  const dragHandler=(result)=>{
    const {source,destination}=result;
    setSource(source);
    setDestination(destination);
  }

  return (
    <DragDropContext onDragEnd={dragHandler}>
    <div className="container">
      <div className="box-30">
        <SideBar/>
      </div>
      <div className="box-70">
        <div className="nav-bar">

        </div>
        <div className="main-container">
          <ProjectLayout source={source} destination={destination}/>
        </div>
      </div>
    </div>
    </DragDropContext>
  )
}

export default Dashboard