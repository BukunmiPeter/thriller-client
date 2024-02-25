import React, { useEffect } from 'react'
import { getAllUsers, getUserTransactionHistory } from '../util/apis'
import { useDispatch, useSelector } from 'react-redux';

import { selectUserState, setCurrentUser,setTransactionHistory  } from "../redux/userSlice";

  
const TransactionHistory:React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser,transactionHistory } = useSelector(selectUserState);


useEffect(()=>{
    const HandleFetchUsers =async()=>{
        try{
        if (currentUser){
 const response = await getUserTransactionHistory(currentUser._id)

 console.log("transactio", response.data)
 dispatch(setTransactionHistory(response.data))
        }
        }catch(error:any){
            alert(error.message)
        }

        }
        HandleFetchUsers()
    
    }, [])

  const columnHeads: Array<string> = [
  "ID",
  "AMOUNT($)",
  "TYPE",
  "DATE",
];
    
  return (
    <div>
        <div className='mt-3 h-[500px] overflow-y-scroll'>
  <table className="w-full border-collapse items-center bg-transparent ">
        <thead className="bg-[#F0F0F0] text-black">
          <tr>
            {columnHeads.map((item, i) => (
              <th
                key={i}
                className={
                  "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-bold uppercase"
                }
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
     <tbody className="bg-slate-300 text-black ">
          {transactionHistory.length? transactionHistory?.map((item):any => (
        <tr>
              <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-sm">
                
                {item._id}
              </td>

              <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-sm">
                {item.amount}
              </td>
              <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-sm">
              {item.type}
              </td>
              <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-sm">
               {new Date(item.date).toLocaleString()}
              </td>
            </tr>
          )): <tr> 
          <td colSpan={5}>No transactions available</td>
        </tr>}
        </tbody>
      </table>
  
        </div>
    </div>
  )
}
export default TransactionHistory







  






