import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';

import { selectUserState, setCurrentUser,setBalance } from "../redux/userSlice";
import { login } from "../util/apis";



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { currentUser } = useSelector(selectUserState);

  const dispatch = useDispatch();

  
  async function handleLoginSubmit(ev:any) {

    ev.preventDefault();
    try {
      const userData = {
        email:email,
        password:password
      }
      const response = await login(userData);
      console.log(response)
       dispatch(setCurrentUser(response.data.userResponse));
     
       dispatch(setBalance(currentUser?.balance))
         setRedirect(true);
       toast.success('Login successful');
     
    } catch (e) {
       toast.error("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/home'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="text"
                 placeholder="your username"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}