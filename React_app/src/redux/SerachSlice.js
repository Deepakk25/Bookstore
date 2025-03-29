import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({

    name: "search",

    initialState: {
        query : "",

    },
    reducers: {
        see: (state,action)=>{
           
            state.query=action.payload
       
        }
        
    }
})

export const {see} = SearchSlice.actions;
export default SearchSlice.reducer;