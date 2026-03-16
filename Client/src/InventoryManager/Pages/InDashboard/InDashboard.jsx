import React, { useEffect, useState } from 'react'
import style from './InDashboard.module.css'

const API = 'http://localhost:5000'

const get = async (url) => {
  try {
    const res = await fetch(`${API}${url}`)
    return await res.json()
  } catch {
    return null
  }
}

// ── Stat card ─────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, accent, icon, delay = 0 }) => (
  <div className={style.kpiCard} style={{ animationDelay: `${delay}ms` }}>
    <div className={style.kpiIcon} style={{ background: accent + '22', color: accent }}>{icon}</div>
    <div>
      <p className={style.kpiLabel}>{label}</p>
      <p className={style.kpiValue}>{value ?? '—'}</p>
      {sub && <p className={style.kpiSub}>{sub}</p>}
    </div>
    <div className={style.kpiAccent} style={{ background: accent }} />
  </div>
)

// ── Horizontal bar ────────────────────────────────────────────────────────
const HBar = ({ label, value, max, color }) => (
  <div className={style.hbarRow}>
    <span className={style.hbarLabel}>{label}</span>
    <div className={style.hbarTrack}>
      <div
        className={style.hbarFill}
        style={{ width: `${Math.round((value / (max || 1)) * 100)}%`, background: color }}
      />
    </div>
    <span className={style.hbarVal}>{value}</span>
  </div>
)

// ── Status badge ──────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    2: ['Paid',       '#f59e0b', '#fef3c7'],
    3: ['Dispatched', '#3b82f6', '#dbeafe'],
    4: ['In Transit', '#8b5cf6', '#ede9fe'],
    5: ['Delivered',  '#10b981', '#d1fae5'],
  }
  const [label, color, bg] = map[status] || ['Unknown', '#94a3b8', '#f1f5f9']
  return (
    <span style={{
      background: bg, color, fontSize: 10, fontWeight: 700,
      padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap'
    }}>{label}</span>
  )
}

// ── Stock level pill ──────────────────────────────────────────────────────
const StockPill = ({ qty }) => {
  const qty_n = parseInt(qty) || 0
  if (qty_n === 0)  return <span className={`${style.pill} ${style.pillOut}`}>Out of Stock</span>
  if (qty_n <= 10)  return <span className={`${style.pill} ${style.pillLow}`}>Low — {qty_n}</span>
  return <span className={`${style.pill} ${style.pillOk}`}>{qty_n} units</span>
}

// ── Section title ─────────────────────────────────────────────────────────
const Sec = ({ title, action, children }) => (
  <div className={style.sec}>
    <div className={style.secHead}>
      <h3 className={style.secTitle}>{title}</h3>
      {action && <span className={style.secAction}>{action}</span>}
    </div>
    {children}
  </div>
)

// ═════════════════════════════════════════════════════════════════════════════
export default function InDashboard() {
  const [medicines,  setMedicines]  = useState([])
  const [equipment,  setEquipment]  = useState([])
  const [medOrders,  setMedOrders]  = useState([])
  const [equOrders,  setEquOrders]  = useState([])
  const [delivery,   setDelivery]   = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    const load = async () => {
      const [medRes, equRes, ordRes, equOrdRes, delRes] = await Promise.all([
        get('/inventoryMedicinesManage'),
        get('/inventoryEquipmentManage'),
        get('/AllOrders'),
        get('/AllEquipmentOrders'),
        get('/AllDeliveryTeam'),
      ])

      setMedicines(medRes?.medicine  || [])
      setEquipment(equRes?.equipment || [])
      setMedOrders(ordRes?.bookings  || [])
      setEquOrders(equOrdRes?.bookings || [])
      setDelivery(delRes?.deliveryTeams || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className={style.loadWrap}>
      <div className={style.spinner} />
      <p className={style.loadTxt}>Loading…</p>
    </div>
  )

  // ── Derived stats ─────────────────────────────────────────────────────
  const totalMedStock   = medicines.reduce((s, m) => s + (parseInt(m.totalStock) || 0), 0)
  const totalEquStock   = equipment.reduce((s, e) => s + (parseInt(e.totalStock) || 0), 0)
  const lowStockMed     = medicines.filter(m => (parseInt(m.totalStock) || 0) <= 10)
  const outOfStockMed   = medicines.filter(m => (parseInt(m.totalStock) || 0) === 0)
  const lowStockEqu     = equipment.filter(e => (parseInt(e.totalStock) || 0) <= 5)

  const pendingOrders   = medOrders.filter(o => o.bookStatus === 2).length
  const dispatchedOrders = medOrders.filter(o => o.bookStatus === 3).length
  const deliveredOrders = medOrders.filter(o => o.bookStatus === 5).length

  const activeDelivery  = delivery.filter(d => d.deliverStatus === 'Active').length

  // top 5 medicines by stock for bar chart
  const top5Med = [...medicines]
    .sort((a, b) => (parseInt(b.totalStock) || 0) - (parseInt(a.totalStock) || 0))
    .slice(0, 5)
  const maxMedStock = parseInt(top5Med[0]?.totalStock) || 1

  const top5Equ = [...equipment]
    .sort((a, b) => (parseInt(b.totalStock) || 0) - (parseInt(a.totalStock) || 0))
    .slice(0, 5)
  const maxEquStock = parseInt(top5Equ[0]?.totalStock) || 1

  const recentMedOrders = [...medOrders]
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, 5)

  const recentEquOrders = [...equOrders]
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, 5)

  return (
    <div className={style.wrap}>

      {/* ── Welcome banner ── */}
      <div className={style.banner}>
        <div>
          <h1 className={style.bannerTitle}>Inventory Dashboard</h1>
          <p className={style.bannerSub}>SmartMed — stock, orders &amp; delivery at a glance</p>
        </div>
        <div className={style.bannerStats}>
          <div className={style.bStat}>
            <span className={style.bVal}>{medicines.length + equipment.length}</span>
            <span className={style.bLab}>Total Products</span>
          </div>
          <div className={style.bStat}>
            <span className={style.bVal}>{medOrders.length + equOrders.length}</span>
            <span className={style.bLab}>Total Orders</span>
          </div>
          <div className={style.bStat}>
            <span className={`${style.bVal} ${style.bRed}`}>{lowStockMed.length + lowStockEqu.length}</span>
            <span className={style.bLab}>Low Stock Alerts</span>
          </div>
        </div>
      </div>

      {/* ── KPI row ── */}
      <div className={style.kpiGrid}>
        <KpiCard label="Total Medicines"    value={medicines.length}   sub={`${outOfStockMed.length} out of stock`}  accent="#0ea5e9" icon="💊" delay={0}   />
        <KpiCard label="Total Equipment"    value={equipment.length}   sub={`${lowStockEqu.length} low stock`}       accent="#8b5cf6" icon="🩺" delay={60}  />
        <KpiCard label="Medicine Stock"     value={totalMedStock}      sub="total units"                             accent="#10b981" icon="📦" delay={120} />
        <KpiCard label="Equipment Stock"    value={totalEquStock}      sub="total units"                             accent="#f59e0b" icon="🗃️" delay={180} />
        <KpiCard label="Pending Orders"     value={pendingOrders}      sub="awaiting dispatch"                       accent="#ef4444" icon="🕐" delay={240} />
        <KpiCard label="Delivery Teams"     value={delivery.length}    sub={`${activeDelivery} active`}             accent="#06b6d4" icon="🚚" delay={300} />
      </div>

      {/* ── Order status + Stock bars ── */}
      <div className={style.midGrid}>

        {/* Order pipeline */}
        <div className={style.card}>
          <h4 className={style.cardTitle}>Medicine Order Pipeline</h4>
          <div className={style.pipeline}>
            {[
              { label: 'Paid / Pending',  value: medOrders.filter(o => o.bookStatus === 2).length, color: '#f59e0b', bg: '#fef3c7' },
              { label: 'Dispatched',      value: medOrders.filter(o => o.bookStatus === 3).length, color: '#3b82f6', bg: '#dbeafe' },
              { label: 'In Transit',      value: medOrders.filter(o => o.bookStatus === 4).length, color: '#8b5cf6', bg: '#ede9fe' },
              { label: 'Delivered',       value: medOrders.filter(o => o.bookStatus === 5).length, color: '#10b981', bg: '#d1fae5' },
            ].map((s, i) => (
              <div key={i} className={style.pipeStep} style={{ background: s.bg }}>
                <span className={style.pipeNum} style={{ color: s.color }}>{s.value}</span>
                <span className={style.pipeLab} style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>

          <h4 className={style.cardTitle} style={{ marginTop: 20 }}>Equipment Order Pipeline</h4>
          <div className={style.pipeline}>
            {[
              { label: 'Paid / Pending',  value: equOrders.filter(o => o.bookStatus === 2).length, color: '#f59e0b', bg: '#fef3c7' },
              { label: 'Dispatched',      value: equOrders.filter(o => o.bookStatus === 3).length, color: '#3b82f6', bg: '#dbeafe' },
              { label: 'In Transit',      value: equOrders.filter(o => o.bookStatus === 4).length, color: '#8b5cf6', bg: '#ede9fe' },
              { label: 'Delivered',       value: equOrders.filter(o => o.bookStatus === 5).length, color: '#10b981', bg: '#d1fae5' },
            ].map((s, i) => (
              <div key={i} className={style.pipeStep} style={{ background: s.bg }}>
                <span className={style.pipeNum} style={{ color: s.color }}>{s.value}</span>
                <span className={style.pipeLab} style={{ color: s.color }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top medicine stock */}
        <div className={style.card}>
          <h4 className={style.cardTitle}>Top Medicine Stock</h4>
          <div className={style.hbars}>
            {top5Med.length === 0
              ? <p className={style.empty}>No medicines found</p>
              : top5Med.map((m, i) => (
                <HBar
                  key={i}
                  label={m.medicineName}
                  value={parseInt(m.totalStock) || 0}
                  max={maxMedStock}
                  color="#0ea5e9"
                />
              ))}
          </div>

          <h4 className={style.cardTitle} style={{ marginTop: 20 }}>Top Equipment Stock</h4>
          <div className={style.hbars}>
            {top5Equ.length === 0
              ? <p className={style.empty}>No equipment found</p>
              : top5Equ.map((e, i) => (
                <HBar
                  key={i}
                  label={e.equipmentName}
                  value={parseInt(e.totalStock) || 0}
                  max={maxEquStock}
                  color="#8b5cf6"
                />
              ))}
          </div>
        </div>

      </div>

      {/* ── Low stock alerts ── */}
      {(lowStockMed.length > 0 || lowStockEqu.length > 0) && (
        <Sec title="⚠️ Low Stock Alerts">
          <div className={style.alertGrid}>
            {[...lowStockMed.slice(0, 4).map(m => ({ ...m, type: 'medicine', name: m.medicineName })),
              ...lowStockEqu.slice(0, 4).map(e => ({ ...e, type: 'equipment', name: e.equipmentName }))
            ].map((item, i) => (
              <div key={i} className={style.alertCard}>
                <img
                  src={`http://localhost:5000${item.medicinePhoto || item.equipmentPhoto}`}
                  alt={item.name}
                  className={style.alertImg}
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className={style.alertInfo}>
                  <p className={style.alertName}>{item.name}</p>
                  <p className={style.alertType}>{item.type === 'medicine' ? '💊 Medicine' : '🩺 Equipment'}</p>
                  <StockPill qty={item.totalStock} />
                </div>
              </div>
            ))}
          </div>
        </Sec>
      )}

      {/* ── Recent orders ── */}
      <div className={style.ordersGrid}>

        <Sec title="Recent Medicine Orders">
          <div className={style.tableWrap}>
            {recentMedOrders.length === 0
              ? <p className={style.empty}>No orders yet</p>
              : (
                <table className={style.table}>
                  <thead>
                    <tr>
                      {['Store', 'Date', 'Items', 'Status'].map(h =>
                        <th key={h} className={style.th}>{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recentMedOrders.map((o, i) => (
                      <tr key={i} className={style.tr}>
                        <td className={`${style.td} ${style.tdBold}`}>{o.customerStoreName || '—'}</td>
                        <td className={style.td}>
                          {o.bookingDate ? new Date(o.bookingDate).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className={style.td}>{o.medicines?.length || 0}</td>
                        <td className={style.td}><Badge status={o.bookStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </Sec>

        <Sec title="Recent Equipment Orders">
          <div className={style.tableWrap}>
            {recentEquOrders.length === 0
              ? <p className={style.empty}>No orders yet</p>
              : (
                <table className={style.table}>
                  <thead>
                    <tr>
                      {['Store', 'Date', 'Items', 'Status'].map(h =>
                        <th key={h} className={style.th}>{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recentEquOrders.map((o, i) => (
                      <tr key={i} className={style.tr}>
                        <td className={`${style.td} ${style.tdBold}`}>{o.customerStoreName || '—'}</td>
                        <td className={style.td}>
                          {o.bookingDate ? new Date(o.bookingDate).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className={style.td}>{o.equipment?.length || 0}</td>
                        <td className={style.td}><Badge status={o.bookStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </Sec>

      </div>

    </div>
  )
}