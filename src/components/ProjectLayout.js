import React, { useEffect, useState } from 'react'
import { NewTask } from './NewTask'
import TodoTile from './TodoTile'
import './styles/projectLayout.css'
import uuid from 'react-uuid'
import { Droppable } from 'react-beautiful-dnd'
import { setDoc,doc,onSnapshot,updateDoc} from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from "../firebase";

const ProjectLayout = ({source,destination}) => {
    const {currentUser}=useAuth();
    const [toggleAdd,setToggleAdd]=useState({
        one:false,
        two:false,
        three:false
    })

    const [todoList,setTodoList]=useState({
        todo:[],
        inProgress:[],
        completed:[]
    })

    const handleDrag=async ()=>{
        if(!destination)
        return;
        if(source.droppableId==destination.droppableId)
        return
        else{
               let list={...todoList}
               let add;
                let todos=[...todoList.todo]
                let inProgress=[...todoList.inProgress]
                let completed=[...todoList.completed]
            if(source.droppableId=="todoBox"){
                add=todos.splice(source.index,1)[0];
            }
            if(source.droppableId=="inProgress"){
                add=inProgress.splice(source.index,1)[0];
            }
            if(source.droppableId=="completed"){
                add=completed.splice(source.index,1)[0];
            }
            if(destination.droppableId=="todoBox"){
                todos.splice(destination.index,0,add)
            }
            if(destination.droppableId=="inProgress"){
                inProgress.splice(destination.index,0,add)
            }
            if(destination.droppableId=="completed"){
                completed.splice(destination.index,0,add)
            }

            list.todo=todos;
            list.inProgress=inProgress;
            list.completed=completed
            const nameList = doc(db, "tasks", currentUser.uid);
            try{
            await updateDoc(nameList,list);
            setTodoList(list);
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
        if (currentUser) {
          const nameList = doc(db, "tasks", currentUser.uid);
          const unsub = onSnapshot(nameList, (todo) => {
            if(todo.exists()){
            const temp=todo.data();
            setTodoList(temp);
            }
          });
          return () => unsub();
        }
      }, []);


    useEffect(()=>{
        handleDrag();
    },[source,destination])

    const addHandler=async (e,boxNum,name,description)=>{
        let todo;
        let temp;
        if(e.key=="Enter" && name!="" && description!=""){
            if(boxNum==1){
                todo={...todoList};
                temp=[...todoList.todo];
                temp=[...temp,{id:uuid(),name:name,desc:description}];
                todo.todo=temp;
                setTodoList(todo);
                toggleHandler("one");
            }else if(boxNum==2){
                todo={...todoList};
                temp=[...todoList.inProgress];
                temp=[...temp,{id:uuid(),name:name,desc:description}];
                todo.inProgress=temp;
                setTodoList(todo);
                toggleHandler("two");
            }
            else{
                todo={...todoList};
                temp=[...todoList.completed];
                temp=[...temp,{id:uuid(),name:name,desc:description}];
                todo.completed=temp;
                setTodoList(todo);
                toggleHandler("three");
            }

            const nameList = doc(db, "tasks", currentUser.uid);
            try{
                await setDoc(nameList,todo);
            }
            catch(err){
                console.log(err);
            }

        }
    }

    const toggleHandler=(num)=>{
        const temp={...toggleAdd};
        temp[num]=!temp[num];
        setToggleAdd(temp);
    }



  return (
    <div className='project-container'>
        <div className="project-header-bar">
            <div className="project-title">Projects</div>
            <div className="filter">Filter</div>
        </div>
        <div className="todo-container">
        <div className="todo-box"
                    >
                <div className="todo-header">
                    <div className="todo-title">To do</div>
                    <div className="todo-number">{todoList.todo.length}</div>
                </div>
                <button  className="todo-add-btn" onClick={()=>toggleHandler("one")}>+</button>
            <Droppable droppableId="todoBox">
                {(provided)=>(
                <div className="todolist" 
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {toggleAdd["one"]?<NewTask boxNum={1} addHandler={addHandler}/>:""}
                    {todoList.todo.length>0 && todoList.todo.map((item,index)=>{
                        return <TodoTile index={index} id={item.id} key={item.id} title={item.name} desc={item.desc}/>})}
                        {provided.placeholder}
                </div>
                )}
            </Droppable>
            </div>
            <div className="todo-box">
                        <div className="todo-header">
                            <div className="todo-title">In Progress</div>
                            <div className="todo-number">{todoList.inProgress.length}</div>
                        </div>
                        <button  className="todo-add-btn" onClick={()=>toggleHandler("two")}>+</button>
            <Droppable droppableId="inProgress">
                {
                    (provided)=>(
                        <div className="todolist"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            {toggleAdd["two"]?<NewTask boxNum={2} addHandler={addHandler}/>:""}
                            {todoList.inProgress.length>0 && todoList.inProgress.map((item,index)=>{
                                return <TodoTile index={index} id={item.id} key={item.id} title={item.name} desc={item.desc}/>})}
                             {provided.placeholder}

                        </div>
                    )
                }
            </Droppable>
            </div>
            
            <div className="todo-box">
                <div className="todo-header">
                    <div className="todo-title">Completed</div>
                    <div className="todo-number">{todoList.completed.length}</div>
                </div>
                <button  className="todo-add-btn" onClick={()=>toggleHandler("three")}>+</button>
           <Droppable droppableId="completed">
            {(provided)=>(
                <div className="todolist"
                ref={provided.innerRef}
                {...provided.droppableProps}>
                    {toggleAdd["three"]?<NewTask boxNum={3} addHandler={addHandler}/>:""}
                    {todoList.completed.length>0 && todoList.completed.map((item,index)=>{
                        return <TodoTile index={index} id={item.id} key={item.id} title={item.name} desc={item.desc}/>})}
                    {provided.placeholder}

                </div>
            )}
           </Droppable>
           </div>


        </div>
    </div>
  )
}

export default ProjectLayout