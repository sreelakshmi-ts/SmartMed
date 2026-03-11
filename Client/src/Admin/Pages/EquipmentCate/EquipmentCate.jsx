import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from './EquipmentCate.module.css'
import { Link } from 'react-router';

const EquipmentCate = () => {
    const[equiCategory,setEquiCategory]=useState('');
    const[equicategoryData,setEquiCategoryData]=useState([]);
    const[equipmentcateEditId,setEquipmentcateEditId]=useState(null);


        const handleSubmit = (e) => {
          e.preventDefault();
            const data = {
                equcategoryName :equiCategory
            }
            if(equipmentcateEditId===null){
            axios.post("http://localhost:5000/Equipmentcate", data).then((res) => {
            setEquiCategory("");
            alert(res.data.message);
            getEquiCategory();
            });
          }
          else{
            axios.put(`http://localhost:5000/Equipmentcate/${equipmentcateEditId}`, data)
              .then((res) => {
              setEquiCategory("");
              setEquipmentcateEditId(null);
              alert(res.data.message);
              getEquiCategory();  
          });            
          }
        }

        const getEquiCategory =()=>{

            axios.get("http://localhost:5000/Equipmentcate").then((res) => {
            setEquiCategoryData(res.data.equcategory);
            
            });
        }

    useEffect(() =>{
         getEquiCategory();

    }, []);

    const handleDelete =(id) =>{
        axios.delete(`http://localhost:5000/Equipmentcate/${id}`).then((res) => {
        getEquiCategory();
        });
    }

    const handleEdit=(id) =>{
    
    const result=equicategoryData.find((data) => data._id === id);
    if(result){
    setEquipmentcateEditId(result._id);
    setEquiCategory(result.equcategoryName);
     setTimeout(() => {
      document.getElementById("EquicategoryInput")?.focus();
    }, 0);
      }
    };  


  return (
   <div>
        <div className={style.maincat}>
        <div className={style.maincat}>
        <form className={style.catform} onSubmit={handleSubmit}>
          <h2>Add Category</h2>
          <p className={style.subtitle}>
            Create a new Equipment category
          </p>

          <div className={style.field}>
            <label>Equipment Category Name</label>
            <input
              type="text"
              placeholder="Enter Equipment category name"
              value={equiCategory}
              id='EquicategoryInput'
              onChange={(e) => setEquiCategory(e.target.value)}
              required
            />
          </div>

          <div className={style.actions}>
            <button type="submit" className={style.submit}>
              {equipmentcateEditId ? "Update Category" : "Add Category"}
            </button>
            <button
              type="reset"
              className={style.cancel}
              onClick={() => setEquiCategory("")}
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
          <th>Equipment Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {
        equicategoryData.map((data,key) => (
          <tr key={data._id}>
            <td>{key + 1}</td>
            <td>{data.equcategoryName}</td>
            <td className={style.actions}>
            <Link className={style.edit} onClick={()=> handleEdit(data._id)}>Edit</Link>
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

export default EquipmentCate