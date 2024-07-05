import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const Cart = () => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankName, setBankName] = useState('');

  useEffect(() => {
    const fetchItemsInCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/cart/all/${JSON.parse(localStorage.getItem("userDetails"))._id}`
        );
        setItems(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setIsLoading(false);
      }
    };
    fetchItemsInCart();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [items]);

  const calculateTotalAmount = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotalAmount(total);
  };

  const buy = () => {
    setIsPaymentDialogOpen(true);
  };

  const confirmPayment = async () => {
    try {
      axios.delete(`http://localhost:5555/cart/buy/${JSON.parse(localStorage.getItem("userDetails"))._id}`);
      alert("Payment SUCCESS");
      closePaymentDialog();
      window.location.reload();
    } catch (error) {
      console.error('Error confirming payment:', error);
      closePaymentDialog();
    }
  };

  const cancelOrder = async () => {
    try {
      axios.delete(`http://localhost:5555/cart/buy/${JSON.parse(localStorage.getItem("userDetails"))._id}`);
      alert("Order Canceled");
      window.location.reload();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    setPaymentMethod('');
    setBankName('');
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <TableContainer style={{ display: 'flex', justifyContent: 'center' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell> 
                    <TableCell>
                      <img
                        src={`http://localhost:5555${item.image}`}
                        alt={item.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            Total Amount: {totalAmount}
          </Typography>
          <Button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: '5px',
              padding: '10px 20px',
              margin: '10px',
            }}
            onClick={buy}
          >
            Buy
          </Button>
          <Button
            style={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '5px',
              padding: '10px 20px',
              margin: '10px',
            }}
            onClick={cancelOrder}
          >
            Clear Cart
          </Button>
        </>
      )}

      <Dialog open={isPaymentDialogOpen} onClose={closePaymentDialog}>
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <TextField
            label="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePaymentDialog}>Cancel</Button>
          <Button onClick={confirmPayment}>Confirm Payment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
