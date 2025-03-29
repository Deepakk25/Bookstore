import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../Components/Cart.css"
import { increment ,decrement,remove,clear} from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


const Cart=() =>{
  

    const card = useSelector((state)=> state.cart.items);
    const searchItem=useSelector((state)=>state.search.query)
    const dispatch=useDispatch();

    console.log(card);

    console.log(searchItem);

    const filteredProducts=card.filter(prod=>prod.title.toLowerCase().includes(searchItem.toLowerCase()) || 
    prod.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    prod.price.toString().includes(searchItem.toLowerCase()) ||
    prod.category.toLowerCase().includes(searchItem.toLowerCase()) );

    const totalQuantity = filteredProducts.reduce((total, item) => total + item.quantity, 0);

    const totalAmount = filteredProducts.reduce((total, item) => total + item.price * item.quantity, 0);

    
    const Incrementer=(item)=>{
      dispatch(increment(item))
  }
  

  const decrementer=(item)=>{
    dispatch(decrement(item))



}

const removed=(item)=>{
  dispatch(remove(item))



}


const cleared=()=>{
  dispatch(clear())
}
// const total=()=>{
//   dispatch(quantity())
// }


// const [count, setCount] = useState(0);

// function handleClick() {
//     setCount(count + 1);
//   }



   
    return(
      
            <>
              <h2 className='cart'>Cart Items</h2>
              <button  className='clear' onClick={cleared}>Clear</button>
        
              <div className="cart-page">
        
        
        
                <div className="cart-summary">
                  <p className='tot-qnt'>Total Quantity:{totalQuantity} </p>

                  
                  
                  <p className='tot-amt'>Total Amount: {Math.round(totalAmount)}</p>
                  <button className='checkout'>Checkout</button>
                  {/* <button onClick={handleClick}>{count} </button>  */}
                </div>
        
                {card.length === 0 ? (
                  <div className="empty-cart">
                    <h2>No items in cart</h2>
                  </div>
                ) : (
        
                    <ul className="cart-list">
        
                    {filteredProducts.map((item, index) => (
        
                    <li key={index} className="cart-list-item">
        
                    <img src={item.image} alt={item.title} />
        
                        <div className="item-details">
        
                          <p className="title">{item.title}</p>
        
                          <p className="price">Price: <span>${item.price}</span></p>
        
                          <div className="quantity-controls">
                            <p className="quantity">Quantity:
        
                              <button onClick={() => decrementer(item)}>-</button>
                              <span>{item.quantity}</span>
                              <button  onClick={() =>Incrementer(item)}>+</button> </p>
                          </div>
        
                          <p className="total-price">Total: <span>${(item.price * item.quantity).toFixed(2)}</span></p>
                          
                          <button className='remove' onClick={()=>removed(item)}>Remove</button>
                         
        
        
                        </div>
                         
                      </li>
                    ))}
                       
                  </ul>
                  
        
                )}
        
        
              </div>
            </>
          );
   
}
export default Cart;
