import React, { createContext, useState } from "react"; // Import useState
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);




const getDefalCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefalCart()); // Initialize with default cart

  const addToCart = async (itemId) => {
    try {


      const formData = new FormData();
      formData.append('product', itemId._id);
      formData.append('user',JSON.parse(localStorage.getItem("userDetails"))._id);
      formData.append('name',itemId.name);
      formData.append('price',itemId.price);
      formData.append('image',itemId.image)
      console.log(formData)
      const response = await fetch('http://localhost:5555/cart', {
        method: 'POST',
        body: formData
      });

      if (response.status === 201) {
        // Item created successfully
        alert('Cart created successfully');
        // Refresh the page
        window.location.reload();
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
        alert('Item creation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Item creation failed');
    }
  

    console.log(itemId)
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

    const updateCartItemCount=(newAmount,itemId)=>{
      setCartItems((prev)=>({...prev,[itemId]:newAmount}))
    };

const gettotalCartAmount=()=>
{
  let totalAmount=0;
  for (const item in cartItems){
    if (cartItems[item]>0){
      let itemInfo =PRODUCTS.find((product)=>product.id===Number(item));
      totalAmount+=cartItems[item]*itemInfo.price
    
    }
     
  }
  return  totalAmount;
};

  const contextValue = { cartItems, addToCart, removFromCart ,updateCartItemCount,gettotalCartAmount};
   
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children} 
    </ShopContext.Provider>
  );
};
