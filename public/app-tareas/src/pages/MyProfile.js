import './MyProfile.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export const MyProfile = () => {
    const client = axios.create({
        baseURL: 'http://localhost:8080/profile/',
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    // STATE
    const [post, setPost] = useState(null);
    const [edit, setEdit] = useState(false);
    const [dataProfile, setProfileData] = useState({});

    // EFFECT
    useEffect(() => {
        async function getInfo() {
            const response = await client.get(localStorage.getItem('_id'));
            setPost([response.data.data, response.data.task]);
        }
        getInfo();
    }, []);

    function edited(e) {
        e.target.disabled = true;
        setEdit(!edit)
    }

    function handleSubmit(e) {
        const name = e.target.name;
        const value = e.target.value;

        setProfileData(values => ({ ...values, [name]: value }))
    }

    async function editProfile() {
        const response = await client.put(localStorage.getItem('_id'), dataProfile)
        console.log(response.data);
        setEdit(!edit);
    }

    async function deleteProfile() {
        const response = await client.delete(localStorage.getItem('_id'))
        console.log(response.data);
    }

    return (
        <>
            <h1>My Profile</h1>

            <div className='profile-container'>
                <h2>Datos</h2>
                <table className='table-data'>
                    {post &&
                        <>
                            <tbody>
                            <tr>
                                <th>Nombre:</th>
                                <th>

                                    {edit ? <input type="text" name='name' placeholder={post[0].name} onChange={handleSubmit} /> : <p>{post[0].name}</p>}
                                </th>
                                {/* <th></th> */}
                            </tr>
                            <tr>
                                <th>Username:</th>
                                <th>{edit ? <input type="text" name='username' placeholder={post[0].username} onChange={handleSubmit} /> : <p>{post[0].username}</p>}</th>
                                {/* <th><button>Edit</button></th> */}
                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>{edit ? <input type="email" name='email' placeholder={post[0].email} onChange={handleSubmit} /> : <p>{post[0].email}</p>}</th>
                                {/* <th><button>Edit</button></th> */}
                            </tr>
                            </tbody>
                        </>
                    }
                </table>
                            <div className='d-flex justify-content-around w-100'>

                    <button className='btn btn-warning' onClick={(e) => edited(e)} >Edit</button>
                    <button className={edit ? 'btn-change-profile btn btn-primary show-edit-profile' : 'btn-change-profile'} onClick={editProfile}>Update</button>

                    <button className='btn btn-danger' onClick={deleteProfile}>Delete Profile</button>

                    </div>
                <hr />

                <h2>Resume all task</h2>
                <div className='table-responsive'>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">State</th>
                            <th scope="col">Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        {post && post[1].map((task, index) => {
                            return (

                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{task.title}</td>
                                    <td style={{ color: task.state === 'complete' ? 'green' : task.state === 'incomplete' ? 'red' : 'black' }}>{task.state}</td>
                                    <td>{task.period}</td>
                                </tr>

                            )
                        })
                        }
                    </tbody>
                </table>
                </div>

            </div>
        </>
    )
}