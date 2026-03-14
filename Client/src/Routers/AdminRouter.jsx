import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../Admin/Pages/Dashboard/Dashboard'
import District from '../Admin/Pages/District/District'
import ComplaintView from '../Admin/Pages/CustComplaint/ComplaintView'
import ComplaintReplay from '../Admin/Pages/ComplaintReplay/ComplaintReplay'
import Category from '../Admin/Pages/Category/Category'
import Brand from '../Admin/Pages/Brand/Brand'
import Type from '../Admin/Pages/Type/Type'
import InManagerReg from '../Admin/Pages/InventoryManagerReg/InManagerReg'
import RepresentativeReg from '../Admin/Pages/RepresentativeReg/RepresentativeReg'
import DeliveryReg from '../Admin/Pages/DeliveryReg/DeliveryReg'
import Place from '../Admin/Pages/Place/Place'
import Medicine from '../Admin/Pages/Medicine/Medicine'
import AdminReg from '../Admin/Pages/AdminReg/AdminReg'
import CustomerDetails from '../Admin/Pages/CustomerDetails/CustomerDetails'
import EquipmentCate from '../Admin/Pages/EquipmentCate/EquipmentCate'
import EquiCustomerDetails from '../Admin/Pages/EquiCustomerDetails/EquiCustomerDetails'
import AddEquipments from '../Admin/Pages/Equipments/AddEquipments'
import EquipmentComplaintView from '../Admin/Pages/EquipmentComplaintView/EquipmentComplaintView'
import EquiComplaintReplay from '../Admin/Pages/EquiComplaintReplay/EquiComplaintReplay'
import InventoryManagerList from '../Admin/Pages/InventoryManagerList/InventoryManagerList'
import RepresentativeList from '../Admin/Pages/RepresentativeList/RepresentativeList'
import DeliveryTeamList from '../Admin/Pages/DeliveryTeamList/DeliveryTeamList'
import MedicineOrderView from '../Admin/Pages/MedicineOrderView/MedicineOrderView'
import EquipmentOrderView from '../Admin/Pages/EquipmentOrderView/EquipmentOrderView'


const AdminRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/'  element={<Dashboard/>}/>
            <Route path='district' element={<District/>}/>
            <Route path='place' element={<Place/>}/>

           <Route path='category' element={<Category/>}/>
           <Route path='equiCategory' element={<EquipmentCate/>}/>
            <Route path='brand' element={<Brand/>}/>
            <Route path='type' element={<Type/>}/>
            <Route path='addmedicine' element={<Medicine/>} />
            <Route path='addEquipment' element={<AddEquipments/>} />
            <Route path='inManagerlist' element={<InventoryManagerList/>}/>
            <Route path='replist' element={<RepresentativeList/>}/>
            <Route path='deliveryTeamList' element={<DeliveryTeamList/>}/>

            <Route path='inmanagerReg' element={<InManagerReg/>}/>
            <Route path='representativeReg' element={<RepresentativeReg/>}/>
            <Route path='deliveryReg' element={<DeliveryReg/>}/>
            <Route path='adminreg' element={<AdminReg/>}/>
            <Route path='custdetails' element={<CustomerDetails/>}/>
            <Route path='EquiCustdetais' element={<EquiCustomerDetails/>}/>


            <Route path='complaintview' element={<ComplaintView/>}/>
            <Route path="/ComplaintReplay/:id" element={<ComplaintReplay />} />
            <Route path='/equiComplaintView' element={<EquipmentComplaintView/>}/>
            <Route path='/equiComplaintReplay/:id' element={<EquiComplaintReplay/>}/>
            <Route path='/medicineOrdersView' element={<MedicineOrderView/>}/>
            <Route path='/equipmentOrderView' element={<EquipmentOrderView/>}/>

        </Routes>
    </div>
  )
}

export default AdminRouter 