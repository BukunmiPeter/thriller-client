import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { selectUserState } from '../redux/userSlice';
const Welcome: React.FC = () => {
      const { currentUser } = useSelector(selectUserState);
  return (
    <div className='w-full rounded-md mt-4 grow flex flex-col text-md md:text-lg justify-around text-white bg-yellow-600 p-4'>

        <p  className='mb-2'>Welcome to Thrillers Mini Bank App! </p>
        <p>To maximize your experience, start by registering and unlocking the full potential of our app. Upon registration, we gift you a generous $1000. Explore the platform, view the list of registered users, and initiate fund transfers seamlessly. Whether you transfer to existing users or register new ones, each transaction affects your balance and that of the recipient.</p>
        <p>Keep in mind that every credit transaction incurs a configurable 10% fee. Enjoy the app's functionalities and don't forget to log out for added security once you've completed your transactions.</p>
        <p>Happy banking with Thrillers Mini Bank App!</p>

        <p>Feel free to test the app using the login details for "Bon Great":</p>
        <div className='flex flex-col gap-4'> <p>Email: bon@gmail.com</p>
        <p>Password: 123456</p>
     <div>
  {currentUser? <Link className='text-rose-950' to={'/home'}>Go Home</Link>:<Link className='text-rose-950' to={'/login'}>Login</Link> }
     </div>
      
        
        </div>
        
        
        
</div>
  )
}

export default Welcome