import React from 'react'
import style from  './Sidebar.module.css'
import { Link } from 'react-router'
import { AdminPanelSettings, Apartment, Assignment, AssignmentLateSharp, BrandingWatermark, CategoryRounded, ExpandLess, ExpandMore, GroupAdd, HomeFilled, Layers, List, LocalShippingOutlined, LocationOn, Masks, MedicalServices, MedicalServicesRounded, Medication, MedicationLiquid, Person, PersonPin, PlaceOutlined } from '@mui/icons-material'
import { useState } from 'react'


const Sidebar = () => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const[regdetails,setRegDetails]=useState(false);
  const [catOpen, setCatOpen] = useState(false);
 const [productOpen, setProductOpen] = useState(false);

  return (
        <div className={style.sidecontainer}>
      <h3 className={style.side}>SmartMed</h3>

      {/* Dashboard */}
      <div className={style.itm1}>
        <Link className={style.itmlink} to="/admin/">
          <HomeFilled className={style.homeic} />
          Dashboard
        </Link>
      </div>

      {/* LOCATION DROPDOWN */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setLocationOpen(!locationOpen)}
        >
          <LocationOn />
          Location
          {locationOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {locationOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/district" className={style.subLink}>
              <Apartment /> District
            </Link>
            <Link to="/admin/place" className={style.subLink}>
              <PlaceOutlined /> Place
            </Link>
          </div>
        )}
      </div>

      {/* MASTER DATA */}
      {/* ADD CATEGORY DROPDOWN */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setCatOpen(!catOpen)}
        >
          <CategoryRounded />
          Add Category
          {catOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {catOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/category" className={style.subLink}>
              <Medication/> Medicine Category
            </Link>

            <Link to="/admin/equiCategory" className={style.subLink}>
              <Masks/> Equipment Category
            </Link>
          </div>
        )}
      </div>


      <div className={style.itm2}>
        <Link className={style.itmlink} to="/admin/brand">
          <BrandingWatermark /> Brand
        </Link>
      </div>

      <div className={style.itm2}>
        <Link className={style.itmlink} to="/admin/type">
          <Layers /> Type
        </Link>
      </div>

      {/* ADD PRODUCTS DROPDOWN */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setProductOpen(!productOpen)}
        >
          <MedicalServicesRounded />
          Add Products
          {productOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {productOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/addmedicine" className={style.subLink}>
              <MedicationLiquid/> Medicine
            </Link>

            <Link to="/admin/addEquipment" className={style.subLink}>
              <Masks/> Add Equipment
            </Link>
          </div>
        )}
      </div>


      {/* REGISTRATION DROPDOWN */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setRegOpen(!regOpen)}
        >
          <GroupAdd />
          Registration
          {regOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {regOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/adminreg" className={style.subLink}>
              <AdminPanelSettings /> Admin
            </Link>
            <Link to="/admin/inmanagerReg" className={style.subLink}>
              <PersonPin /> Manager
            </Link>
            <Link to="/admin/deliveryReg" className={style.subLink}>
              <LocalShippingOutlined /> Delivery
            </Link>
            <Link to="/admin/representativeReg" className={style.subLink}>
              <Person /> Representative
            </Link>
          </div>
        )}
      </div>

      {/* Details Dropdown */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setRegDetails(!regdetails)}
        >
          <GroupAdd />
          Registration Details
          {regdetails ? <ExpandLess /> : <ExpandMore />}
        </div>

        {regdetails && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/custdetails" className={style.subLink}>
              <AdminPanelSettings /> Customer Details
            </Link>
            <Link to="/admin/EquiCustdetais" className={style.subLink}>
              <List/> Equipment Customer
            </Link>
          </div>
        )}
      </div>


      {/* Complaints */}
      <div className={style.itm2}>
        <Link className={style.itmlink} to="/admin/complaintview">
          <AssignmentLateSharp /> Complaint View
        </Link>
      </div>

      <div className={style.itm2}>
        <Link className={style.itmlink} to="/admin/complaintreplay">
          <Assignment /> Complaint Replay
        </Link>
      </div>
    </div>


  )
}

export default Sidebar