import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './papges/home/home';
import { Shop } from './papges/shop/shop';
import { About } from './papges/about/about';
import { Cart } from './papges/cart/cart';
import Account from './papges/account/account';
import UpdateUser from './papges/account/UpdateUser'; 
import AddItem from './papges/account/AddItem';
import ViewItem from './papges/account/ViewItem';
import { ShopContextProvider } from './context/shop-context';
import { Footer } from './components/footer';
//import DeleteItem from './papges/account/deleteitem';
import EditItem from './papges/account/editItem';
import Signup from './papges/user/Singup';
import Login from './papges/user/Login';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/updateuser" element={<UpdateUser />} />
            <Route path="/account/additem" element={<AddItem/>}/>
            <Route path="/account/viewitem" element={<ViewItem/>}/> 
            <Route path="/account/edititem/:itemId" element={<EditItem />} />
            <Route path="/user/Login" element={<Login/>}/>
            <Route path="/user/Singup" element={<Signup/>}/>
           
          </Routes>
          <Footer />
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
