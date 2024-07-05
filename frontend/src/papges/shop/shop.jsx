import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CircularProgress from '@mui/material/CircularProgress';
import { ShopContext } from '../../context/shop-context';
import './shop.css';

export const Shop = () => {
  const [items, setItems] = useState({});
  const { addToCart } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);

  const categories = ["Guitar", "Drums", "Electronic Instrument", "Brass Instrument", "Audio Equipment", "String Instruments", "Accessories", "KeyBoard"];

  const [displayedItems, setDisplayedItems] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const itemsPerPage = 6;

  const fetchItemsByCategory = async () => {
    try {
      const categorizedItems = {};

      for (const category of categories) {
        setLoadingStates((prevState) => ({
          ...prevState,
          [category]: true,
        }));

        const response = await axios.get(`http://localhost:5555/instruments/category/${category}`);
        categorizedItems[category] = response.data.data;

        setLoadingStates((prevState) => ({
          ...prevState,
          [category]: false,
        }));
      }

      setItems(categorizedItems);

      const initialDisplayedItems = {};
      for (const category of categories) {
        if (categorizedItems[category]) {
          initialDisplayedItems[category] = categorizedItems[category].slice(0, itemsPerPage);
        }
      }
      setDisplayedItems(initialDisplayedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchItemsByCategory();
  }, []);

  const handleNext = (category) => {
    if (items[category]) {
      const currentDisplayed = displayedItems[category] || [];
      const startIndex = currentDisplayed.length;
      const endIndex = startIndex + itemsPerPage;
      const newDisplayed = items[category].slice(startIndex, endIndex);
      setDisplayedItems({
        ...displayedItems,
        [category]: newDisplayed,
      });
    }
  };

  const handlePrevious = (category) => {
    if (items[category]) {
      const currentDisplayed = displayedItems[category] || [];
      let endIndex = currentDisplayed.length - 1;

      if (endIndex < 0) {
        endIndex = 0;
      }

      const newDisplayed = items[category].slice(Math.max(0, endIndex - itemsPerPage), endIndex + 1);

      setDisplayedItems({
        ...displayedItems,
        [category]: newDisplayed,
      });
    }
  };

  const handleAddToCart = (item, condition) => {
    // Check if the item is already in the cart
    const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

    if (itemIndex !== -1) {
      // If the item is in the cart, update its condition
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].condition = condition;
      setCartItems(updatedCartItems);
    } else {
      
      setCartItems([...cartItems, { ...item, condition }]);
    }

    addToCart(item);
  };

  return (
    <div >
      {categories.map((category) => (
        <div key={category}>

        <h2 style={{
                    fontSize: '36px',
                    color: 'black',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    backgroundImage: `url('/image1.png')`,
                   
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat',
                    padding: '20px', 
                  }}>
                    {category}
        </h2>
          {loadingStates[category] ? (
            <CircularProgress color="secondary" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Carousel showThumbs={false} showStatus={false} showIndicators={false} showArrows={true} style={{ width: '100%' }}>
                {displayedItems[category] && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {displayedItems[category].map((item) => (
                      <Card key={item._id} style={{ maxWidth: '300px', margin: '10px', position: 'relative' }}>
                        {item.condition === "used" && (
                              <div style={{
                                background: 'red',
                                color: 'white',
                                padding: '5px',
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                borderRadius: '5px',
                                transform: 'rotate(45deg)'
                                  
                              }}>
                                Used
                              </div>
                            )}

                            {item.condition === "new" && (
                              <div style={{
                                background: 'green',
                                color: 'white',
                                padding: '5px',
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                borderRadius: '5px',
                                transform: 'rotate(45deg)'
                              }}>
                                New
                              </div>
                            )}

                        <CardMedia
                          component="img"
                          alt={item.name}
                          height="200"
                          width="300"
                          image={`http://localhost:5555${item.image}`}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: {item.price}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddToCart(item, item.condition)}
                          >
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </Carousel>
              {displayedItems[category] && displayedItems[category].length < items[category].length && (
                <div>
                  <Button onClick={() => handlePrevious(category)}>Previous</Button>
                  <Button onClick={() => handleNext(category)}>Next</Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
