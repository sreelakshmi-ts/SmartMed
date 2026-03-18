import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { Delete, ShoppingCart, CalendarToday, AttachMoney, Add, Remove, CurrencyRupee, CurrencyRupeeRounded, CurrencyRupeeSharp } from '@mui/icons-material';

const MyCart = () => {

  const userId = sessionStorage.getItem('ecid');
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/EquipmentBookingWithCart/${userId}`);
      setBookingData(res.data.data);
    } catch (err) {
      setError("Cart empty");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartId) => {
    await axios.delete(`http://localhost:5000/EquipmentCart/${cartId}`);
    fetchCart();
  };

  const handleQuantityChange = async (cartId, qty, stock) => {

    const finalQty = Math.max(1, Math.min(qty, stock));

    await axios.put(`http://localhost:5000/EquipmentCart/${cartId}`, {
      cartQuantity: finalQty
    });

    fetchCart();
  };

  const totalAmount = bookingData?.cartItems?.reduce((sum, item) => {
    return sum + parseFloat(item.price) * parseInt(item.quantity);
  }, 0) || 0;

  const handleCheckout = async () => {
    await axios.put(`http://localhost:5000/EquipmentBookingPutCheck/${bookingData._id}`, {
      bookAmount: totalAmount,
       bookStatus:1
    });

    navigate(`/equipmentCustomer/equibookingconfirm/${bookingData._id}`);
  };

  if (loading) return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <CircularProgress />
    </Container>
  );

  if (!bookingData) return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <ShoppingCart sx={{ fontSize: 80 }} />
      <Typography>No items in cart</Typography>
    </Container>
  );

  return (
    <Container sx={{ mt: 10 }}>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">
            <ShoppingCart /> My Cart
          </Typography>

          {/* <Chip
            icon={<CalendarToday />}
            label={new Date(bookingData.bookDate).toLocaleDateString()}
          /> */}
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow sx={{ background: "sandybrown" }}>
              <TableCell>Equipments</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {bookingData.cartItems.map(item => {

              const qty = parseInt(item.quantity);
              const price = parseFloat(item.price);
              const stock = parseInt(item.stockQty);

              return (
                <TableRow key={item.cartId}>

                  <TableCell>
                    <Box display="flex">

                      <img src={`http://localhost:5000/${item.photo}`} width="120" />

                      <Box ml={2}>
                        <Typography fontWeight="bold">
                          {item.equipmentName}
                        </Typography>

                        {/* <Typography variant="body2">
                          {item.description}
                        </Typography> */}

                        <Typography color={stock > 0 ? "green" : "red"}>
                          Stock : {stock}
                        </Typography>

                        <Typography variant="body2">
                          Brand : {item.brand}
                        </Typography>

                      </Box>

                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton onClick={() => handleQuantityChange(item.cartId, qty - 1, stock)} disabled={qty <= 1}>
                      <Remove />
                    </IconButton>

                    {qty}

                    <IconButton onClick={() => handleQuantityChange(item.cartId, qty + 1, stock)} disabled={qty >= stock}>
                      <Add />
                    </IconButton>
                  </TableCell>

                  <TableCell align="right">
                    <CurrencyRupeeSharp/>{price}
                  </TableCell>

                  <TableCell align="right">
                     <CurrencyRupeeSharp/>{(price * qty).toFixed(2)}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleRemoveItem(item.cartId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>

                </TableRow>
              );
            })}

            <TableRow>

              <TableCell colSpan={3} align="right">
                <Typography variant="h6">Total</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="h6">
                  <CurrencyRupeeSharp/>{totalAmount.toFixed(2)}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Button variant="contained" sx={{ background: "sandybrown" }} onClick={handleCheckout} >
                  Place Order
                </Button>
              </TableCell>

            </TableRow>

          </TableBody>

        </Table>
      </TableContainer>

    </Container>
  );
};

export default MyCart;
