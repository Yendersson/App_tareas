import './index.css'
import { useEffect, useState } from "react"
import axios from 'axios'

export const Index = () => {
    const modalAuth = [null, 'login', 'register'];

    const [showLogin, setShowLogin] = useState(modalAuth[0]);
    const [data, setData] = useState({});
    const [logged, setLogged] = useState(null);
    const [error, setError] = useState(null)


    useEffect(() => {
        localStorage.getItem('_id') ? setLogged(localStorage.getItem('_id')) : setLogged(null);
    }, [])

    console.log(logged);


    function login(index) {
        setShowLogin(modalAuth[index]);
    }

    function handleSubmit(e) {
        const name = e.target.name;
        const value = e.target.value;

        setData(values => ({ ...values, [name]: value }))
    }

    async function authentication(e) {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/login', data)
            .then(response => {
                if (response.data.error === null) {
                    localStorage.setItem('_id', response.data.id);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', response.data.name);
                    setError(null)
                    window.location.href = '/'
                }
            }).catch(
                
                    setError('password or email invalid')
            )
    }


    console.log(error)

    async function register(e) {
        e.preventDefault()

        console.log(data);
        axios.post('http://localhost:8080/auth/register', data)
            .then(response => {
                console.log(response.data)
            })
    }

    return (
        <>
            <h1>{localStorage.getItem('user') ? 'Welcome' : 'App Task'}</h1>
            <div className='index-container d-flex flex-column justify-content-center align-items-center' >

                <div className='d-flex flex-column align-items-center'>
                    {localStorage.getItem('_id') &&
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>

                            <p className='text-white mt-5 text-center'>Let's start to create and take control about your task.</p>

                        </>
                    }

                    {!localStorage.getItem('_id') &&
                        <>

                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="#fff" className="bi bi-journal-text" viewBox="0 0 16 16">
                                <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                            </svg>
                            <p className='text-white mt-5 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quibusdam!</p>
                            <div className='mt-5'>

                                <button className='btn btn-success' onClick={() => login(1)}> Try it </button>
                            </div>
                        </>
                    }
                </div>
            </div>
            {/* LOGIN */}
            <article className={(showLogin === 'login') ? 'login login-show' : 'login'}>

                <div className="login-container login-show" >
                    <h2>Login</h2>

                    <form onSubmit={(e) => authentication(e)}>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={e => handleSubmit(e)} />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={e => handleSubmit(e)} />
                        {error && <span className='text-danger'>{error}</span>}
                        
                        <button className='btn-success mt-3'>Login</button>

                    </form>
                    <button className='btn-info mt-2' onClick={() => login(2)}>Register</button>

                    <span onClick={() => login(0)}>Close</span>
                </div>
            </article>

            {/* REGISTER */}
            <article className={(showLogin === 'register') ? 'register login-show' : 'register'}>
                <div className="login-container login-show" >
                    <h2>Register</h2>
                    <form onSubmit={(e) => register(e)}>


                        <label htmlFor="name">Name</label>
                        <input onChange={e => handleSubmit(e)} type="text" name="name" />

                        <label htmlFor="email">Email</label>
                        <input onChange={e => handleSubmit(e)} type="email" name="email" />

                        <label htmlFor="username">Username</label>
                        <input onChange={e => handleSubmit(e)} type="text" name="username" />

                        <label htmlFor="password">Password</label>
                        <input onChange={e => handleSubmit(e)} type="password" name="password" />

                        <button className='btn-success mt-3'> Register</button>
                    </form>

                    <span onClick={() => login(0)}>Close</span>
                </div>
            </article>
        </>
    )
}