import { Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import style from "./Type.module.css"
import axios from 'axios'
import { Link } from 'react-router'

const Type = () => {
  const [type,setType]=useState('')
  const [typeData,setTypeData]=useState([])
  const handleSubmit = (e) => {
    // e.preventDefault();
    const data = {
      typeName:type
    }
    axios.post("http://localhost:5000/Type", data).then((res) => {
      setType("");
      alert(res.data.message);
    });
  }

  const getType =()=>{

            axios.get("http://localhost:5000/Type").then((res) => {
            setTypeData(res.data.type);
            
            });
        }

    useEffect(() =>{
        getType();

    }, []);

      const handleDelete =(id) =>{
    axios.delete(`http://localhost:5000/Type/${id}`).then((res) => {
    getType();
    });
  }


  return (
    <div>
        <div className={style.maintype}>
  <form className={style.typeform} onSubmit={handleSubmit}>
    <h2>Add Type</h2>
    <p className={style.subtitle}>Create a new medicine type</p>

    <div className={style.field}>
      <label>Type Name</label>
      <input
        type="text"
        placeholder="Enter type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
    </div>

    <div className={style.actions}>
      <button type="submit" className={style.submit}>Submit</button>
      <button type="reset" className={style.cancel}>Cancel</button>
    </div>
  </form>
</div>


         <div className={style.viewtype}>
          <h3>Type List</h3>

          <table className={style.table}>
          <thead>
          <tr>
            <th>SI No.</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
        {
        typeData.map((data,key) => (
          <tr key={data._id}>
            <td>{key + 1}</td>
            <td>{data.typeName}</td>
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

export default Type