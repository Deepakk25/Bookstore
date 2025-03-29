import {createSlice} from "@reduxjs/toolkit"


const CounterSlice = createSlice({
    name : "Counter",//unique
    initialState : {
        count:20
    },
    reducers : {
        increment: (state,action) => {
            state.count +=action.payload;
        },
        decrement:() => {},

        }

    
})
export const {increment,decrement} =CounterSlice.actions;
export default CounterSlice.reducer;