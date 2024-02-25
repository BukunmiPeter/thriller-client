import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function RegisterPage() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
      const [password,setPassword] = useState('');
 const [redirect, setRedirect] = useState(false);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      if (firstName&& lastName&& email && password){
    await axios.post('http://localhost:3001/users', {
        firstName,
        lastName,
        email,
        password
      });
       toast.success('Registration successful. Now you can log in');
      setRedirect(true);
      }else{
         toast.error("Please fill all required fields.");
      }
  
    } catch (e) {
        toast.error("Registration failed. Please try again later");
      
    }
  }

    if (redirect) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
         
          <input type="text"
                 placeholder="First Name"
                 value={firstName}
                 onChange={ev => setFirstName(ev.target.value)} />
             
          <input type="text"
                 placeholder="Last Name"
                 value={lastName}
                 onChange={ev => setLastName(ev.target.value)} />
             
                  <input type="email"
                 placeholder="email"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
               
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Have an account? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}