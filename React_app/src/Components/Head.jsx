import React from "react";
import '../Components/Head.css';
import { useDispatch, useSelector } from "react-redux";
import { see } from "../redux/SerachSlice";
import { Link, useLocation,useNavigate } from "react-router-dom";

const Head = () => {
    const dispatch = useDispatch();
    const location = useLocation(); 
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);

    const handleSearch = (event) => {
        dispatch(see(event.target.value));
    };

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        navigate('/'); 
    };

  
    const isLoginPage = location.pathname === '/';

    return (
        <>
            <header>
                <h1 className="logo">Books</h1>
                <div className="side-bar">
                    <h2><Link to='/'>Product</Link></h2>
                    <h2><Link to='/about'>About</Link></h2>
                    <h2><Link to='/cart'>Cart: <span>{cartItems.length}</span></Link></h2>
                    <h2><Link to='/wishlist'>Wishlist</Link></h2>
                      {/* Add Sign Out Button */}
                 {!isLoginPage && (
                        <h2>
                            <button onClick={handleSignOut} className="signout-button">Sign Out</button>
                        </h2>
                    )} 
                </div>
            </header>
            {!isLoginPage && (
                <div className="search">
                    <input className="search-col" onChange={handleSearch} placeholder="Search..." />
                    <p className="search-txt">Search</p>
                </div>
            )}
        </>
    );
};

export default Head;



