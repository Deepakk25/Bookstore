import { createSlice } from "@reduxjs/toolkit";
const productsSlice=createSlice({
    name:"Product",
    initialState:{
        products:[]
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
},
        // search:(state,action)=>{
         
        //         state.products=state.products.filter((product)=>product.title.toLowercase().includes(action))
          
        // }
    }
})

export const {setProducts,search}=productsSlice.actions;
export default productsSlice.reducer;