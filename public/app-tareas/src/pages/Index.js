import './index.css'
import { useState } from "react"

export const Index = ()=>{
    const [showLogin, setShowLogin] = useState(false);
    
    function login(){
        setShowLogin(!showLogin);
    }
    return(
        <>
        <h1>MY APP</h1>
        
        <article className={showLogin? 'login login-show': 'login'}>
            <div className="login-container login-show" >
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                    <input type="email" name="email"/>
                
                <label htmlFor="password">Password</label>
                    <input type="password" name="password"  />

            <span onClick={login}>Close</span>
            </div>
        </article>

        <button onClick={login}> Try it </button>
        
        </>
    )
}