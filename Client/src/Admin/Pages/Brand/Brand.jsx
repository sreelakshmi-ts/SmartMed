import React, { useEffect } from 'react'
import style from './Brand.module.css'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router'


const Brand = () => {
  const [brand,setBrand]=useState('')
  const[brandData,setBrandData]=useState([])
  const handleSubmit = (e) => {
        // e.preventDefault();
    const data = {
      brandName:brand
    }
    axios.post("http://localhost:5000/Brand", data).then((res) => {
      setBrand("");
      alert(res.data.message);
    });
  }

  const getBrand =()=>{

            axios.get("http://localhost:5000/Brand").then((res) => {
            setBrandData(res.data.brand);
            
            });
        }

    useEffect(() =>{
        getBrand();

    }, []);

    const handleDelete =(id) =>{
    axios.delete(`http://localhost:5000/Brand/${id}`).then((res) => {
    getBrand();
    });
  }


  return (
   <div>
        <div className={style.mainbrand}>
  <form className={style.brandform} onSubmit={handleSubmit}>
    <h2>Add Brand</h2>
    <p className={style.subtitle}>
      Create a new medicine brand
    </p>

    <div className={style.field}>
      <label>Brand Name</label>
      <input
        type="text"
        placeholder="Enter brand name"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />
    </div>

    <div className={style.actions}>
      <button type="submit" className={style.submit}>
        Add Brand
      </button>
      <button
        type="reset"
        className={style.cancel}
        onClick={() => setBrand("")}
      >
        Cancel
      </button>
    </div>
  </form>
</div>

        <div className={style.viewbrand}>
          <h3>Brand List</h3>

          <table className={style.table}>
          <thead>
          <tr>
            <th>SI No.</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
        {
        brandData.map((data,key) => (
          <tr key={data._id}>
            <td>{key + 1}</td>
            <td>{data.brandName}</td>
            <td className={style.actions}>
            <Link className={style.edit}>Edit</Link>
            <Link className={style.delete} onClick={()=> handleDelete(data._id)}>Delete</Link>
            
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>

    </div>
  )
}

export default Brand