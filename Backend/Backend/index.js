const express = require("express");
const app=express();
const productRoutes=require("../Backend/routes/productRoutes")
const userRoutes=require("../Backend/routes/userRoutes")
const cartRoutes=require("../Backend/routes/cartRoutes")
const orderRoutes=require("../Backend/routes/orderRoutes")
const mongoose=require('mongoose');
app.use(express.json())
const cors=require("cors")

app.use(cors())




mongoose.connect("mongodb://localhost:27017/Book")
.then(()=>{
    console.log("Connected to Mongodb");


});

app.use('/products',productRoutes);

app.use('/user',userRoutes)
app.use('/cart',cartRoutes)
app.use('/orders',orderRoutes)


app.listen(3000,()=>{
    console.log("Server is running on port:3000")
})