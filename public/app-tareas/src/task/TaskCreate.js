import './taskCreate.css';

import {GoPlus} from 'react-icons/go'
import { useState } from 'react';
import axios from 'axios';

function TaskCreate(){

    const client = axios.create({
        baseURL : 'http://localhost:8080/task/',
        headers :{'Authorization': localStorage.getItem('token')}
    })

    const [add, setAdd] = useState(false);
    const [newTask, setNewTask] = useState({});

    function addTask(){
        setAdd(!add);
    }

    function handleSubmit(e){
        const name = e.target.name;
        const value = e.target.value;

        setNewTask(values => ({...values, [name]: value}))
    }

    async function createTask(e){
        e.preventDefault();
        const response = await client.post(localStorage.getItem('_id'), newTask);
        console.log(response.data);
    } 


    return(
        <>
        <div className={add? 'bar_task bar_task-creating': 'bar_task'}>
            <div className='bar_task-flex'>
                <p>Create Task</p> 
                
                <button className='boton_task' onClick={addTask}>
                    <GoPlus/>
                </button>
            </div>
        </div>

        <div className={add? 'creating_task creating_task-show': 'creating_task'}>
            <form onSubmit={(e)=>createTask(e)}>
                <label htmlFor="title">Title:</label>
                <input type="text" name='title' required onChange={e=>handleSubmit(e)} />
                <label htmlFor="description">Description</label>
                {/* <input type="text" name='description' /> */}
                <textarea name="description" onChange={e=>handleSubmit(e)}></textarea>
                {/* <label htmlFor="important">Important</label>
                <input type="checkbox" name="important" className='importan_checkbox' onChange={e=>handleSubmit(e)} /> */}
                <label htmlFor="period">Period</label>
                <input type="date" name="period" className='period_input' onChange={e=>handleSubmit(e)} />

                <button>Create</button>
            </form>
            <button onClick={addTask}>cancel</button>
        </div>
        
        </>
    )
}

export default TaskCreate;