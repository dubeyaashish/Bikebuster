import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function StylistSignupPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerStylist(ev){
    ev.preventDefault();
    try {
      await axios.post('/stylistsignup', {
        name,
        surname,
        email,
        password,
      });
      alert('Signup complete. Now you can log in');
    }catch(e) {
      alert('Signup failed. Please try again');
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Stylist Signup</h1>
        <form className="max-w-md mx-auto" onSubmit={registerStylist}>
          <input type="text" placeholder="Name" 
            value={name} 
            onChange={ev => setName(ev.target.value)} />
          <input type="text" placeholder="Surname" 
            value={surname} 
            onChange={ev => setSurname(ev.target.value)} />
          <input type="email" placeholder="your@email.com" 
            value={email} 
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder="password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)} />
          <button className="loginbutton">Signup</button>
          <div className="text-center py-2 texxt-gray-500">Already have an account?
            <Link className="underline text-black" to={'/stylistlogin'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}