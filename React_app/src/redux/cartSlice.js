import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

    name: "cart",

    initialState: {
        items: []

    },
    reducers: {
        add: (state,action)=>{

            const existingItem=state.items.find(exist=>exist.id===action.payload.id);
            if(existingItem)
                existingItem.quantity +=1
            else{
                state.items.push({...action.payload, quantity:1}); //object file deconstruct
            }
           
        },
        increment: (state,action)=>{

            const existingItem=state.items.find(exist=>exist.id===action.payload.id);
            if(existingItem)
                existingItem.quantity +=1
            else{
                state.items.push({...action.payload, quantity:1}); //object file deconstruct
            }
           
        },

        decrement: (state,action)=>{

            const existingItem=state.items.find(exist=>exist.id===action.payload.id);
            if(existingItem.quantity>0)
                existingItem.quantity -=1
            // else{
            //     state.items.existingItem;
            // } 
        },
        remove: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }


       ,
        clear: (state) => {
            state.items = [];
        },

        // quantity:(state,action) =>{
        //     state.items.quantity=action.payload.quantity
        // }

      




    }
})

export const {add,increment,decrement,remove,clear} = cartSlice.actions;
export default cartSlice.reducer;