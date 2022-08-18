import './taskCreate.css';

import {GoPlus} from 'react-icons/go'
import { useState } from 'react';

function TaskCreate(props){

    const [add, setAdd] = useState(false);

    let {posted} = props
    console.log(posted)

    function addTask(){
        setAdd(!add);
    }

    return(
        <>
        <div className={add? 'bar_task bar_task-creating': 'bar_task'}>
            <div className='bar_task-flex'>
                <p>Create Task and {posted}</p> 
                
                <button className='boton_task' onClick={addTask}>
                    <GoPlus/>
                </button>
            </div>
        </div>

        <div className={add? 'creating_task creating_task-show': 'creating_task'}>
            <form >
                <label htmlFor="title">Title:</label>
                <input type="text" name='title' required />
                <label htmlFor="description">Description</label>
                {/* <input type="text" name='description' /> */}
                <textarea name="description" ></textarea>
                <label htmlFor="important">Important</label>
                <input type="checkbox" name="important" className='importan_checkbox'/>
                <label htmlFor="period">Period</label>
                <input type="date" name="period" className='period_input' />

                <button>Create</button>
            </form>
            <button onClick={addTask}>cancel</button>
        </div>
        
        </>
    )
}

export default TaskCreate;