import React, { useState } from 'react'
import style from './BookingConfirm.module.css'
import { Phone, PhoneAndroid } from '@mui/icons-material'
import axios from 'axios';
import { useEffect } from 'react';
import { data } from 'react-router';
import { useParams } from 'react-router';

import { useNavigate } from 'react-router';


const BookingConfirm = () => {
    const[rep,setRep]=useState([]);
    const navigate = useNavigate();
    const[customer,setCustomer]=useState([]);
    const[booking,setBooking]=useState([]);
    const [putrep, setPutRep] = useState('');
    const { id } = useParams();
    const [repSearch, setRepSearch] = useState("");

   


    const getRep=()=>{
        axios.get(`http://localhost:5000/ViewRep`)
        .then(res => setRep(res.data.rep))
        .catch(console.error);
    }
    useEffect(() =>{
    getRep();
    // fetchbooking();
    },[]);

    useEffect(()=>{
    fetchbooking();
    },[])

    

  useEffect(() => {
          const cid = sessionStorage.getItem('cid');
          if (!cid) return;
          axios.get(`http://localhost:5000/Customer/${cid}`)
          
              .then(res => setCustomer(res.data.data)
          
              )
              .catch(console.error);
      }, []);

    const fetchbooking = async () => {

      try {

        const res = await axios.get(`http://localhost:5000/Cart/${id}/`);

        setBooking(res.data.data);   

      } catch (err) {
        console.log(err);
      }

    };


      const handelPayment = async () => {

        if(!putrep){
          alert("Please select representative");
          return;
        }

        try {

          await axios.put(`http://localhost:5000/BookingPutRep/${id}`, {
            repId: putrep
          });

          
          navigate(`/customer/payment/${id}`);

        } catch(err){
          console.log(err);
        }
      };

      const filteredRep = rep.filter((item) =>
        item.placeId?.placeName.toLowerCase().includes(repSearch.toLowerCase()) ||
        item.repName.toLowerCase().includes(repSearch.toLowerCase())
      );




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

      {/* REPRESENTATIVE */}
     <div className={style.Card}>
  <h3>Select Representative</h3>

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search by place..."
    className={style.RepSearch}
    value={repSearch}
    onChange={(e) => setRepSearch(e.target.value)}
  />

  {filteredRep.length > 0 ? (
    filteredRep.map((data) => (
      <label className={style.Rep} key={data._id}>
        <input
          type="radio"
          name="rep"
          value={data._id}
          onChange={(e) => setPutRep(e.target.value)}
        />

        <div>
          <strong>{data.repName}, </strong>
          <span>
            {data.placeId?.placeName || "Unknown"},
            {data.placeId?.districtId?.districtName || "Unknown"}
          </span>
        </div>
      </label>
    ))
  ) : (
    <p>No representatives found</p>
  )}
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
                <span>{d.medicineName} </span>
                <span>{d.medicinePrice * d.cartQuantity}</span>
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

        <button className={style.PayBtn} onClick={handelPayment}>Proceed to Payment</button>

      </div>

    </div>

  </div>

</div>

  )
}

export default BookingConfirm
