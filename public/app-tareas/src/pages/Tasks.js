import TaskCreate from "../task/TaskCreate"
import { useState, useEffect } from "react";
import axios from "axios";
import { TaskCreated } from "../task/TaskCreated";

const url = 'https://62d7fab69c8b5185c78048d2.mockapi.io/productos';

export const Task = ()=>{

    const [post, setPost] = useState(null);

    // EFFECT
        useEffect(()=>{
            async function getInfo(){
                const response = await axios(url);
                setPost(response.data);
            }
            getInfo();
        }, []);

    return(
        <>
        <h1>Tasks</h1>
        
            <TaskCreate/>

            {post && post.map((posted, index) => {
                return(
                    <TaskCreated key={index} post={posted.nombre} />
                )
            })}
            {/* <TaskCreated /> */}
            {/* <TaskCreated /> */}

            {/* {post && post.map((posted,index)=>{
                return(
                    <TaskCreate key={index} posted={posted.nombre} />
                )
            })} */}
        </>

    )
}