import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, UserSwitch } from "phosphor-react";
import '../components/navbar.css';

export const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(""); // State to hold the user's name
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    setIsLogged(!!userDetails);

    // Set the user's name if available
    if (userDetails && userDetails.firstName) {
      setUserName(userDetails.firstName);
    }
  }, []);
  useEffect(() => {
    // Determine the active link based on the current location
    if (location.pathname === "/user/Login") {
      setActiveLink("Login");
    } else if (location.pathname === "/user/Singup") {
      setActiveLink("Singup");
    } else if (location.pathname === "/") {
      setActiveLink("Home");
    } else if (location.pathname === "/about") {
      setActiveLink("About");
    } else if (location.pathname === "/account") {
      setActiveLink("Account");
    } else if (location.pathname === "/shop") {
      setActiveLink("Shop");
    } else if (location.pathname === "/cart") {
      setActiveLink("Cart");
    }
  }, [location.pathname]);

  const handleButtonClick = () => {
    navigate("/");}

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5555/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('userDetails');
        navigate('/');
        setIsLogged(false);
        window.location.reload();
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <div className="navbar" style={{ backgroundImage: 'url("/vector1.png")' }}>
      
      <button className="left-button" onClick={handleButtonClick}>
      <img src="/logo.png" width="200" height="200" alt="Image Alt Text" />
    </button>
      <div className="image"></div>
      <div className="links">
        {!isLogged ? (
          <>
            <Link to="/user/Login" className={activeLink === "Login" ? "active" : ""}>
              Login
             
            </Link>
            <Link to="/user/Singup" className={activeLink === "Singup" ? "active" : ""}>

              Singup
            </Link>
            <Link to="/" className={activeLink === "Home" ? "active" : ""}>
              Home
            </Link>
          </>
        ) : (
          <>
           <Link to="/" className={activeLink === "Home" ? "active" : ""}>
              Home
            </Link>
            
            <Link to="/about" className={activeLink === "About" ? "active" : ""}>
              About
            </Link>
            <Link to="/account" className={activeLink === "Account" ? "active" : ""}>
              Account
            </Link>
            <Link to="/shop" className={activeLink === "Shop" ? "active" : ""}>
              Shop
            </Link>
            <Link to="/cart" className={activeLink === "Cart" ? "active" : ""}>
              <span>
                <ShoppingCart size={36} />
              </span>
            </Link>
            <span
              onClick={handleLogout}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              className={isLogoutHovered ? "logout-icon" : ""}
            >
              <UserSwitch size={32} />
            </span>
          </>
        )}
      </div>
    </div>
  );
};
