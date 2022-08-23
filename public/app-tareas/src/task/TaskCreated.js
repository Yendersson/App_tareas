import './taskCreate.css';

import {AiOutlineClose} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs'
import {IoIosArrowDropup} from 'react-icons/io'
import { useState } from 'react';
import axios from 'axios';

export const TaskCreated = (prop)=>{

    const client = axios.create({
        baseURL : 'http://localhost:8080/task/',
        headers :{'Authorization': localStorage.getItem('token')}
    })

    
    const [task, setTaskShow] = useState(false);
    const [putData, setPutData] = useState({});

    function showTask(){
        setTaskShow(!task);
    }

    function handleSubmit(e){
        const name = e.target.name;
        const value = e.target.value;

        setPutData(values => ({...values, [name]: value}))

    }

    async function updateTask(e){
        e.preventDefault(e);

        console.log(prop.post._id)
        console.log(putData)
        const response = await client.put(prop.post._id, putData);
        console.log(response.data);
    } 

    async function deleteTask(){

        // console.log(prop.post._id)
        // console.log(putData)
        const response = await client.delete(prop.post._id);
        console.log(response.data);
    } 

    function disableOffInputa(e){
        e.preventDefault()
        const inputs = document.querySelectorAll('input');
        console.log(inputs)

        inputs.forEach(input => input.disabled = false);
    }

    return(

    <div className='bar_task'>
        <div className='bar_task-grid'>
            <div className='text-title'>
            <p>{prop.post.title}</p>
            </div>
            <div className='task-botons'>
             <button onClick={deleteTask}><AiOutlineClose /></button>
             <button><AiOutlineEdit /></button>
             <button><BsCheckLg /></button>
            </div>
        </div>
        <div className='status_date-flex'>
            <p>status: Pending...</p>
            <p onClick={showTask}>view...</p>
            <p>Date: 20/03/2022</p>
        </div>

        <div className={task? 'task_container show-task': 'task_container'}>
            <form  onSubmit={e=>updateTask(e)}>
                <input type="text" name="title" placeholder={prop.post.title} onChange={(e)=> handleSubmit(e)} /> 
                <textarea name="description" placeholder={prop.post.description} onChange={(e)=> handleSubmit(e)}></textarea>
                <input type="date" name="period" onChange={(e)=> handleSubmit(e)} /> 
                <button >Update</button>
            </form>
                <button onClick={(e)=>disableOffInputa(e)}><AiOutlineEdit /></button>

            <button className='back-task' onClick={showTask}><IoIosArrowDropup /></button>
        </div>
    </div>

    )
}