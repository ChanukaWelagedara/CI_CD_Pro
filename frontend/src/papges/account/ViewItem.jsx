import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
//import './viewItem.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ViewItem = () => {
  const [items, setItems] = useState([]);
  const categories = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat8"];

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      
      const jwtSecretKey = process.env.JWT_TOKEN_KEY; 
      let id = JSON.parse(localStorage.getItem("userDetails"))._id
     console.log(id)
      const response = await axios.get('http://localhost:5555/instruments/all/' + id, {
        headers: {
          Authorization: `Bearer ${jwtSecretKey}`,
        },
      });
      console.log(response.data)
  
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5555/instruments/${itemId}`);
      console.log(response.data);
      window.alert("Item deleted successfully!");
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      window.alert('Error deleting item. Please check the console for details.');
    }
  };

  return (
    <div className="home">
      <h1>Chanu Music</h1>
      <div className="category-buttons">
        {categories.map((category, index) => (
          <Link to="/shop" key={index}>
            <button className="category-button">{category}</button>
          </Link>
        ))}
      </div>
      <div className="items">
        <h2>Items for Sale</h2>
          <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Adding Date</TableCell>
                    <TableCell>Image</TableCell> {/* Added a new TableCell for images */}
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.addDate}</TableCell>
                      <TableCell>
                        <img
                          src={`http://localhost:5555${item.image}`}
                          alt={item.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </TableCell>

                      <TableCell>
                        <Link to={`/account/edititem/${item._id}`}>
                          <button>Edit</button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </TableContainer>
      </div>
    </div>
  );
};

export default ViewItem;
