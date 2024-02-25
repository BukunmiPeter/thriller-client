import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';

import { selectUserState,setUserList, setBalance } from "../redux/userSlice";
import { getAllUsers, getUserBalance, makeTransfer } from '../util/apis';

const MakeTransfer:React.FC = () => {
      const [recipient, setRecipient] = useState("")
      const [recipients, setRecipients] = useState([])
      const [amount, setAmount]= useState("")
      const [loading, setLoading]=useState(false)
      
  const dispatch = useDispatch();
  const { currentUser,userList, balance } = useSelector(selectUserState);

  const handleGetUsers =async()=>{
    const response = await getAllUsers()
    dispatch(setUserList(response.data))
   
  }

   const handleBalance =async()=>{
    if (currentUser){
   const response = await getUserBalance(currentUser._id)
    dispatch(setBalance(response.data.balance))
    }

  }

        useEffect(()=>{
          try{
handleBalance()
        handleGetUsers()
          } catch(error){
            alert("Network error. Please check your internet connection.")
          }
        
    }, [dispatch])

      const HandleMakePayment =async()=>{
        try{
        if (currentUser && amount && recipient){
               setLoading(true)
            const transferData = {
                senderId:currentUser._id,
                recipientId:recipient,
                amount:parseInt(amount),
                fee: parseInt(amount) * 0.1,
            }
            console.log(transferData, "transfer")
            await makeTransfer(transferData)
            await handleBalance()
             toast.success('transfer successful');
               setLoading(false)
               setRecipient("")
               setAmount("")
        }
        else{
 toast.error('Please fill all required fields.');
        }
           

        }catch (error){
            setLoading(false)
            toast.error("An error occured. Please Try again!")
        }
       
      }
  return (
    <div className=' h-[400px] flex flex-col justify-between w-full px-4 py-3 gap-2 mt-3'>
<div className='w-3/4'>
    <div className='text-lg my-2'>Your Current Balance: ${balance?.toFixed(2)} </div>

<div className='w- 1/4 flex flex-col gap-2 mb-3'>
<label>Select Recipient</label>
<select className='text-black py-2 px-2'
    name=""
    id=""
                    value={recipient}
                   onChange={(e) => setRecipient(e.target.value)}
                  >
<option  value=""></option>
                        {userList?.map((option:any) => (
            <option key={option._id} value={option._id}>
              {`${option.firstName}  ${option.lastName}` }
            </option>
          ))}   
                  </select>

</div>
<div className='w-1/4 '>
<label>Type Amount</label>
<input className='text-black py-2 px-2'     value={amount}
                   onChange={(e) => setAmount(e.target.value)}  type="number"/></div>

<div className='flex justify-end'><button className='bg-green-700 text-white p-2 rounded-md mt-4 ' onClick={HandleMakePayment}> {loading? "Loading": "Transfer"}</button></div>

</div>



<div>

    <div className='flex flex-col justify-between gap-4'>

        <div className='flex gap-2'>
              <p>Amount:</p>
            {
                amount && <p>${amount}</p>
            }
        </div>


        <div className='flex gap-2'>
              <p>Configurable Fee:</p>
            {
                amount &&        <p> ${(parseInt(amount) * 0.1).toFixed(2)}</p>

            }
        </div>



        <div className='flex gap-2'>
              <p>Total:</p>
            {
                amount &&        <p> ${(parseInt(amount) * 1.1).toFixed(2)}</p>

            }
        </div>
      
    </div>
</div>
</div>




  )
}

export default MakeTransfer