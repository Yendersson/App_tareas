import './MyProfile.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export const MyProfile = ()=>{
    const client = axios.create({
        baseURL : 'http://localhost:8080/profile/',
        headers :{'Authorization': localStorage.getItem('token')}
    })
    // STATE
    const [post, setPost] = useState(null);

// EFFECT
    useEffect(()=>{
        async function getInfo(){
            const response = await client.get(localStorage.getItem('_id'));
            setPost(response.data.data);
        }
        getInfo();
    }, []);

        console.log(post)
    // RENDER
    return(
        <>
        <h1>My Profile</h1>
        
        <div className='profile-container'>
            <h2>Datos</h2>
            <table classNa me='table-data'>
                {post && 
                <>
                
                <tr>
                    <th>Nombre:</th>
                    <th>{post.name}</th>
                    <th><button>Edit</button></th>
                </tr>
                <tr>
                    <th>Username:</th>
                    <th>{post.username}</th>
                    <th><button>Edit</button></th>
                </tr>
                <tr>
                    <th>Email</th>
                    <th>{post.email}</th>
                    <th><button>Edit</button></th>
                </tr>
                </>
}
            </table>
            <hr />

            <h2>Resume all task</h2>
            <table className='table-data'>
                <tr>
                    
                    <th><thead>title</thead> </th>
                    <th><thead>Status</thead></th>
                    <th><thead>Date</thead></th>
                    
                </tr>
                <tr>
                    <th>{post? post.name: null}</th>
                    <th>incomplete</th>
                    <th>21/02/2022</th>
                </tr>
            </table>
        </div>
        </>
    )
}