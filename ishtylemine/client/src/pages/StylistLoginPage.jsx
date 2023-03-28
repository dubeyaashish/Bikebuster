import { Link, Navigate } from "react-router-dom";
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StylistContext } from "../StylistContext";

export default function StylistLoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setStylist} = useContext(StylistContext);
    async function handleStylistLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/stylistlogin', {email,password});
            setStylist(data);
            alert('Login Succesful');
            setRedirect(true);
            
        }catch(e) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/stylistaccount'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-4xl text-center mb-4">Stylist Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleStylistLoginSubmit}>
                <input type="email" 
                    placeholder="your@email.com" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)} />
                <button className="loginbutton">Login</button>
                <div className="text-center py-2 text-gray-500">Not a stylist yet?
                    <Link className="underline text-black" to={'/stylistsignup'}>Sign up!</Link>
                </div>
            </form>
        </div>
        </div>

    );

    
}