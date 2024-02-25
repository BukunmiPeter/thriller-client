export interface User {
  _id?: string  | undefined;
  firstName?: string;
  lastName?: string;
  email?: string;
  balance?:number,
  password?:string;
}

export interface ITransferData {
 senderId:string | undefined,
    recipientId:string,
    amount:number,
    fee:number
}

export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  type: 'debit' | 'credit';
  date: string;
  __v: number;
}

export interface UserSliceState {
  currentUser: User | null;
  userList: User[];
  transactionHistory: Transaction[];
  balance:number | undefined
}