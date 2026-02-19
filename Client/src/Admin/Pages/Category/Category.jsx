import React, { useEffect } from 'react'
import { useState } from 'react'
import style from './Category.module.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router'

const Category = () => {
    const [category,setCategory]=useState('')
    const[categoryData,setCategoryData]=useState([])
        const handleSubmit = (e) => {
          e.preventDefault();
            const data = {
                categoryName:category
            }
            axios.post("http://localhost:5000/Category", data).then((res) => {
            setCategory("");
            alert(res.data.message);
            getCategory();
            });
        }

        //get
        const getCategory =()=>{

            axios.get("http://localhost:5000/Category").then((res) => {
            setCategoryData(res.data.category);
            
            });
        }

    useEffect(() =>{
        getCategory();

    }, []);


    const handleDelete =(id) =>{
    axios.delete(`http://localhost:5000/Category/${id}`).then((res) => {
    getCategory();
    });
  }

  return (
    <div>
              <div className={style.maincat}>
      <div className={style.maincat}>
        <form className={style.catform} onSubmit={handleSubmit}>
          <h2>Add Category</h2>
          <p className={style.subtitle}>
            Create a new medicine category
          </p>

          <div className={style.field}>
            <label>Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className={style.actions}>
            <button type="submit" className={style.submit}>
              Add Category
            </button>
            <button
              type="reset"
              className={style.cancel}
              onClick={() => setCategory("")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      </div>



    <div className={style.viewcat}>
    <h3>Category List</h3>

    <table className={style.table}>
      <thead>
        <tr>
          <th>SI No.</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {
        categoryData.map((data,key) => (
          <tr key={data._id}>
            <td>{key + 1}</td>
            <td>{data.categoryName}</td>
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

export default Category