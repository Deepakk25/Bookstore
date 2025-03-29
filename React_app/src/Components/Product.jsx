import React, { useState, useEffect } from "react";
import '../Components/Product.css';
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice"; 
import { toast } from "react-toastify";
import axios from 'axios';
import { setProducts } from "../redux/productSlice";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Productcart = (props) => {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3000/products");
    dispatch(setProducts(res.data));
  };

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products);
  const searchItem = useSelector((state) => state.search.query);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProducts = product.filter(prod =>
    prod.title.toLowerCase().includes(searchItem.toLowerCase()) ||
    prod.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    prod.price.toString().includes(searchItem.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  const addItem = (item) => {
    dispatch(add(item));
    toast.success("Item added to the cart");
  };

  const isInCart = (itemId) => cartItems.some(item => item.id === itemId);
  const isInWishlist = (itemId) => wishlistItems.some(item => item.id === itemId);

  const addItemToWishlist = (item) => {
    if (isInWishlist(item.id)) {
      dispatch(removeFromWishlist(item.id)); 
      toast.info("Item removed from the wishlist");
    } else {
      dispatch(addToWishlist(item)); 
      toast.success("Item added to the wishlist");
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="sorting-container">
        <button className="sort-button" onClick={() => setShowDropdown(!showDropdown)}>
          Sort by Price
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={() => handleSortChange("low-to-high")}>Price: Low to High</button>
            <button onClick={() => handleSortChange("high-to-low")}>Price: High to Low</button>
          </div>
        )}
      </div>

      <ul className="cart-container">
        {sortedProducts.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <p className="title">{item.title}</p>
            <p className="price">Price: {item.price}</p>
            <p className="des">Description: {item.description}</p>
            <p className="cat">Category: {item.category}</p>
            <button className="add-to-cart" onClick={() => {
              if (isInCart(item.id)) {
                goToCart();
              } else {
                addItem(item);
              }
            }}>
              {isInCart(item.id) ? "Go to Cart" : "Add to Cart"}
            </button>
            <button className="add-to-wishlist" onClick={() => addItemToWishlist(item)}>
              <i className={`fa-heart ${isInWishlist(item.id) ? 'fas' : 'far'}`} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Productcart;
