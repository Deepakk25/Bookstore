import {React, useState} from 'react' 
import '../src/App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Productcart from './Components/Product';
import Head from './Components/Head';
import Cart from './Components/Cart.jsx';
import About from './Components/About.jsx';
import Wishlist from './Components/Wishlist.jsx';
// import Wishlist from './Components/Wishlist.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login.jsx';

const App = ()=>{
  // const [count, setCount] = useState(0);
  const c=10;
  // const [card,setCard] = useState([]);

  // const increment =()=>{
  //   setCount(count+1);
  //   console.log(count)
  // }

 
    // const location = useLocation();
    // const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';



  return (
    //fragment
    <>  
    {/* <div className="container">
    <h1>React App     </h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eos impedit consectetur, tempore dignissimos labore? Vitae reiciendis rerum dolores. Illo nulla odit repudiandae autem quasi quas perferendis nobis omnis facere.</p>
    </div>
    
    <h2>Counter:{count}</h2>
    
    <button onClick={increment}>+</button>
    <p>{count}</p> */}

       
     
      {/* <Productcart card={card} setCard={setCard}/> */}

{/* 
      {!isAuthRoute && <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />}
            
            {!isAuthRoute && (
                <div className="search-container">
                    <p className="search-text">{searchTerm}</p>
                </div>
            )} */}


      <Router>
        <ToastContainer/>
        


      <Head />
      <Routes>

      <Route path='/' element={<Login/>}></Route>

      <Route path='/products' element={
          <Productcart count={c} ></Productcart>
        }/>

        {/* <Route path='/' element={
          <Productcart count={c} ></Productcart>
        }/> */}

      <Route path='/cart' element={
          <Cart />}
          />

      <Route path='/about' element={
          <About />}
          />

      <Route path='/wishlist' element={<Wishlist />} /> 

     

      </Routes>

      </Router>


      {/* return (
    <div className="App">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
  ); */}


    </>
  )
}

export default App;