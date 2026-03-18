import React, { useState } from 'react'
import style from './Sidebar.module.css'
import { Link } from 'react-router'
import {
  AdminPanelSettings,
  Apartment,
  AssignmentLateSharp,
  BrandingWatermark,
  CategoryRounded,
  ExpandLess,
  ExpandMore,
  GroupAdd,
  HomeFilled,
  Layers,
  List,
  LocalShippingOutlined,
  LocationOn,
  Masks,
  MedicalServicesRounded,
  Medication,
  MedicationLiquid,
  Person,
  PersonPin,
  PlaceOutlined,
  ShoppingCart
} from '@mui/icons-material'

const Sidebar = () => {

  const [locationOpen, setLocationOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [regdetails, setRegDetails] = useState(false);

  return (
    <div className={style.sidecontainer}>

      <h3 className={style.side}>SmartMed <span className={style.admin}>Admin</span></h3>

      {/* DASHBOARD */}
      <div className={style.itm1}>
        <Link className={style.itmlink} to="/admin/">
          <HomeFilled /> Dashboard
        </Link>
      </div>

      {/* LOCATION MANAGEMENT */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setLocationOpen(!locationOpen)}
        >
          <LocationOn /> Location
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
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setCatOpen(!catOpen)}
        >
          <CategoryRounded /> Categories
          {catOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {catOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/category" className={style.subLink}>
              <Medication /> Medicine Category
            </Link>
            <Link to="/admin/equiCategory" className={style.subLink}>
              <Masks /> Equipment Category
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

      {/* PRODUCT MANAGEMENT */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setProductOpen(!productOpen)}
        >
          <MedicalServicesRounded /> Products
          {productOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {productOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/addmedicine" className={style.subLink}>
              <MedicationLiquid /> Add Medicine
            </Link>

            <Link to="/admin/addEquipment" className={style.subLink}>
              <Masks /> Add Equipment
            </Link>
          </div>
        )}
      </div>

      {/* ORDER MANAGEMENT */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setOrderOpen(!orderOpen)}
        >
          <ShoppingCart /> Orders
          {orderOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {orderOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/medicineOrdersView" className={style.subLink}>
              <Medication /> Medicine Orders
            </Link>

            <Link to="/admin/equipmentOrderView" className={style.subLink}>
              <Masks /> Equipment Orders
            </Link>
          </div>
        )}
      </div>

      {/* USER REGISTRATION */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setRegOpen(!regOpen)}
        >
          <GroupAdd /> Registration
          {regOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {regOpen && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/adminreg" className={style.subLink}>
              <AdminPanelSettings /> Admin
            </Link>

            <Link to="/admin/inmanagerReg" className={style.subLink}>
              <PersonPin /> Inventory Manager
            </Link>

            <Link to="/admin/deliveryReg" className={style.subLink}>
              <LocalShippingOutlined /> Delivery Team
            </Link>

            <Link to="/admin/representativeReg" className={style.subLink}>
              <Person /> Representative
            </Link>
          </div>
        )}
      </div>

      {/* USER DETAILS */}
      <div className={style.dropdown}>
        <div
          className={style.dropdownHeader}
          onClick={() => setRegDetails(!regdetails)}
        >
          <List /> Registration Details
          {regdetails ? <ExpandLess /> : <ExpandMore />}
        </div>

        {regdetails && (
          <div className={style.dropdownMenu}>
            <Link to="/admin/custdetails" className={style.subLink}>
              Customer Details
            </Link>

            <Link to="/admin/EquiCustdetais" className={style.subLink}>
              Equipment Customers
            </Link>

            <Link to="/admin/inManagerlist" className={style.subLink}>
              Inventory Managers
            </Link>

            <Link to="/admin/replist" className={style.subLink}>
              Representatives
            </Link>

            <Link to="/admin/deliveryTeamList" className={style.subLink}>
              Delivery Team
            </Link>
          </div>
        )}
      </div>

      {/* COMPLAINTS */}
      <div className={style.itm2}>
        <Link className={style.itmlink} to="/admin/complaintview">
          <AssignmentLateSharp /> Medicine Complaints
        </Link>
      </div>

      <div className={style.itm2}>
        <Link className={style.itmlink} to="/admin/equiComplaintView">
          <AssignmentLateSharp /> Equipment Complaints
        </Link>
      </div>

    </div>
  )
}

export default Sidebar