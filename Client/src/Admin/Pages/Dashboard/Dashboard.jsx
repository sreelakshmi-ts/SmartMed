import React, { useEffect, useState } from 'react'
import style from './Dashboard.module.css'

const API = 'http://localhost:5000'

const fetchData = async (url) => {
  try {
    const res = await fetch(`${API}${url}`)
    return await res.json()
  } catch {
    return null
  }
}

// ── Mini bar chart (pure CSS) ─────────────────────────────────────────────
const BarChart = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className={style.barChart}>
      {data.map((d, i) => (
        <div key={i} className={style.barCol}>
          <span className={style.barNum}>{d.value}</span>
          <div
            className={style.bar}
            style={{
              height: `${Math.round((d.value / max) * 72)}px`,
              background: color,
              minHeight: d.value ? 4 : 0,
            }}
          />
          <span className={style.barLabel}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Donut chart (SVG) ────────────────────────────────────────────────────
const DonutChart = ({ segments }) => {
  const r = 36, cx = 55, cy = 55
  const total = segments.reduce((s, d) => s + d.value, 0) || 1
  let cursor = -Math.PI / 2
  const arcs = segments.map(seg => {
    const angle = (seg.value / total) * 2 * Math.PI
    const x1 = cx + r * Math.cos(cursor), y1 = cy + r * Math.sin(cursor)
    cursor += angle
    const x2 = cx + r * Math.cos(cursor), y2 = cy + r * Math.sin(cursor)
    const large = angle > Math.PI ? 1 : 0
    return { ...seg, d: `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z` }
  })
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} opacity={0.9} />)}
      <circle cx={cx} cy={cy} r={22} fill="#fff" />
      <text x={cx} y={cx + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0f172a">{total}</text>
    </svg>
  )
}

// ── Status badge ─────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    2: ['Paid',       style.badgePaid],
    3: ['Dispatched', style.badgeDispatched],
    4: ['In Transit', style.badgeTransit],
    5: ['Delivered',  style.badgeDelivered],
  }
  const [label, cls] = map[status] || ['Unknown', style.badgePaid]
  return <span className={`${style.badge} ${cls}`}>{label}</span>
}

// ── Stat card ────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, iconBg, icon, delay = 0 }) => (
  <div className={style.statCard} style={{ animationDelay: `${delay}ms` }}>
    <div className={style.statIcon} style={{ background: iconBg }}>{icon}</div>
    <div className={style.statBody}>
      <p className={style.statLabel}>{label}</p>
      <p className={style.statValue}>{value ?? '—'}</p>
      {sub && <p className={style.statSub}>{sub}</p>}
    </div>
  </div>
)

// ── Section wrapper ──────────────────────────────────────────────────────
const Section = ({ title, children }) => (
  <div className={style.section}>
    <h3 className={style.sectionTitle}>
      <span className={style.sectionBar} />
      {title}
    </h3>
    {children}
  </div>
)

// ════════════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const [stats, setStats]         = useState({})
  const [medOrders, setMedOrders] = useState([])
  const [equOrders, setEquOrders] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const load = async () => {
      const [
        custRes, equCustRes, mgrRes, repRes, delRes,
        medRes, equRes,
      ] = await Promise.all([
        fetchData('/Customer'),
        fetchData('/EquipmentCustomer'),
        fetchData('/inventoryManagersAdmin'),
        fetchData('/representativesAdmin'),
        fetchData('/deliveryTeamsAdmin'),
        fetchData('/adminAllMedicineOrders'),
        fetchData('/adminAllequipmentOrders'),
      ])

      const customers = custRes?.customer             || []
      const equCust   = equCustRes?.equipmentcustomer || []
      const managers  = mgrRes?.data                  || []
      const reps      = repRes?.data                  || []
      const delivery  = delRes?.data                  || []
      const mOrders   = medRes?.bookings              || []
      const eOrders   = equRes?.bookings              || []

      // ── Revenue ──────────────────────────────────────────────────────
      // The backend aggregation returns totalAmount: { $first: "$bookAmount" }
      // on each booking. We simply sum that field directly.
      const medRev = mOrders.reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0)
      const equRev = eOrders.reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0)
      // ─────────────────────────────────────────────────────────────────

      setStats({
        customers:      customers.length,
        pendingCust:    customers.filter(c => c.customerStatus === 'Pending').length,
        equCustomers:   equCust.length,
        pendingEquCust: equCust.filter(c => c.customerStatus === 'Pending').length,
        managers:       managers.length,
        activeMgr:      managers.filter(m => m.InManagerStatus === 'Active').length,
        reps:           reps.length,
        activeReps:     reps.filter(r => r.repStatus === 'Active').length,
        delivery:       delivery.length,
        activeDel:      delivery.filter(d => d.deliverStatus === 'Active').length,
        medOrders:      mOrders.length,
        equOrders:      eOrders.length,
        medRev:         medRev.toFixed(0),
        equRev:         equRev.toFixed(0),
        mStatus:        [2, 3, 4, 5].map(s => mOrders.filter(o => o.bookStatus === s).length),
        eStatus:        [2, 3, 4, 5].map(s => eOrders.filter(o => o.bookStatus === s).length),
      })

      setMedOrders(mOrders.slice(0, 6))
      setEquOrders(eOrders.slice(0, 6))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className={style.loadWrap}>
      <div className={style.spinner} />
      <p className={style.loadText}>Loading dashboard…</p>
    </div>
  )

  const totalRev = (+stats.medRev + +stats.equRev).toLocaleString('en-IN')

  const medStatusData = [
    { label: 'Paid',      value: stats.mStatus?.[0] || 0 },
    { label: 'Dispatch',  value: stats.mStatus?.[1] || 0 },
    { label: 'Transit',   value: stats.mStatus?.[2] || 0 },
    { label: 'Delivered', value: stats.mStatus?.[3] || 0 },
  ]
  const equStatusData = [
    { label: 'Paid',      value: stats.eStatus?.[0] || 0 },
    { label: 'Dispatch',  value: stats.eStatus?.[1] || 0 },
    { label: 'Transit',   value: stats.eStatus?.[2] || 0 },
    { label: 'Delivered', value: stats.eStatus?.[3] || 0 },
  ]
  const teamSegments = [
    { label: 'Managers', value: stats.managers || 0, color: '#38bdf8' },
    { label: 'Reps',     value: stats.reps     || 0, color: '#818cf8' },
    { label: 'Delivery', value: stats.delivery || 0, color: '#34d399' },
  ]

  return (
    <div className={style.dashcontainer}>

      {/* ── Banner ── */}
      <div className={style.banner}>
        <div className={style.bannerLeft}>
          <h1 className={style.bannerTitle}>Admin Dashboard</h1>
          <p className={style.bannerSub}>
            SmartMed — real-time overview of medicines &amp; equipment
          </p>
        </div>
        <div className={style.bannerPills}>
          <div className={style.pill}>
            <span className={style.pillVal}>{stats.medOrders + stats.equOrders}</span>
            <span className={style.pillLab}>Total Orders</span>
          </div>
          <div className={style.pill}>
            <span className={`${style.pillVal} ${style.pillGreen}`}>₹{totalRev}</span>
            <span className={style.pillLab}>Total Revenue</span>
          </div>
        </div>
      </div>

      {/* ── Customers ── */}
      <Section title="Customers">
        <div className={style.grid2}>
          <StatCard
            label="Medicine Customers"
            value={stats.customers}
            sub={`${stats.pendingCust} pending approval`}
            iconBg="#e0f2fe" icon="💊" delay={0}
          />
          <StatCard
            label="Equipment Customers"
            value={stats.equCustomers}
            sub={`${stats.pendingEquCust} pending approval`}
            iconBg="#ede9fe" icon="🩺" delay={60}
          />
        </div>
      </Section>

      {/* ── Staff ── */}
      <Section title="Staff">
        <div className={style.grid3}>
          <StatCard label="Inventory Managers" value={stats.managers} sub={`${stats.activeMgr} active`}  iconBg="#fef3c7" icon="🏭" delay={0}   />
          <StatCard label="Representatives"    value={stats.reps}     sub={`${stats.activeReps} active`} iconBg="#d1fae5" icon="🤝" delay={60}  />
          <StatCard label="Delivery Team"      value={stats.delivery} sub={`${stats.activeDel} active`}  iconBg="#fee2e2" icon="🚚" delay={120} />
        </div>
      </Section>

      {/* ── Orders & Revenue ── */}
      <Section title="Orders &amp; Revenue">
        <div className={style.grid4}>
          <StatCard label="Medicine Orders"  value={stats.medOrders} iconBg="#e0f2fe" icon="📦" delay={0}   />
          <StatCard label="Equipment Orders" value={stats.equOrders} iconBg="#ede9fe" icon="📋" delay={60}  />
          <StatCard
            label="Medicine Revenue"
            value={`₹${Number(stats.medRev).toLocaleString('en-IN')}`}
            iconBg="#d1fae5" icon="💰" delay={120}
          />
          <StatCard
            label="Equipment Revenue"
            value={`₹${Number(stats.equRev).toLocaleString('en-IN')}`}
            iconBg="#fef3c7" icon="💵" delay={180}
          />
        </div>

        {/* Charts */}
        <div className={style.grid3}>
          <div className={style.chartCard}>
            <p className={style.chartTitle}>Medicine Order Status</p>
            <BarChart data={medStatusData} color="linear-gradient(180deg,#38bdf8,#38bdf899)" />
          </div>
          <div className={style.chartCard}>
            <p className={style.chartTitle}>Equipment Order Status</p>
            <BarChart data={equStatusData} color="linear-gradient(180deg,#818cf8,#818cf899)" />
          </div>
          <div className={`${style.chartCard} ${style.donutCard}`}>
            <p className={style.chartTitle}>Team Composition</p>
            <DonutChart segments={teamSegments} />
            <div className={style.legend}>
              {teamSegments.map((s, i) => (
                <div key={i} className={style.legendRow}>
                  <span className={style.legendDot} style={{ background: s.color }} />
                  <span className={style.legendLabel}>{s.label}</span>
                  <span className={style.legendVal}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Recent Orders ── */}
      <div className={style.ordersGrid}>

        {/* Medicine */}
        <Section title="Recent Medicine Orders">
          <div className={style.tableCard}>
            {medOrders.length === 0
              ? <p className={style.empty}>No orders yet</p>
              : (
                <table className={style.table}>
                  <thead>
                    <tr>
                      {['Store', 'Date', 'Items', 'Amount', 'Status'].map(h => (
                        <th key={h} className={style.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {medOrders.map((o, i) => (
                      <tr key={i} className={style.tr}>
                        <td className={`${style.td} ${style.tdBold}`}>{o.customerStoreName || '—'}</td>
                        <td className={style.td}>
                          {o.bookingDate ? new Date(o.bookingDate).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className={style.td}>{o.medicines?.length || 0}</td>
                        <td className={`${style.td} ${style.tdAmount}`}>
                          ₹{Number(o.totalAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td className={style.td}><StatusBadge status={o.bookStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </Section>

        {/* Equipment */}
        <Section title="Recent Equipment Orders">
          <div className={style.tableCard}>
            {equOrders.length === 0
              ? <p className={style.empty}>No orders yet</p>
              : (
                <table className={style.table}>
                  <thead>
                    <tr>
                      {['Store', 'Date', 'Items', 'Amount', 'Status'].map(h => (
                        <th key={h} className={style.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {equOrders.map((o, i) => (
                      <tr key={i} className={style.tr}>
                        <td className={`${style.td} ${style.tdBold}`}>{o.customerStoreName || '—'}</td>
                        <td className={style.td}>
                          {o.bookingDate ? new Date(o.bookingDate).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className={style.td}>{o.equipment?.length || 0}</td>
                        <td className={`${style.td} ${style.tdAmount}`}>
                          ₹{Number(o.totalAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td className={style.td}><StatusBadge status={o.bookStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </Section>

      </div>

    </div>
  )
}