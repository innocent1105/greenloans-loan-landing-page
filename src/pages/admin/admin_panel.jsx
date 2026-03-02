import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Filter, TrendingUp, AlertCircle } from 'lucide-react';

const disbursementData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 67000 },
];

const MetricsRibbon = ({ stats }) => {
  return (
    <div style={styles.ribbon}>
      <div style={styles.metricItem}>
        <span style={styles.metricLabel}>Total Portfolio Value</span>
        <div style={styles.metricValueRow}>
          <h2 style={styles.metricValue}>K{stats.portfolioValue}</h2>
          <span style={styles.trendUp}>+12.5%</span>
        </div>
      </div>
      
      <div style={styles.divider} />

      <div style={styles.metricItem}>
        <span style={styles.metricLabel}>Portfolio At Risk (PAR)</span>
        <div style={styles.metricValueRow}>
          <h2 style={styles.metricValue}>{stats.par}%</h2>
          <span style={styles.trendDown}>-2.1%</span>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.metricItem}>
        <span style={styles.metricLabel}>Avg. Interest Yield</span>
        <div style={styles.metricValueRow}>
          <h2 style={styles.metricValue}>{stats.avgYield}%</h2>
          <span style={{color: '#666', fontSize: '12px', fontWeight: '600'}}>Steady</span>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Define the missing stats object
  const [dashboardStats, setDashboardStats] = useState({
    portfolioValue: "1,240,500",
    par: "4.2",
    avgYield: "18.5"
  });

  return (
    <div style={styles.container}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={{fontSize: '24px', fontWeight: '800', margin: 0}}>Portfolio Overview</h1>
            <p style={{color: '#666', fontSize: '14px', marginTop: '5px'}}>Real-time metrics for GreeNhub Zambia</p>
          </div>
          <div style={styles.searchBar}>
            <Search size={18} color="#444" />
            <input placeholder="Search transactions..." style={styles.searchInput} />
          </div>
        </header>

        {/* Ribbon stays inside main for proper scrolling */}
        <MetricsRibbon stats={dashboardStats} />

        <div style={styles.graphGrid}>
          <div style={styles.graphCard}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
                <h3 style={styles.graphTitle}>Disbursement Trend (ZMW)</h3>
                <TrendingUp size={16} color="#10b981" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={disbursementData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="month" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#fff', borderRadius: '12px'}} />
                <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.graphCardSmall}>
             <h3 style={styles.graphTitle}>Loan Distribution</h3>
             <div style={styles.miniStats}>
                <div style={styles.miniStatItem}>
                    <span style={{color: '#10b981'}}>●</span> <span>Marketeers (70%)</span>
                </div>
                <div style={styles.miniStatItem}>
                    <span style={{color: '#3b82f6'}}>●</span> <span>Intemba (20%)</span>
                </div>
                <div style={styles.miniStatItem}>
                    <span style={{color: '#f59e0b'}}>●</span> <span>Personal (10%)</span>
                </div>
             </div>
             <div style={styles.riskAlert}>
                <AlertCircle size={14} color="#f59e0b" />
                <span style={{fontSize: '11px', color: '#888'}}>3 accounts in Ndola require follow-up.</span>
             </div>
          </div>
        </div>

        <div style={styles.tableCard}>
            <div style={{padding: '20px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3 style={{margin: 0, fontSize: '16px'}}>Recent Loan Applications</h3>
                <button style={styles.filterBtn}><Filter size={14}/> Filter</button>
            </div>
            <p style={{padding: '40px', textAlign: 'center', color: '#444', fontSize: '14px'}}>Awaiting disbursement data from backend...</p>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: 'white', fontFamily: 'Inter, sans-serif' },
  main: { flex: 1, padding: '40px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  searchBar: { display: 'flex', alignItems: 'center', background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '10px 15px', borderRadius: '12px', width: '300px' },
  searchInput: { background: 'none', border: 'none', color: 'white', marginLeft: '10px', outline: 'none', fontSize: '14px', width: '100%' },
  
  // Ribbon Styles
  ribbon: { display: 'flex', backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '20px', padding: '25px', marginBottom: '30px', alignItems: 'center', justifyContent: 'space-around' },
  metricItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
  metricLabel: { color: '#666', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' },
  metricValueRow: { display: 'flex', alignItems: 'baseline', gap: '10px' },
  metricValue: { fontSize: '22px', fontWeight: '800', margin: 0 },
  trendUp: { color: '#10b981', fontSize: '12px', fontWeight: '700' },
  trendDown: { color: '#ef4444', fontSize: '12px', fontWeight: '700' },
  divider: { width: '1px', height: '40px', backgroundColor: '#1a1a1a' },

  graphGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '30px' },
  graphCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '25px', borderRadius: '24px' },
  graphCardSmall: { background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '25px', borderRadius: '24px', display: 'flex', flexDirection: 'column' },
  graphTitle: { fontSize: '14px', color: '#888', margin: 0, fontWeight: '600' },
  
  miniStats: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 },
  miniStatItem: { display: 'flex', gap: '10px', fontSize: '13px', color: '#ccc' },
  riskAlert: { marginTop: '20px', padding: '12px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' },
  
  tableCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '24px' },
  filterBtn: { background: '#111', border: '1px solid #222', color: '#888', padding: '8px 15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }
};

export default AdminDashboard;