import React, { useEffect, useState } from 'react'
import style from './EquiCustomerDetails.module.css'
import axios from 'axios';
import { Link } from 'react-router';

const EquiCustomerDetails = () => {
     const[customer,setCustomer]=useState([]);
        const getCustomer =() =>{
            axios.get(`http://localhost:5000/EquipmentCustomer`)
            .then(res => setCustomer(res.data.equipmentcustomer))
            .catch(console.error);
        };
        useEffect(() =>{
          getCustomer();
        },[])
    
      const handleAccept = (id) => {
      axios.put(`http://localhost:5000/EquipmentCustomer/${id}`, {
        customerStatus: "Accepted"
        })
      .then((res) => {
        alert(res.data.message);
        getCustomer();
      })
      .catch(console.error);
    };
    
    const handleReject = (id) => {
      axios.put(`http://localhost:5000/EquipmentCustomer/${id}`, {
        customerStatus: "Rejected"
      })
      .then((res) => {
        alert(res.data.message);
        getCustomer();
      })
      .catch(console.error);
    };
  return (
       <div>
              <div className={style.page}>
          <div className={style.card}>
            <h2>Customer Details</h2>
            <p className={style.subtitle}>
              View Customer Details
            </p>
            <div className={style.tableWrapper}>
    
            <table className={style.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Store Name</th>
                  <th>Owner Name</th>
                  <th>Store No.</th>
                  <th>Sales Licence</th>
                  <th>Location</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
    
              <tbody>
                {/* Complaints will be mapped here */}
                {customer.map((data,key)=>(

                    <tr key={data._id}>
                        <td  className={style.empty}>{key+1} </td>
                     <td className={style.empty}>{data.customerStoreName}</td>
                     <td className={style.empty}>{data.ownerName}</td>
                     <td className={style.empty}>{data.customerStoreRegNo}</td>
                     
                      <td className={style.empty}>
                        {data.SalesLicense && (
                          <a
                            href={`http://localhost:5000${data.SalesLicense}`}
                            target="_blank"
                            
                          >
                            <img
                              src={`http://localhost:5000${data.SalesLicense}`}
                              alt="Licence"
                              width="100"
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                        )}
                      </td>

                    
                     
                     <td className={style.empty}>{data.placeId ?.placeName ||"Unknown"},{data.placeId?.districtId?.districtName || "Unknown"}</td>
                     <td className={style.empty}>{data.customerAddress}</td>
                     <td className={style.empty}>{data.customerContact}</td>
                     <td className={style.empty}>{data.customerEmail}</td>
                    <td className={style.actions}>
                        {data.customerStatus === "Accepted" && (
                            <span className={`${style.status} ${style.accepted}`}>
                            Accepted
                            </span>
                        )}

                        {data.customerStatus === "Rejected" && (
                            <span className={`${style.status} ${style.rejected}`}>
                            Rejected
                            </span>
                        )}

                        {(!data.customerStatus || data.customerStatus === "Pending") && (
                            <div className={style.actionWrapper}>
                            <Link
                                className={`${style.actionBtn} ${style.accept}`}
                                onClick={() => handleAccept(data._id)}
                            >
                                Accept
                            </Link>

                            <Link
                                className={`${style.actionBtn} ${style.reject}`}
                                onClick={() => handleReject(data._id)}
                            >
                                Reject
                            </Link>
                            </div>
                        )}
                        </td>



                    </tr>

                ))}

               
              </tbody>
    
            </table>
            </div>
          </div>
        </div>
        </div>
  )
}

export default EquiCustomerDetails