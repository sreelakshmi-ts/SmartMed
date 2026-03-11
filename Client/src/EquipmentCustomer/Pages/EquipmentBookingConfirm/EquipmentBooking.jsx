import React from 'react'
import style from './EquipmentBooking.module.css'
import { PhoneAndroid } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';

const EquipmentBooking = () => {
    const [customer,setCustomer]=useState([]);
    const [booking,setBooking]=useState([]);
    const navigate = useNavigate();
    const{ id } = useParams();

    useEffect(() => {
            const ecid = sessionStorage.getItem('ecid');
            if (!ecid) return;
            axios.get(`http://localhost:5000/EquipmentCustomer/${ecid}`)
                .then(res => setCustomer(res.data.data))
                .catch(console.error);
        }, []);

        const fetchbooking = async () => {
            try {
              const res = await axios.get(`http://localhost:5000/EquipmentCartDetails/${id}/`);
              setBooking(res.data.data);   
            } catch (err) {
              console.log(err);
            }
            };

    useEffect(()=>{
        fetchbooking();
    },[]);

    const handlePayment = async () => {
        try {
            navigate(`/equipmentCustomer/equipayment/${id}`);
        } catch (err) {
            console.log(err);
        }
    };



  return (
    <div className={style.BookingPage}>
    
      <div className={style.MainGrid}>
    
        {/* LEFT SIDE */}
        <div className={style.LeftColumn}>
    
          {/* CUSTOMER CARD */}
          <div className={style.Card}>
            <h3>Delivery Address</h3>
    
            <p className={style.Name}>{customer.customerStoreName}</p>
    
            <p className={style.Address}>
             {customer.customerAddress} <br/>
              {customer.placeName ||"Unknown"}, {customer.districtName || "Unknown"}
            </p>
    
            <p className={style.Phone}><PhoneAndroid/>{customer.customerContact}</p>
          </div>
    
          
          
    
        </div>
    
        {/* RIGHT SIDE */}
        <div className={style.RightColumn}>
    
          <div className={style.SummaryCard}>
    
            <h3>Order Summary</h3>
    
              {booking.length === 0 ? (
                <p>No items found</p>
              ) : (
                booking.map((d)=>(
                  <div className={style.Row} key={d._id}>
                    <span>{d.equipmentName} </span>
                    <span>{d.equipmentPrice * d.cartQuantity}</span>
                  </div>
                ))
              )}
    
    
    
            <div className={style.Row}>
              <span>Delivery</span>
              <span className={style.Free}>FREE</span>
            </div>
    
            <hr />
    
            <div className={style.Total}>
              <span>Total</span>
              <span>₹{booking.length > 0 ? booking[0].bookAmount : 0}</span>
            </div>
    
            <button className={style.PayBtn} onClick={handlePayment}>Proceed to Payment</button>
    
          </div>
    
        </div>
    
      </div>
    
    </div>
  )
}

export default EquipmentBooking