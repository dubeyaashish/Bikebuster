import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            await axios.post('/login', {email,password});
            alert('Login Successful');
        } catch (e) {
            alert('login failed');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" 
                    value={email} 
                    onChange= {ev => setEmail(ev.target.value)}  />
                <input type="password" placeholder="password" 
                    value={password} 
                    onChange={ ev => setPassword(ev.target.value)} />
                <button className="loginbutton">Login</button>
                <div className="text-center py-2 texxt-gray-500">Don't have an account yet?
                    <Link className="underline text-black" to={'/signup'}>Sign up!</Link>
                </div>
            </form>
        </div>
        </div>

    );

    
}