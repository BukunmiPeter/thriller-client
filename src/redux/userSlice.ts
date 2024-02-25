import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSliceState,User,Transaction } from '../util/types';
import { RootState } from './store';

    const initialState: UserSliceState = {
    currentUser: null,
    userList: [],
    transactionHistory: [],
    balance:0
    };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
 setUserList: (state, action: PayloadAction<User[]>) => {
      if (state.currentUser) {
        state.userList = action.payload.filter(user => user._id !== state.currentUser!._id);
      } else {
        state.userList = action.payload;
      }
    },
    setTransactionHistory: (state, action: PayloadAction<Transaction[]>) => {
      state.transactionHistory = action.payload.reverse();
    },
    setBalance: (state, action: PayloadAction<number | undefined >) => {
        console.log(state.balance, action.payload, "verify")
      state.balance = action.payload;
    },
  },
});

export const { setCurrentUser, setUserList, setTransactionHistory ,setBalance} = userSlice.actions;
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;