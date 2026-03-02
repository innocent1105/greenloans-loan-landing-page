import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { 
  Search, Eye, CheckCircle, XCircle, 
  Clock, Shield, User, MapPin, Phone, 
  ExternalLink, AlertTriangle, Filter
} from 'lucide-react';
import { API_BASE_URL } from './config';

const KYCDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}get_all_profiles.php`);
      console.log(res.data);
      if (res.data.success) {
        setProfiles(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching profiles", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status, public_id) => {
    let reason = "Verified by Admin";
    if (status === 'rejected' || status === 'cancelled') {
      reason = prompt(`Enter reason for ${status}:`);
      if (!reason) return;
    }

    if (!window.confirm(`Set profile ${public_id} to ${status.toUpperCase()}?`)) return;
    console.log(`Updating profile ${public_id} to status: ${status} with reason: ${reason}`);
    try {
      const res = await axios.post(`${API_BASE_URL}update_profile_status.php`, {
        public_id: public_id,
        status: status,
        reason: reason
      });
      console.log("Update response:", res.data);
      if (res.data.success) {
        alert(`Profile updated successfully`);
        setSelectedProfile(null);
        fetchProfiles();
      }
    } catch (err) {
      alert("Database update failed.");
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.nrc_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.public_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const colors = {
      approved: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: '#10b98133' },
      pending: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: '#f59e0b33' },
      rejected: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: '#ef444433' },
      cancelled: { bg: 'rgba(255, 255, 255, 0.05)', text: '#888', border: '#ffffff22' }
    };
    const style = colors[status] || colors.pending;
    return {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      background: style.bg,
      color: style.text,
      border: `1px solid ${style.border}`
    };
  };

  if (loading) return <div style={styles.loader}>Synchronizing KYC Registry...</div>;

  return (
    <div style={styles.container}>
      <Sidebar activeTab="kyc" />
      
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Identity Verification Board</h1>
            <p style={styles.subtitle}>Manage user profiles and NRC documentation</p>
          </div>
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <Clock size={16} />
              <span>{profiles.filter(p => p.status === 'pending').length} Pending Review</span>
            </div>
          </div>
        </header>

        <div style={styles.toolbar}>
          <div style={styles.searchBox}>
            <Search size={18} color="#444" />
            <input 
              placeholder="Search by NRC or ID..." 
              style={styles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Public ID</th>
                <th style={styles.th}>NRC Number</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Submitted</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((p) => (
                <tr key={p.id} style={styles.tableRow}>
                  <td style={{...styles.td, ...styles.idCell}}>{p.public_id}</td>
                  <td style={styles.td}>{p.nrc_number}</td>
                  <td style={styles.td}>{p.location}</td>
                  <td style={{...styles.td, ...styles.dateCell}}>{new Date(p.applied_at).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadge(p.status)}>{p.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => setSelectedProfile(p)} style={styles.viewBtn}>
                      <Eye size={14} /> Review Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedProfile && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <Shield color="#10b981" />
                    <h3 style={{margin:0}}>Verification: {selectedProfile.public_id}</h3>
                </div>
                <button onClick={() => setSelectedProfile(null)} style={styles.closeBtn}>×</button>
              </div>
              
              <div style={styles.modalBody}>
                <div style={styles.imageSection}>
                   <div style={styles.imgContainer}>
                      <span style={styles.imgLabel}>Front View NRC</span>
                      <img src={`${API_BASE_URL}/${selectedProfile.nrc_image_front}`} style={styles.nrcImg} alt="Front" />
                      <a href={`${API_BASE_URL}/${selectedProfile.nrc_image_front}`} target="_blank" rel="noreferrer" style={styles.fullLink}>Open Original <ExternalLink size={12}/></a>
                   </div>
                   <div style={styles.imgContainer}>
                      <span style={styles.imgLabel}>Back View NRC</span>
                      <img src={`${API_BASE_URL}/${selectedProfile.nrc_image_back}`} style={styles.nrcImg} alt="Back" />
                      <a href={`${API_BASE_URL}/${selectedProfile.nrc_image_back}`} target="_blank" rel="noreferrer" style={styles.fullLink}>Open Original <ExternalLink size={12}/></a>
                   </div>
                </div>

                <div style={styles.detailGrid}>
                  <div style={styles.detailCard}>
                    <div style={styles.cardSectionTitle}><User size={14}/> Profile Info</div>
                    <p><span style={styles.detailLabel}>NRC Number:</span> <span style={styles.detailValue}>{selectedProfile.nrc_number}</span></p>
                    <p><span style={styles.detailLabel}>Residential:</span> <span style={styles.detailValue}>{selectedProfile.location}</span></p>
                    <p><span style={styles.detailLabel}>IP Address:</span> <span style={styles.detailValue}>{selectedProfile.ipaddress}</span></p>
                  </div>
                  <div style={styles.detailCard}>
                    <div style={styles.cardSectionTitle}><Phone size={14}/> Contacts</div>
                    <p><span style={styles.detailLabel}>Kin Name:</span> <span style={styles.detailValue}>{selectedProfile.next_of_kin_name}</span></p>
                    <p><span style={styles.detailLabel}>Kin Contact:</span> <span style={styles.detailValue}>{selectedProfile.next_of_kin_contact}</span></p>
                    <p><span style={styles.detailLabel}>Submission:</span> <span style={styles.detailValue}>{selectedProfile.applied_at}</span></p>
                  </div>
                </div>

                <div style={styles.footerActions}>
                  <button onClick={() => handleAction('cancelled', selectedProfile.public_id)} style={styles.btnCancel}>Cancel</button>
                  <button onClick={() => handleAction('rejected', selectedProfile.public_id)} style={styles.btnReject}>Reject Information</button>
                  <button onClick={() => handleAction('approved', selectedProfile.public_id)} style={styles.btnApprove}>Verify & Approve</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#020202', color: '#fff', fontFamily: 'Inter, sans-serif' },
  main: { flex: 1, padding: '40px', maxWidth: '1400px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '800', margin: 0 },
  subtitle: { color: '#666', fontSize: '14px', marginTop: '5px' },
  statsRow: { display: 'flex', gap: '15px' },
  statBox: { background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#f59e0b' },
  
  toolbar: { marginBottom: '24px' },
  searchBox: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 15px', width: '350px' },
  searchInput: { background: 'none', border: 'none', color: '#fff', padding: '12px', outline: 'none', width: '100%', fontSize: '14px' },
  
  tableCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeader: { background: '#0d0d0d', color: '#444', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' },
  th: { padding: '15px 20px' },
  tableRow: { borderBottom: '1px solid #141414' },
  td: { padding: '18px 20px', fontSize: '14px' },
  idCell: { color: '#10b981', fontWeight: 'bold', fontFamily: 'monospace' },
  dateCell: { color: '#555', fontSize: '13px' },
  viewBtn: { background: '#111', border: '1px solid #222', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 'bold' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { background: '#050505', width: '1000px', maxHeight: '90vh', borderRadius: '28px', border: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' },
  modalHeader: { padding: '24px 30px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: '#1a1a1a', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' },
  modalBody: { padding: '30px', overflowY: 'auto' },
  
  imageSection: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' },
  imgContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  imgLabel: { fontSize: '10px', color: '#555', fontWeight: 'bold', textTransform: 'uppercase' },
  nrcImg: { width: '100%', height: '280px', objectFit: 'contain', background: '#000', borderRadius: '16px', border: '1px solid #1a1a1a' },
  fullLink: { color: '#10b981', fontSize: '11px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'center' },
  
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' },
  detailCard: { background: '#0a0a0a', padding: '20px', borderRadius: '18px', border: '1px solid #141414' },
  cardSectionTitle: { fontSize: '12px', color: '#10b981', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' },
  detailLabel: { color: '#444', marginRight: '8px' },
  detailValue: { color: '#fff', fontWeight: '600' },
  
  footerActions: { display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #1a1a1a', paddingTop: '30px' },
  btnApprove: { background: '#10b981', color: '#000', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' },
  btnReject: { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '14px 32px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' },
  btnCancel: { background: 'transparent', color: '#444', border: '1px solid #222', padding: '14px 32px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', background: '#020202', fontWeight: 'bold' }
};

export default KYCDashboard;