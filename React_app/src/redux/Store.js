import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./CounterSlice";
import cartSlice from "./cartSlice";
import SerachSlice from "./SerachSlice";
import productsSlice from "./productSlice";

import wishlistSlice from "./wishlistSlice";

const store =configureStore({
    reducer:{

        product:productsSlice,
        cart :cartSlice,
        search : SerachSlice,
        wishlist:wishlistSlice
     
    }

})
export default store;