import './MyProfile.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://jsonplaceholder.typicode.com/posts/1'

export const MyProfile = ()=>{
    // STATE
    const [post, setPost] = useState(null);

// EFFECT
    useEffect(()=>{
        async function getInfo(){
            const response = await axios(url);
            setPost(response.data);
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
                <tr>
                    <th>Nombre:</th>
                    <th>Yender</th>
                    <th><button>Edit</button></th>
                </tr>
                <tr>
                    <th>Username:</th>
                    <th>yender123</th>
                    <th><button>Edit</button></th>
                </tr>
                <tr>
                    <th>Email</th>
                    <th>@mail.com</th>
                    <th><button>Edit</button></th>
                </tr>
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
                    <th>{post? post.title: null}</th>
                    <th>incomplete</th>
                    <th>21/02/2022</th>
                </tr>
            </table>
        </div>
        </>
    )
}