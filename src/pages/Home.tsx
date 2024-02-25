import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from "react-router-dom";
import { selectUserState, setCurrentUser, setTransactionHistory } from "../redux/userSlice";
import MakeTransfer from '../components/MakeTransfer';
import TransactionHistory from '../components/TransactionHistory';
import { getUserTransactionHistory } from '../util/apis';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
      const { currentUser } = useSelector(selectUserState);
      const [activeProfile, setActiveProfile]= useState(0)
  const dispatch = useDispatch();
   const HandleTransactions =async()=>{
        try{
        if (currentUser){
 const response = await getUserTransactionHistory(currentUser._id)
 console.log("transactio", response.data)
 dispatch(setTransactionHistory(response.data))
        }
        }catch(error:any){
            toast("An error occured. Please try again.")
        }

        }

        const handleTransactions =()=>{
            setActiveProfile(1)
            HandleTransactions()
        }

        
  if (!currentUser) {
    return <Navigate to={'/login'} />
  }
  
  return (
    <div className='w-full rounded-md mt-4 grow flex flex-col text-sm text-white bg-yellow-600 p-4'>
<div className='flex items-center justify-center w-full'>
    <p className='text-2xl font-extrabold  mb-10'>THRILLERS MINI BANK APP</p>
</div>
        <div className=' flex flex-col w-2/4 justify-between md:flex-row  bg-white  rounded-xl px-2 py-2 mt-2 gap-2'  >

            <div className='bg-green-700 px-2 py-2 rounded-lg flex-1  cursor-pointer' onClick={()=>setActiveProfile(0)}>Make Transfer</div>
            <div className='bg-green-700 p-2 py-2 rounded-lg flex-1  cursor-pointer' onClick={handleTransactions}> Your Transaction History</div>



        </div>
                    <div>

{
    activeProfile===0 ?
        <p><MakeTransfer/></p>: <p><TransactionHistory/></p>
    
}


            </div>
    </div>
  )
}

export default Home