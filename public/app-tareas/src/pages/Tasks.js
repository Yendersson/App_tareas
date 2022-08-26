import './Tasks.css'

import TaskCreate from "../task/TaskCreate"
import { useState, useEffect } from "react";
import axios from "axios";
import { TaskCreated } from "../task/TaskCreated";

export const Task = ()=>{

    const client = axios.create({
        baseURL : 'http://localhost:8080/task/',
        headers :{'Authorization': localStorage.getItem('token')}
    })

    const [post, setPost] = useState(null);
    const [erro, setError] = useState(null)

    // EFFECT
        useEffect(()=>{
            async function getInfo(){

                try {
                    const response = await client.get(localStorage.getItem('_id'))
                    setPost(response.data);
                    setError(null)
                    
                } catch (error) {
                    setError('You must to be logged to access to task');
                }
            }
            getInfo();
        },[]);

    return(
        <>
        <h1>Your Tasks</h1>
        
        {erro && 
                <div className="alert alert-warning" role="alert">
                {erro}. Please go to index and sing on trought this <a href="/" className="alert-link">link</a>.
              </div>
            }

        {!erro && 
        
        
        <div className="container-tasks">

            <TaskCreate/>
            

            {post && post.map((posted, index) => {
                return(
                    <TaskCreated key={index} post={posted} />
                )
            })}


        </div>
        }

        </>

    )
}