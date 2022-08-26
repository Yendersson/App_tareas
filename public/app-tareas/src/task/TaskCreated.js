import './taskCreate.css';

import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs'
import { IoIosArrowDropup } from 'react-icons/io'
import { useState } from 'react';
import axios from 'axios';

export const TaskCreated = (prop) => {

    const client = axios.create({
        baseURL: 'http://localhost:8080/task/',
        headers: { 'Authorization': localStorage.getItem('token') }
    })


    const [task, setTaskShow] = useState(false);
    const [putData, setPutData] = useState({});

    function showTask() {
        setTaskShow(!task);
    }

    function handleSubmit(e) {
        const name = e.target.name;
        const value = e.target.value;

        setPutData(values => ({ ...values, [name]: value }))

    }

    async function updateTask(e) {
        e.preventDefault(e);

        const response = await client.put(prop.post._id, putData);
        console.log(response.data);
    }

    async function checked() {

        const response = await client.put(prop.post._id, { state: 'complete' });
        console.log(response.data);
    }

    async function deleteTask() {

        const response = await client.delete(prop.post._id);
        console.log(response.data);
    }

    function disableOffInputa(e) {
        e.preventDefault()
        const inputs = document.querySelectorAll('input');
        const textareas = document.querySelector('#description');
        console.log(inputs)
        console.log(textareas)
         

        inputs.forEach(input => input.readOnly = false);
        textareas.readOnly= false
    }

    // const dateNow = new Date();
    // console.log(dateNow.toLocaleString());

    return (

        <div className='bar_task mb-3 shadow ' style={{backgroundColor: prop.post.state === 'complete'? '#82E0AA ':  prop.post.state === 'incomplete'? 'red': 'white' }}>
            <div className='bar_task-grid'>
                <div className='text-title'>
                    <h4>{prop.post.title}</h4>
                </div>
                <div className='task-botons'>
                    <button onClick={deleteTask} className="btn-danger mr-2"><AiOutlineClose className='text-light' /></button>
                    {/* <button className='bg-warning'><AiOutlineEdit className='text-light' /></button> */}
                    <button onClick={checked} className="bg-success"><BsCheckLg className='text-light'/></button>
                </div>
            </div>
            <div className='status_date-flex'>
                <p>{prop.post.state}</p>
                <p>{prop.post.period.split('T')[0]}</p>
            </div>
                <span onClick={showTask} className='text-primary' style={{display: task? 'none': 'block'}} >view...</span>

            <div className={task ? 'task_container show-task' : 'task_container'}>

                <form onSubmit={e => updateTask(e)}>

                    <input 
                    className='mb-2'
                    type="text" 
                    name="title" 
                    placeholder={prop.post.title} 
                    onChange={(e) => handleSubmit(e)} 
                    readOnly
                    />
                    <textarea 
                    readOnly
                    className='bg-light'
                    id='description'
                    name="description"
                     placeholder={prop.post.description} 
                     onChange={(e) => handleSubmit(e)} >

                     </textarea>
                    <input 
                    type="date" 
                    name="period"
                    placeholder={prop.post.period.split('T')[0]} 
                    onChange={(e) => handleSubmit(e)} 
                    />

                    <button className='btn-task btn-info mt-2'>Update</button>

                </form>
                
                <button className='btn-warning m-2 btn-task' id='btn-edit' onClick={(e) => disableOffInputa(e)}><AiOutlineEdit />Edit</button>

                <button className='back-task' onClick={showTask}><IoIosArrowDropup /></button>
            </div>
        </div>

    )
}