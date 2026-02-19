import React from 'react'
import { Route, Routes } from 'react-router'
import IMyprofile from '../InventoryManager/Pages/IMyProfile/IMyprofile'
import ProductAdd from '../InventoryManager/Pages/ProductAdd/ProductAdd'
import StockManage from '../InventoryManager/Pages/StockManage/StockManage'
import AddStock from '../InventoryManager/Pages/AddStock/AddStock'
import MedicineOrders from '../InventoryManager/Pages/MedicineOrders/MedicineOrders'
import AllOrders from '../InventoryManager/Pages/AllOrders/AllOrders'
import DeliveryTeamAssign from '../InventoryManager/Pages/DeliveryTeamAssign/DeliveryTeamAssign'
import EquipmentStockManage from '../InventoryManager/Pages/EquipmentStockManage/EquipmentStockManage'
import AddEquiStock from '../InventoryManager/Pages/AddEquipmentStock/AddEquiStock'

const InventoryRouter = () => {
  return (
    <div>
        <Routes>
          <Route path='imyprofile' element={<IMyprofile/>} />
          <Route path='addproduct' element={<ProductAdd/>}/>
          <Route path='stockmanage' element={<StockManage/>}/>
          <Route path='updatestock/:id' element={<AddStock/>}/>
          <Route path='allorders' element={<AllOrders/>}/>
          <Route path='medicineorders/:id' element={<MedicineOrders/>}/>
          <Route path='deliveryteamAssign/:bookid' element={<DeliveryTeamAssign/>}/>
          <Route path='equipmentstockmanage' element={<EquipmentStockManage/>}/>
          <Route path='addequipmentstock/:id' element={<AddEquiStock/>}/>



        </Routes>
    </div>
  )
}

export default InventoryRouter