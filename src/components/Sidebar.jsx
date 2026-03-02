import React, {useState, useEffect} from 'react';
import { TrendingUp, Clock, HandCoins, Users, Settings,ListCheck, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
 
const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20}/> },
    { id: 'transactions', label: 'Transactions', icon: <ListCheck size={20}/> },
    { id: 'pending', label: 'Loan applications', icon: <Clock size={20}/> },
    { id: 'active', label: 'Profile Applications', icon: <HandCoins size={20}/> },
    { id: 'borrowers', label: 'Borrowers', icon: <Users size={20}/> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20}/> },
  ];


  useEffect(() => {
    if(activeTab) {
      if(activeTab == "overview"){
        navigate('/admin/dashboard');
        return;
      }

      if(activeTab == "transactions"){
        navigate('/admin/transactions');
        return;
      }
    }


  }, [activeTab]);






  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoArea}>
        <div style={styles.logoIcon}>G</div>
        <h2 style={styles.logoText}>GreeNhub <span style={{color: '#10b981'}}>Admin</span></h2>
      </div>
      
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={activeTab === item.id ? styles.navItemActive : styles.navItem}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div style={styles.logoutZone}>
        <button style={styles.logoutBtn} onClick={() => window.location.href='/login'}>
          <LogOut size={18} /> <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: { width: '260px', backgroundColor: '#0a0a0a', borderRight: '1px solid #1a1a1a', padding: '30px 20px', display: 'flex', flexDirection: 'column' },
  logoArea: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px' },
  logoIcon: { background: '#10b981', color: 'black', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' },
  logoText: { fontSize: '18px', fontWeight: '800', margin: 0, color: 'white' },
  nav: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '12px', color: '#666', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: '0.3s' },
  navItemActive: { display: 'flex', alignItems: 'center', gap: '12px', cursor : "pointer", padding: '12px 15px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '14px', fontWeight: '600' },
  logoutZone: { paddingTop: '20px', borderTop: '1px solid #1a1a1a' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }
};

export default Sidebar;