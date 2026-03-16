import React, { useEffect, useState } from 'react'
import style from './RDashboard.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'

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
const KpiCard = ({ label, value, sub, accent, Icon, delay = 0 }) => (
  <div className={style.kpiCard} style={{ animationDelay: `${delay}ms` }}>
    <div className={style.kpiIconWrap} style={{ background: accent + '18' }}>
      <Icon style={{ fontSize: 26, color: accent }} />
    </div>
    <div className={style.kpiBody}>
      <p className={style.kpiLabel}>{label}</p>
      <p className={style.kpiValue}>{value ?? '—'}</p>
      {sub && <p className={style.kpiSub}>{sub}</p>}
    </div>
    <div className={style.kpiAccent} style={{ background: accent }} />
  </div>
)

// ── Status badge ──────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const s = Number(status)
  const map = {
    2: ['Paid',       '#f59e0b', '#fef3c7'],
    3: ['Dispatched', '#3b82f6', '#dbeafe'],
    4: ['In Transit', '#8b5cf6', '#ede9fe'],
    5: ['Delivered',  '#22c55e', '#dcfce7'],
  }
  const [label, color, bg] = map[s] || ['Unknown', '#94a3b8', '#f1f5f9']
  return (
    <span style={{
      background: bg, color, fontSize: 10, fontWeight: 700,
      padding: '3px 9px', borderRadius: 99, whiteSpace: 'nowrap'
    }}>
      {label}
    </span>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function RDashboard() {

  // ── Rep ID from sessionStorage key 'rid' ─────────────────────────────
  const repId   = sessionStorage.getItem('rid')
  const repName = sessionStorage.getItem('repName') || 'Representative'

  const [orders,    setOrders]    = useState([])
  const [medicines, setMedicines] = useState([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    const load = async () => {
      const [ordRes, medRes] = await Promise.all([
        repId ? get(`/RepAssignedOrders/${repId}`) : Promise.resolve(null),
        get('/representativeMedicinesList'),
      ])
      setOrders(ordRes?.assignedOrders || [])
      setMedicines(medRes?.medicines   || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className={style.loadWrap}>
      <div className={style.spinner} />
      <p className={style.loadTxt}>Loading dashboard…</p>
    </div>
  )

  // ── De-duplicate: backend returns one row per medicine per booking ─────
  const uniqueOrders = Object.values(
    orders.reduce((acc, row) => {
      const key = String(row.bookingId)
      if (!acc[key]) {
        acc[key] = {
          bookingId:         row.bookingId,
          bookStatus:        Number(row.bookStatus),
          bookAmount:        parseFloat(row.bookAmount) || 0,
          customerStoreName: row.customerStoreName,
          customerAddress:   row.customerAddress,
          customerPhone:     row.customerPhone,
          bookingDate:       row.bookingDate,
          items:             [],
          totalAmt:          0,
        }
      }
      const itemAmt = parseFloat(row.itemAmount) || 0
      acc[key].items.push({
        medicineName:  row.medicineName,
        medicinePhoto: row.medicinePhoto,
        quantity:      row.quantity,
        itemAmount:    itemAmt,
      })
      acc[key].totalAmt += itemAmt
      return acc
    }, {})
  ).sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))

  // ── Stats ──────────────────────────────────────────────────────────────
  const totalOrders      = uniqueOrders.length
  const paidOrders       = uniqueOrders.filter(o => o.bookStatus === 2).length
  const dispatchedOrders = uniqueOrders.filter(o => o.bookStatus === 3).length
  const inTransit        = uniqueOrders.filter(o => o.bookStatus === 4).length
  const deliveredOrders  = uniqueOrders.filter(o => o.bookStatus === 5).length
  const totalRevenue     = uniqueOrders.reduce((s, o) =>
    s + (o.totalAmt > 0 ? o.totalAmt : o.bookAmount), 0)

  const recentOrders = uniqueOrders.slice(0, 6)

  return (
    <div className={style.wrap}>

      {/* ── Welcome banner ── */}
      <div className={style.banner}>
        <div className={style.bannerLeft}>
          <p className={style.bannerGreet}>Welcome back,</p>
          <h1 className={style.bannerName}>{repName}</h1>
          <p className={style.bannerSub}>Here's your sales overview</p>
        </div>
        <div className={style.bannerRight}>
          <div className={style.bPill}>
            <span className={style.bVal}>{totalOrders}</span>
            <span className={style.bLab}>Total Orders</span>
          </div>
          <div className={style.bPill}>
            <span className={style.bVal}>{medicines.length}</span>
            <span className={style.bLab}>Medicines</span>
          </div>
          <div className={style.bPill}>
            <span className={`${style.bVal} ${style.bGreen}`}>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className={style.bLab}>Total Value</span>
          </div>
        </div>
      </div>

      {/* ── KPI cards ── */}
      <div className={style.kpiGrid}>
        <KpiCard label="Total Orders"  value={totalOrders}      sub="all assigned"      accent="#22c55e" Icon={ShoppingCartIcon}  delay={0}   />
        <KpiCard label="Paid"          value={paidOrders}       sub="awaiting dispatch" accent="#f59e0b" Icon={PendingIcon}       delay={60}  />
        <KpiCard label="Dispatched"    value={dispatchedOrders} sub="sent out"          accent="#3b82f6" Icon={LocalShippingIcon} delay={120} />
        <KpiCard label="In Transit"    value={inTransit}        sub="on the way"        accent="#8b5cf6" Icon={LocalShippingIcon} delay={180} />
        <KpiCard label="Delivered"     value={deliveredOrders}  sub="completed"         accent="#10b981" Icon={CheckCircleIcon}   delay={240} />
        <KpiCard
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          sub="order value"
          accent="#ef4444"
          Icon={CurrencyRupeeIcon}
          delay={300}
        />
      </div>

      {/* ── Pipeline + Medicines ── */}
      <div className={style.midGrid}>

        <div className={style.card}>
          <h4 className={style.cardTitle}>Order Pipeline</h4>
          <div className={style.pipeline}>
            {[
              { label: 'Paid',       value: paidOrders,       color: '#f59e0b', bg: '#fef3c7' },
              { label: 'Dispatched', value: dispatchedOrders, color: '#3b82f6', bg: '#dbeafe' },
              { label: 'In Transit', value: inTransit,        color: '#8b5cf6', bg: '#ede9fe' },
              { label: 'Delivered',  value: deliveredOrders,  color: '#22c55e', bg: '#dcfce7' },
            ].map((s, i) => (
              <div key={i} className={style.pipeStep} style={{ background: s.bg }}>
                <span className={style.pipeNum} style={{ color: s.color }}>{s.value}</span>
                <span className={style.pipeLab} style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={style.card}>
          <h4 className={style.cardTitle}>Medicine Catalogue</h4>
          {medicines.length === 0
            ? <p className={style.emptyTxt}>No medicines found</p>
            : (
              <div className={style.medGrid}>
                {medicines.slice(0, 6).map((m, i) => (
                  <div key={i} className={style.medItem}>
                    <img
                      src={`${API}${m.medicinePhoto}`}
                      alt={m.medicineName}
                      className={style.medImg}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className={style.medInfo}>
                      <p className={style.medName}>{m.medicineName}</p>
                      <p className={style.medPrice}>₹{m.medicinePrice}</p>
                      <p className={style.medBrand}>
                        {m.brandId?.brandName || m.brandName || ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

      </div>

      {/* ── Recent orders table ── */}
      <div className={style.sec}>
        <div className={style.secHead}>
          <h3 className={style.secTitle}>Recent Customer Orders</h3>
          <span className={style.secCount}>{totalOrders} total</span>
        </div>

        <div className={style.tableWrap}>
          {recentOrders.length === 0
            ? <p className={style.emptyTxt}>
                {!repId ? '⚠️ Rep session not found — please log in again' : 'No orders assigned yet'}
              </p>
            : (
              <table className={style.table}>
                <thead>
                  <tr>
                    {['Store', 'Address', 'Phone', 'Items', 'Amount', 'Date', 'Status'].map(h => (
                      <th key={h} className={style.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o, i) => (
                    <tr key={i} className={style.tr}>
                      <td className={`${style.td} ${style.tdBold}`}>{o.customerStoreName || '—'}</td>
                      <td className={style.td}>{o.customerAddress || '—'}</td>
                      <td className={style.td}>{o.customerPhone || '—'}</td>
                      <td className={style.td}>{o.items?.length || 0}</td>
                      <td className={`${style.td} ${style.tdAmt}`}>
                        ₹{(o.totalAmt > 0 ? o.totalAmt : o.bookAmount).toLocaleString('en-IN')}
                      </td>
                      <td className={style.td}>
                        {o.bookingDate
                          ? new Date(o.bookingDate).toLocaleDateString('en-IN')
                          : '—'}
                      </td>
                      <td className={style.td}><Badge status={o.bookStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>

    </div>
  )
}