import './index.css'
import { useEffect, useState } from "react"
import axios from 'axios'

// const url = 'http://localhost:8080/auth/login';


export const Index = () => {
    const modalAuth = [null, 'login', 'register'];

    const [showLogin, setShowLogin] = useState(modalAuth[0]);
    const [data, setData] = useState({});
    const [logged, setLogged] = useState(null)


    useEffect(()=>{
        localStorage.getItem('_id')? setLogged(localStorage.getItem('_id')): setLogged(null);        
    },[])

    console.log(logged);


    function login(index) {
        setShowLogin(modalAuth[index]);
    }

    function handleSubmit(e){
        const name = e.target.name;
        const value = e.target.value;

        setData(values => ({...values, [name]: value}))
    }

    async function authentication(e) {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/login', data)
            .then(response => {
                if(response.data.error === null){
                    localStorage.setItem('_id', response.data.id);
                    localStorage.setItem('token', response.data.token);
                }
            })
    }

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
            <h1>MY APP</h1>

            {/* LOGIN */}
            <article className={(showLogin === 'login') ? 'login login-show' : 'login'}>
                
                <div className="login-container login-show" >
                    <h2>Login</h2>

                    <form onSubmit={(e)=>authentication(e)}>

                    <label htmlFor="email" value='hola'>Email</label>
                    <input type="email" name="email" onChange={e=>handleSubmit(e)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={e=>handleSubmit(e)}/>

                    <button>Login</button>

                    </form>
                    <button onClick={() => login(2)}>Register</button>

                    <span onClick={() => login(0)}>Close</span>
                </div>
            </article>

            {/* REGISTER */}
            <article className={(showLogin === 'register') ? 'register login-show' : 'register'}>
                <div className="login-container login-show" >
                    <h2>Register</h2>
                    <form onSubmit={(e)=>register(e)}>


                    <label htmlFor="name">Name</label>
                    <input onChange={e=>handleSubmit(e)} type="text" name="name" />

                    <label htmlFor="email">Email</label>
                    <input onChange={e=>handleSubmit(e)} type="email" name="email" />

                    <label htmlFor="username">Username</label>
                    <input onChange={e=>handleSubmit(e)} type="text" name="username" />

                    <label htmlFor="password">Password</label>
                    <input onChange={e=>handleSubmit(e)} type="password" name="password" />

                    <button> Register</button>
                    </form>

                    <span onClick={() => login(0)}>Close</span>
                </div>
            </article>



            <button onClick={() => login(1)}> Try it </button>

        </>
    )
}