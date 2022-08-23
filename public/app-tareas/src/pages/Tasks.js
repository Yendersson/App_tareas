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

    // EFFECT
        useEffect(()=>{
            async function getInfo(){
                const response = await client.get(localStorage.getItem('_id'))
                console.log(response.data)
                setPost(response.data);
            }
            getInfo();
        },[]);

    return(
        <>
        <h1>Tasks</h1>
        
            <TaskCreate/>

            {post && post.map((posted, index) => {
                return(
                    <TaskCreated key={index} post={posted} />
                )
            })}
        </>

    )
}