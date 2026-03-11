import React, { useEffect, useState } from 'react'
import style from './Place.module.css'
import axios from 'axios';
import { Link } from 'react-router';

const Place = () => {
  const[district,setDistrict]=useState([]);
  const[place,setPlace]=useState('');
  const[distId,setDistId]=useState('');
  const[getPlaceData,setPlaceData]=useState([]);
  const[placeEditId,setPlaceEditId]=useState(null);

  const handleSubmit=(e) =>{
     e.preventDefault();
    const data={
      placeName:place,
      districtId:distId
    }
    if(placeEditId===null){
    axios.post("http://localhost:5000/Place", data).then((res) => {
     
      setPlace("");
      setDistId("");
      alert(res.data.message);
      getPlace();
    });
  }
  else{
          axios.put(`http://localhost:5000/Place/${placeEditId}`, data)
          .then((res) => {
          setPlace("");
          setDistId("");
          setPlaceEditId(null);
          alert(res.data.message);
          getPlace();  
          
        });    
  }
  }

  const getDistrict =()=>{
    axios.get("http://localhost:5000/District").then((res) => {
      setDistrict(res.data.district)

    });
  }
  useEffect(() => {
    getDistrict();
    getPlace();
  },[]);

  const getPlace =()=>{
    axios.get("http://localhost:5000/Place").then((res) => {
      setPlaceData(res.data.place);
  });
}


    const handleDelete =(id) =>{
    axios.delete(`http://localhost:5000/Place/${id}`).then((res) => {
    getPlace();
    });
    }
    const handleEdit = (id) => {
      const result = getPlaceData.find((data) => data._id === id);

      if (result) {
        setPlaceEditId(result._id);
        setPlace(result.placeName);
        setDistId(result.districtId?._id);  

        setTimeout(() => {
          document.getElementById("placeInput")?.focus();
        }, 0);
      }
    };


  return (
    <>
    <div className={style.placePage}>
    <form className={style.placeForm}>
    <h2>Place</h2>
    <p className={style.subtitle}>
      Add a new place
    </p>

    <div className={style.field}>
      <label>District</label>
      <select required  value={distId} onChange={(e) =>setDistId(e.target.value)}>
        <option value="">Select District</option>
          {district.map((row) => (
          <option key={row._id} value={row._id}>{row.districtName}</option>
          ))}
      </select>
    </div>

    <div className={style.field}>
      <label>Place Name</label>
      <input
        type="text"
        placeholder="Enter place name"
        required
        value={place}
        id='placeInput'
        onChange={(e) => setPlace(e.target.value)}
      />
    </div>

    <div className={style.actions}>
      <button type="submit" className={style.submit} onClick={handleSubmit}>
        {placeEditId ? "Update Place" : "Add Place"}
      </button>
      <button type="reset" className={style.cancel}>
        Cancel
      </button>
    </div>
    </form>
    </div>
    

    <div className={style.viewplace}>
    <h3>District List</h3>

    <table className={style.table}>
      <thead>
        <tr>
          <th>SI No.</th>
          <th>Place</th>
          <th>District</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {getPlaceData.map((data, key) => (
             <tr key={data._id}>
            <td>{ key + 1 }</td>
            <td>{data.placeName}</td>
            <td>{data.districtId ? data.districtId.districtName : 'Unknown'}</td>
            <td className={style.actions}>
            <Link className={style.edit} onClick={()=> handleEdit(data._id)}>Edit</Link>
            <Link className={style.delete} onClick={()=> handleDelete(data._id)} >Delete</Link>
            </td>

          </tr>
        ))}
         
  
      </tbody>
    </table>
  </div>
  
 
  </>

  

  )
}

export default Place