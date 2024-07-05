import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const Account = () => {
  const [account, setAccount] = useState([]);
  const [items, setItems] = useState([]);
  const categories = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat8"];

  useEffect(() => {
    // Check if user details are stored in local storage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      setAccount([userDetails]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jwtSecretKey = process.env.JWT_TOKEN_KEY; 
      let id = JSON.parse(localStorage.getItem("userDetails"))._id;
      const response = await axios.get('http://localhost:5555/instruments/all/' + id, {
        headers: {
          Authorization: `Bearer ${jwtSecretKey}`,
        },
      });
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
    <div className="account-page">
      <div className="user-info">
        {account.map((user, index) => (
          <Card key={user.email} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                User Information
              </Typography>
              <Typography variant="h5" component="div">
                Name: {user.firstName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
               
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Link to="./AddItem">
          <button>Add Item</button>
        </Link>
      </div>

      <div className="items-for-sale">
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
                <TableCell>Image</TableCell>
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

export default Account;
