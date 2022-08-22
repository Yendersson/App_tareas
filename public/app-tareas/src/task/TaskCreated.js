import './taskCreate.css';

import {AiOutlineClose} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs'
import {IoIosArrowDropup} from 'react-icons/io'
import { useState } from 'react';

export const TaskCreated = (prop)=>{
    
    const [task, setTaskShow] = useState(false);

    function showTask(){
        setTaskShow(!task);
    }



    console.log(task)

    return(

    <div className='bar_task' onClick={showTask}>
        <div className='bar_task-grid'>
            <div className='text-title'>
            <p>{prop.post}</p>
            </div>
            <div className='task-botons'>
             <button><AiOutlineClose /></button>
             <button><AiOutlineEdit /></button>
             <button><BsCheckLg /></button>
            </div>
        </div>
        <div className='status_date-flex'>
            <p>status: Pending...</p>
            <p>Date: 20/03/2022</p>
        </div>

        <div className={task? 'task_container show-task': 'task_container'}>
            <form action>
                <input type="text" /> <button><AiOutlineEdit /></button>
                <textarea name="" id=""></textarea>
                <button><AiOutlineEdit /></button>
                <input type="date" /> 
                <button><AiOutlineEdit /></button>

            </form>

            <button className='back-task' onClick={showTask}><IoIosArrowDropup /></button>
        </div>
    </div>

    )
}