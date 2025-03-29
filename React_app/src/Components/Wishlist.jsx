import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import "../Components/Wishlist.css"; 

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const handleRemove = (item) => {
        dispatch(removeFromWishlist(item.id));

    };

    const handleClear = () => {
        dispatch(clearWishlist());
    };

    const searchItem=useSelector((state)=>state.search.query)



    const filteredProducts=wishlistItems.filter(prod=>prod.title.toLowerCase().includes(searchItem.toLowerCase()) || 
    prod.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    prod.price.toString().includes(searchItem.toLowerCase()) ||
    prod.category.toLowerCase().includes(searchItem.toLowerCase()) );

    return (
        <div className="wishlist-container">
            <h2>Wishlist</h2>
            <button onClick={handleClear}>Clear Wishlist</button>
            {wishlistItems.length === 0 ? (
                <p>No items in wishlist</p>
            ) : (
                <ul>
                    {filteredProducts.map((item) => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.title}</p>
                            <p>${item.price}</p>
                            <button className="remove"onClick={() => handleRemove(item)}>Remove</button>
                        </li>
                    ))}
              
                </ul>
            )}
        </div>
    );
};

export default Wishlist;
