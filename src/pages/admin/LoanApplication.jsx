import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  FileText, 
  ExternalLink,
  MapPin,
  Building2
} from 'lucide-react';
import {API_BASE_URL} from './config';
import { Link, useNavigate } from "react-router-dom";

const LoanApplications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [activeTab]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}get_applications.php?status=${activeTab}`);
      setApplications(res.data.data || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {

    const reason = newStatus === 'rejected' ? prompt("Enter rejection reason:") : "";

    try {
      const res = await axios.post(`${API_BASE_URL}update_application.php`, {
        loan_application_id: id,
        status: newStatus,
        reason: reason
      });

      fetchApplications();

      console.log(res.data)
    } catch (err) {
      alert("Failed to update status");
      console.log(err)
    }
  };

  const handleRowClick = (id) => {
    navigate(`/application/${id}`);
  };

  return (
    <div style={styles.container}>
      <Sidebar activeTab="applications" />

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Loan Applications</h1>
            <p style={styles.subtitle}>Review and process incoming GreeNloan requests</p>
          </div>
          <div style={styles.searchBar}>
            <Search size={18} color="#444" />
            <input placeholder="Search NRC or Reference..." style={styles.searchInput} />
          </div>
        </header>

        {/* --- STATUS FILTER TABS --- */}
        <div style={styles.tabRow}>
          {['pending', 'approved', 'rejected', 'completed'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={activeTab === tab ? styles.activeTabBtn : styles.tabBtn}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={styles.th}>Reference & Date</th>
                <th style={styles.th}>Borrower / NRC</th>
                <th style={styles.th}>Business Info</th>
                <th style={styles.th}>Loan Details</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={styles.loadingTd}>Loading data from GreeNhub Secure Vault...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan="6" style={styles.loadingTd}>No {activeTab} applications found.</td></tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.loan_application_id} style={{...styles.tr, ...styles.trHover}}>
                    <td style={styles.td}>
                      <div style={{fontWeight: 'bold', color: '#fff'}}>{app.reference_id}</div>
                      <div style={{fontSize: '11px', color: '#666'}}>{new Date(app.applied_at).toLocaleDateString()}</div>
                    </td>

                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <div style={styles.avatar}>{app.user_id.substring(0,2)}</div>
                        <div>
                          <div style={{fontSize: '13px', fontWeight: '700'}}>{app.nrc_number || 'No NRC'}</div>
                          <div style={{fontSize: '11px', color: '#10b981'}}>ID: {app.user_id}</div>
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px'}}>
                        <Building2 size={14} color="#666"/> {app.business_name || 'Individual'}
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#666'}}>
                        <MapPin size={12}/> {app.business_location || 'Unknown'}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={{fontWeight: '800', color: '#10b981'}}>K{app.requested_amount}</div>
                      <div style={{fontSize: '11px', color: '#888'}}>Type ID: {app.loan_type_id}</div>
                    </td>

                    <td style={styles.td}>
                      <span style={getStatusStyle(app.status)}>{app.status}</span>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actionGroup}>
                        {activeTab === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(app.loan_application_id, 'approved')} style={styles.iconBtnSuccess} title="Approve">
                              <CheckCircle size={18} />
                            </button>
                            <button onClick={() => updateStatus(app.loan_application_id, 'rejected')} style={styles.iconBtnDanger} title="Reject">
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button onClick={() => handleRowClick(app.loan_application_id)} style={styles.iconBtn} title="View Dossier">
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// Helper for Status Pills
const getStatusStyle = (status) => ({
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: '800',
  textTransform: 'uppercase',
  backgroundColor: status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
  color: status === 'pending' ? '#f59e0b' : status === 'approved' ? '#10b981' : '#ef4444'
});

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' },
  main: { flex: 1, padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '900', margin: 0 },
  subtitle: { color: '#666', fontSize: '14px', marginTop: '5px' },
  searchBar: { display: 'flex', alignItems: 'center', background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '10px 15px', borderRadius: '12px', width: '320px' },
  searchInput: { background: 'none', border: 'none', color: 'white', marginLeft: '10px', outline: 'none', fontSize: '14px', width: '100%' },
  
  tabRow: { display: 'flex', gap: '10px', marginBottom: '25px', borderBottom: '1px solid #1a1a1a', paddingBottom: '15px' },
  tabBtn: { background: 'none', border: 'none', color: '#666', padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
  activeTabBtn: { background: 'rgba(16, 185, 129, 0.1)', border: 'none', color: '#10b981', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '700' },
  
  tableWrapper: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '20px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeadRow: { background: '#0f0f0f', borderBottom: '1px solid #1a1a1a' },
  th: { padding: '15px 20px', fontSize: '11px', fontWeight: '700', color: '#444', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid #141414', transition: '0.2s', cursor: 'pointer' },
  trHover: { background: '#090909' },
  td: { padding: '15px 20px' },
  avatar: { width: '32px', height: '32px', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#10b981', fontWeight: 'bold' },
  
  actionGroup: { display: 'flex', gap: '8px' },
  iconBtn: { background: '#111', border: '1px solid #222', color: '#888', padding: '6px', borderRadius: '6px', cursor: 'pointer' },
  iconBtnSuccess: { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '6px', borderRadius: '6px', cursor: 'pointer' },
  iconBtnDanger: { background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' },
  loadingTd: { padding: '50px', textAlign: 'center', color: '#444', fontSize: '14px' }
};

export default LoanApplications;