
import React, { useEffect, useState } from 'react'
import style from './District.module.css'
import axios from 'axios'
import { Link } from 'react-router'

const District = () => {
  const [district, setDistrict] = useState('');
  const [districtdata, setDistrictData] = useState([]);
  const [districtEditId, setDistrictEditId] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      districtName: district
    }
    if(districtEditId === null){
    axios.post("http://localhost:5000/District", data).then((res) => {
    
       setDistrict(""); 
      alert(res.data.message);
     console.log(res.data.message);
     
      getDistrict();
    });
    }
    else{
     axios.put(`http://localhost:5000/District/${districtEditId}`, data)
      .then((res) => {
      setDistrict("");
      setDistrictEditId(null);
      alert(res.data.message);
      getDistrict();  
  });


    }
  }
  //get    
  const getDistrict = () => {
    axios.get("http://localhost:5000/District").then((res) => {
      setDistrictData(res.data.district)

    });
  }
  
  useEffect(() => {
    getDistrict();
  }, []);


  const handleDelete =(id) =>{
    axios.delete(`http://localhost:5000/District/${id}`).then((res) => {
    getDistrict();
    });
  }

 const handleEditfetch = (id) => {
  const result = districtdata.find((data) => data._id === id);
  if (result) {
    setDistrictEditId(result._id);
    setDistrict(result.districtName);
     setTimeout(() => {
      document.getElementById("districtInput")?.focus();
    }, 0);
    }
};

  return (
  <div>
  {/* Form Section */}

  <div className={style.districtPage}>
  {/* Add District */}
  <form className={style.districtForm}>
    <h2>Add District</h2>
    <p className={style.subtitle}>
      Create a new district for location mapping
    </p>

    <div className={style.field}>
      <label>District Name</label>
     <input
  type="text"
  placeholder="Enter district name"
  id='districtInput'
  required
  value={district}
  onChange={(e) => setDistrict(e.target.value)}
/>

    </div>

    <div className={style.actions}>
      <button type="submit" className={style.submit} onClick={handleSubmit}>

        {districtEditId ? "Update District" : "Add District"}
      </button>
      <button type="reset" className={style.cancel}>
        Cancel
      </button>
    </div>
  </form>
  </div>


  {/* View District Table */}
  <div className={style.viewdistrict}>
    <h3>District List</h3>

    <table className={style.table}>
      <thead>
        <tr>
          <th>SI No.</th>
          <th>District</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {districtdata.map((data, key) => (
          <tr key={data._id}>
            <td>{key + 1}</td>
            <td>{data.districtName}</td>
            <td className={style.actions}>
            <Link className={style.edit} onClick={()=> handleEditfetch(data._id)}>Edit</Link>
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

export default District