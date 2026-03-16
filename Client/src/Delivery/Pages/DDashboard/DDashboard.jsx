import React, { useEffect, useState } from 'react'
import style from './DDashboard.module.css'
import {
  LocalShippingOutlined,
  AssignmentTurnedInOutlined,
  PendingActionsOutlined,
  InventoryOutlined
} from '@mui/icons-material'

const API = 'http://localhost:5000'

const get = async (url) => {
  try {
    const res = await fetch(`${API}${url}`)
    return await res.json()
  } catch {
    return null
  }
}

// ── KPI Card ──────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, accent, icon: Icon, delay = 0 }) => (
  <div className={style.kpiCard} style={{ animationDelay: `${delay}ms` }}>
    <div className={style.kpiLeft}>
      <p className={style.kpiLabel}>{label}</p>
      <p className={style.kpiValue}>{value ?? '—'}</p>
      {sub && <p className={style.kpiSub}>{sub}</p>}
    </div>
    <div className={style.kpiIconWrap} style={{ background: accent + '18' }}>
      <Icon style={{ fontSize: 28, color: accent }} />
    </div>
    <div className={style.kpiBar} style={{ background: accent }} />
  </div>
)

// ── Status badge ──────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    3: ['Assigned',  '#3b82f6', '#dbeafe'],
    4: ['Picked Up', '#8b5cf6', '#ede9fe'],
    5: ['Delivered', '#10b981', '#d1fae5'],
  }
  const [label, color, bg] = map[status] || ['Unknown', '#94a3b8', '#f1f5f9']
  return (
    <span style={{
      background: bg, color, fontSize: 10, fontWeight: 700,
      padding: '3px 9px', borderRadius: 99, whiteSpace: 'nowrap'
    }}>
      {label}
    </span>
  )
}

// ── Order Card ────────────────────────────────────────────────────────────
const OrderCard = ({ order, type, onAccept, onComplete }) => {
  const isEquipment = type === 'equipment'
  const items     = isEquipment ? (order.equipment || []) : (order.medicines || [])
  const itemLabel = isEquipment ? 'equipment' : 'medicines'

  return (
    <div className={style.orderCard}>
      <div className={style.orderCardHead}>
        <div>
          <p className={style.orderStore}>{order.customerStoreName || '—'}</p>
          <p className={style.orderAddr}>{order.customerAddress || '—'}</p>
        </div>
        <Badge status={order.bookStatus} />
      </div>

      <div className={style.orderMeta}>
        <span>📞 {order.customerPhone || '—'}</span>
        <span>📦 {items.length} {itemLabel}</span>
        <span>💰 ₹{Number(order.bookAmount || 0).toLocaleString('en-IN')}</span>
      </div>

      {items.length > 0 && (
        <div className={style.itemList}>
          {items.slice(0, 3).map((item, i) => (
            <div key={i} className={style.itemRow}>
              <img
                src={`${API}${isEquipment ? item.equipmentPhoto : item.medicinePhoto}`}
                alt=""
                className={style.itemImg}
                onError={e => { e.target.style.display = 'none' }}
              />
              <span className={style.itemName}>
                {isEquipment ? item.equipmentName : item.medicineName}
              </span>
              <span className={style.itemQty}>×{item.quantity}</span>
            </div>
          ))}
          {items.length > 3 && (
            <p className={style.moreItems}>+{items.length - 3} more items</p>
          )}
        </div>
      )}

      <div className={style.orderActions}>
        {order.bookStatus === 3 && (
          <button className={style.btnAccept} onClick={() => onAccept(order.bookingId)}>
            Accept &amp; Pick Up
          </button>
        )}
        {order.bookStatus === 4 && (
          <button className={style.btnComplete} onClick={() => onComplete(order.bookingId)}>
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  )
}

// ── Completed row ─────────────────────────────────────────────────────────
const CompletedRow = ({ order, type }) => {
  const isEquipment = type === 'equipment'
  const items    = isEquipment ? (order.equipments || []) : (order.medicines || [])
  const totalAmt = items.reduce((s, i) => s + (parseFloat(i.itemAmount) || 0), 0)

  return (
    <tr className={style.tr}>
      <td className={`${style.td} ${style.tdBold}`}>{order.customerStoreName || '—'}</td>
      <td className={style.td}>{order.customerAddress || '—'}</td>
      <td className={style.td}>{items.length}</td>
      <td className={style.td}>₹{totalAmt.toLocaleString('en-IN')}</td>
      <td className={style.td}>
        {order.bookingDate ? new Date(order.bookingDate).toLocaleDateString('en-IN') : '—'}
      </td>
      <td className={style.td}>
        <span style={{
          background: '#d1fae5', color: '#065f46', fontSize: 10,
          fontWeight: 700, padding: '3px 9px', borderRadius: 99
        }}>
          Delivered
        </span>
      </td>
    </tr>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function DDashboard() {

  // ── Read delivery ID from sessionStorage ─────────────────────────────
  // Your login page must store: sessionStorage.setItem('did', data.id)
  const deliveryId = sessionStorage.getItem('did')

  const [assignedMed,  setAssignedMed]  = useState([])
  const [assignedEqu,  setAssignedEqu]  = useState([])
  const [completedMed, setCompletedMed] = useState([])
  const [completedEqu, setCompletedEqu] = useState([])
  const [loading,      setLoading]      = useState(true)
  const [activeTab,    setActiveTab]    = useState('medicine')
  const [completedTab, setCompletedTab] = useState('medicine')

  const loadData = async () => {
    if (!deliveryId) return setLoading(false)

    const [aMed, aEqu, cMed, cEqu] = await Promise.all([
      get(`/AssignedOrders/${deliveryId}`),
      get(`/AssignedEquipmentOrder/${deliveryId}`),
      get(`/CompletedMedicineOrders/${deliveryId}`),
      get(`/CompletedEquipmentOrders/${deliveryId}`),
    ])

    setAssignedMed(aMed?.assignedOrders   || [])
    setAssignedEqu(aEqu?.assignedOrders   || [])
    setCompletedMed(cMed?.completedOrders || [])
    setCompletedEqu(cEqu?.completedOrders || [])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleAccept   = async (id) => {
    await fetch(`${API}/UpdateDeliveryStatus/${id}`, { method: 'PUT' })
    loadData()
  }
  const handleComplete = async (id) => {
    await fetch(`${API}/CompleteDelivery/${id}`, { method: 'PUT' })
    loadData()
  }

  if (loading) return (
    <div className={style.loadWrap}>
      <div className={style.spinner} />
      <p className={style.loadTxt}>Loading dashboard…</p>
    </div>
  )

  // ── De-duplicate assigned orders (backend returns one row per item) ────
  const uniqueAssignedMed = Object.values(
    assignedMed.reduce((acc, o) => {
      const key = String(o.bookingId)
      if (!acc[key]) acc[key] = { ...o, medicines: [] }
      acc[key].medicines.push({
        medicineName:  o.medicineName,
        medicinePhoto: o.medicinePhoto,
        quantity:      o.quantity,
      })
      return acc
    }, {})
  )

  const uniqueAssignedEqu = Object.values(
    assignedEqu.reduce((acc, o) => {
      const key = String(o.bookingId)
      if (!acc[key]) acc[key] = { ...o, equipment: [] }
      acc[key].equipment.push({
        equipmentName:  o.equipmentName,
        equipmentPhoto: o.equipmentPhoto,
        quantity:       o.quantity,
      })
      return acc
    }, {})
  )

  // ── Stats ─────────────────────────────────────────────────────────────
  const totalAssigned  = uniqueAssignedMed.length + uniqueAssignedEqu.length
  const totalCompleted = completedMed.length      + completedEqu.length

  const pendingPickup = uniqueAssignedMed.filter(o => o.bookStatus === 3).length
                      + uniqueAssignedEqu.filter(o => o.bookStatus === 3).length
  const inTransit     = uniqueAssignedMed.filter(o => o.bookStatus === 4).length
                      + uniqueAssignedEqu.filter(o => o.bookStatus === 4).length

  const totalEarnings = [
    ...completedMed.flatMap(o => o.medicines  || []),
    ...completedEqu.flatMap(o => o.equipments || []),
  ].reduce((s, i) => s + (parseFloat(i.itemAmount) || 0), 0)

  return (
    <div className={style.wrap}>

      {/* ── Banner ── */}
      <div className={style.banner}>
        <div>
          <h1 className={style.bannerTitle}>Delivery Dashboard</h1>
          <p className={style.bannerSub}>Track your assigned orders and delivery progress</p>
        </div>
        <div className={style.bannerPills}>
          <div className={style.bPill}>
            <span className={style.bVal}>{totalAssigned}</span>
            <span className={style.bLab}>Active Orders</span>
          </div>
          <div className={style.bPill}>
            <span className={style.bVal}>{totalCompleted}</span>
            <span className={style.bLab}>Completed</span>
          </div>
          <div className={style.bPill}>
            <span className={`${style.bVal} ${style.bGreen}`}>
              ₹{totalEarnings.toLocaleString('en-IN')}
            </span>
            <span className={style.bLab}>Total Delivered Value</span>
          </div>
        </div>
      </div>

      {/* ── KPI cards ── */}
      <div className={style.kpiGrid}>
        <KpiCard label="Assigned Medicine"   value={uniqueAssignedMed.length} sub="orders"          accent="#3b82f6" icon={LocalShippingOutlined}      delay={0}   />
        <KpiCard label="Assigned Equipment"  value={uniqueAssignedEqu.length} sub="orders"          accent="#8b5cf6" icon={InventoryOutlined}          delay={60}  />
        <KpiCard label="Pending Pickup"      value={pendingPickup}            sub="awaiting pickup" accent="#f59e0b" icon={PendingActionsOutlined}     delay={120} />
        <KpiCard label="In Transit"          value={inTransit}               sub="on the way"      accent="#ef4444" icon={LocalShippingOutlined}      delay={180} />
        <KpiCard label="Medicine Delivered"  value={completedMed.length}     sub="all time"        accent="#10b981" icon={AssignmentTurnedInOutlined} delay={240} />
        <KpiCard label="Equipment Delivered" value={completedEqu.length}     sub="all time"        accent="#06b6d4" icon={AssignmentTurnedInOutlined} delay={300} />
      </div>

      {/* ── Assigned Orders ── */}
      <div className={style.sec}>
        <div className={style.secHead}>
          <h3 className={style.secTitle}>Assigned Orders</h3>
          <div className={style.tabs}>
            <button
              className={`${style.tab} ${activeTab === 'medicine' ? style.tabActive : ''}`}
              onClick={() => setActiveTab('medicine')}
            >
              💊 Medicine ({uniqueAssignedMed.length})
            </button>
            <button
              className={`${style.tab} ${activeTab === 'equipment' ? style.tabActive : ''}`}
              onClick={() => setActiveTab('equipment')}
            >
              🩺 Equipment ({uniqueAssignedEqu.length})
            </button>
          </div>
        </div>

        <div className={style.cardsGrid}>
          {activeTab === 'medicine' && (
            uniqueAssignedMed.length === 0
              ? <div className={style.emptyBox}>No assigned medicine orders</div>
              : uniqueAssignedMed.map((o, i) => (
                <OrderCard key={i} order={o} type="medicine"
                  onAccept={handleAccept} onComplete={handleComplete} />
              ))
          )}
          {activeTab === 'equipment' && (
            uniqueAssignedEqu.length === 0
              ? <div className={style.emptyBox}>No assigned equipment orders</div>
              : uniqueAssignedEqu.map((o, i) => (
                <OrderCard key={i} order={o} type="equipment"
                  onAccept={handleAccept} onComplete={handleComplete} />
              ))
          )}
        </div>
      </div>

      {/* ── Completed Orders ── */}
      <div className={style.sec}>
        <div className={style.secHead}>
          <h3 className={style.secTitle}>Completed Deliveries</h3>
          <div className={style.tabs}>
            <button
              className={`${style.tab} ${completedTab === 'medicine' ? style.tabActive : ''}`}
              onClick={() => setCompletedTab('medicine')}
            >
              💊 Medicine ({completedMed.length})
            </button>
            <button
              className={`${style.tab} ${completedTab === 'equipment' ? style.tabActive : ''}`}
              onClick={() => setCompletedTab('equipment')}
            >
              🩺 Equipment ({completedEqu.length})
            </button>
          </div>
        </div>

        <div className={style.tableWrap}>
          {(completedTab === 'medicine' ? completedMed : completedEqu).length === 0
            ? <p className={style.emptyTxt}>No completed deliveries yet</p>
            : (
              <table className={style.table}>
                <thead>
                  <tr>
                    {['Store', 'Address', 'Items', 'Amount', 'Date', 'Status'].map(h => (
                      <th key={h} className={style.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(completedTab === 'medicine' ? completedMed : completedEqu).map((o, i) => (
                    <CompletedRow key={i} order={o} type={completedTab} />
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>

    </div>
  )
}