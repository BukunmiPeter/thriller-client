import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState, setCurrentUser ,setBalance} from "../redux/userSlice";
import { Navigate, useNavigate } from 'react-router-dom';

interface INavProfile {
    close?: (confirm:boolean) => void;

}

const NavProfileMenu: React.FC<INavProfile> = ({close}) => {
    const { currentUser } = useSelector(selectUserState);
     const navigate = useNavigate();
const dispatch = useDispatch();
const HandleLogout = ()=>{
     dispatch(setCurrentUser(null))
     dispatch(setBalance(0))
  navigate('/login');
     close && close(false)
}


  
  return (
    <div className='absolute top-12 right-0 bg-gray-600 rounded-md text-white px-6 py-3'>
       
        <div className ="mx-3" onClick={HandleLogout} >Logout</div>
    </div>
  );
}

export default NavProfileMenu;