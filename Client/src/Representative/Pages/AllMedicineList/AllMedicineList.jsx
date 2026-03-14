import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./AllMedicineList.module.css";
import SearchIcon from "@mui/icons-material/Search";

const AllMedicineList = () => {

  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load medicines
  useEffect(() => {
    axios.get("http://localhost:5000/representativeMedicinesList")
      .then(res => setMedicines(res.data.medicines))
      .catch(console.error);
  }, []);

  // SEARCH FILTER
  const filteredMedicines = medicines.filter((med) =>
    med.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.brandId?.brandName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style.page}>

      <h2>Available Medicines</h2>

      {/* SEARCH BAR */}
      <div className={style.searchBox}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search medicine or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* MEDICINE LIST */}
      <div className={style.grid}>

        {filteredMedicines.map((med) => (

          <div className={style.card} key={med._id}>

            <img
              src={`http://localhost:5000/${med.medicinePhoto}`}
              className={style.image}
              alt=""
            />

            <h3>{med.medicineName}</h3>

            <p className={style.brand}>
              {med.brandId?.brandName}
            </p>

            <p>Category : {med.categoryId?.categoryName}</p>
            <p>Type : {med.typeId?.typeName}</p>

            <div className={style.price}>
              ₹ {med.medicinePrice}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AllMedicineList