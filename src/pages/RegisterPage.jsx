import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import toast from "react-hot-toast";
import { register } from "../util/apis";



export default function RegisterPage() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
       const [loading, setLoading]=useState(false)
      const [password,setPassword] = useState('');
 const [redirect, setRedirect] = useState(false);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      if (firstName&& lastName&& email && password){
         setLoading(true)
 const userData = {
  firstName:firstName,
  lastName:lastName,
        email:email,
        password:password
      }

   await register(userData);
       toast.success('Registration successful.Log in');
      setRedirect(true);
       setLoading(false)
      }else{
         toast.error("Please fill all required fields.");
      }
  
    } catch (error) {
    setLoading(false);
    if (error.response) {
      const { status, data } = error.response;
      if (status === 409 && data.errorCode === 'EMAIL_EXISTS') {
        toast.error('Email already exists. Please use a different email.');
        return;
      }
    }
    toast.error('Login failed');
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
          <button className="primary">{loading? "Loading...": "Register"}</button>
          <div className="text-center py-2 text-gray-500">
            Have an account? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}