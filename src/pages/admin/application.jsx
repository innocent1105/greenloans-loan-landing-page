import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { 
  ArrowLeft, CheckCircle, XCircle, User, 
  Briefcase, Wallet, History, MapPin, 
  Phone, Mail, ShieldCheck, FileText, ExternalLink, AlertTriangle
} from 'lucide-react';
import { API_BASE_URL } from './config';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFullDetails();
  }, [id]);

  const fetchFullDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get_loan_full_details.php?id=${id}`);
      if (res.data.success) setData(res.data.data);
    } catch (err) {
      console.error("Error fetching details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status) => {
    let reason = "Verified by Admin";
    
    if (status === 'rejected' || status === 'cancelled') {
      reason = prompt(`Enter ${status} reason:`);
      if (!reason) return;
    }

    if (!window.confirm(`Are you sure you want to set this application to ${status}?`)) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/update_application.php`, {
        loan_application_id: id,
        status: status,
        reason: reason
      });
      if (res.data.success) {
        alert(`Loan ${status.toUpperCase()} successfully`);
        fetchFullDetails(); 
      }
    } catch (err) {
      alert("Action failed. Check console.");
    }
  };

  if (loading) return <div style={styles.loader}>Accessing GreeNhub Secure Records...</div>;
  if (!data) return <div style={styles.loader}>Application not found.</div>;

  const { details, wallets, history, transactions } = data;

  return (
    <div style={styles.container}>
      <Sidebar activeTab="applications" />
      
      <main style={styles.main}>
        {/* TOP NAVIGATION BAR */}
        <div style={styles.topNav}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ArrowLeft size={20} /> Back to List
          </button>
          
          <div style={styles.actionRow}>
            {details.status === 'pending' ? (
              <>
                <button onClick={() => handleAction('cancelled')} style={styles.cancelBtn}>
                  <AlertTriangle size={18} /> Cancel
                </button>
                <button onClick={() => handleAction('rejected')} style={styles.rejectBtn}>
                  <XCircle size={18} /> Reject
                </button>
                <button onClick={() => handleAction('approved')} style={styles.approveBtn}>
                  <CheckCircle size={18} /> Approve & Disburse
                </button>
              </>
            ) : (
                <div style={getStatusBadgeStyle(details.status)}>
                    {details.status.toUpperCase()}
                </div>
            )}
          </div>
        </div>

        <div style={styles.grid}>
          {/* LEFT COLUMN: IDENTITY & DOCUMENTS */}
          <div style={styles.column}>
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <User size={20} color="#10b981" />
                <h3>Borrower Identity</h3>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.profileHeader}>
                    <img 
                        src={`${API_BASE_URL}/avatars/${details.avatar}`} 
                        alt="Avatar" 
                        style={styles.avatarImg} 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=User'; }}
                    />
                    <div>
                        <h2 style={{margin: 0}}>{details.fullname}</h2>
                        <p style={{color: '#10b981', margin: 0, fontSize: '14px'}}>{details.email}</p>
                    </div>
                </div>

                <div style={styles.detailList}>
                    <div style={styles.detailItem}><strong>NRC:</strong> <span>{details.nrc_number}</span></div>
                    <div style={styles.detailItem}><strong>Phone:</strong> <span>{details.phone_number}</span></div>
                    <div style={styles.detailItem}><strong>Public ID:</strong> <span style={{fontSize: '10px'}}>{details.user_public_id}</span></div>
                </div>

                <div style={styles.kinSection}>
                    <p><strong>Next of Kin:</strong> {details.next_of_kin_name}</p>
                    <p><strong>Kin Contact:</strong> {details.next_of_kin_contact}</p>
                </div>

                <div style={styles.nrcGrid}>
                  <div style={styles.nrcContainer}>
                    <label style={styles.docLabel}>NRC Front View</label>
                    <div style={styles.imageWrapper}>
                      <img 
                        src={`${API_BASE_URL}/${details.nrc_image_front}`} 
                        alt="NRC Front" 
                        style={styles.nrcImage} 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Front+NRC+Missing'; }}
                      />
                      <a href={`${API_BASE_URL}/${details.nrc_image_front}`} target="_blank" rel="noreferrer" style={styles.zoomBtn}>
                        <ExternalLink size={14} /> Full View
                      </a>
                    </div>
                  </div>

                  <div style={styles.nrcContainer}>
                    <label style={styles.docLabel}>NRC Back View</label>
                    <div style={styles.imageWrapper}>
                      <img 
                        src={`${API_BASE_URL}/${details.nrc_image_back}`} 
                        alt="NRC Back" 
                        style={styles.nrcImage} 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Back+NRC+Missing'; }}
                      />
                      <a href={`${API_BASE_URL}/${details.nrc_image_back}`} target="_blank" rel="noreferrer" style={styles.zoomBtn}>
                        <ExternalLink size={14} /> Full View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <Briefcase size={20} color="#10b981" />
                <h3>Business Assessment</h3>
              </div>
              <div style={styles.infoCard}>
                <h4 style={{margin: '0 0 10px 0', color: '#10b981'}}>{details.business_name || "Individual Account"}</h4>
                <p style={styles.desc}>{details.business_description || "No description provided."}</p>
                <div style={styles.metaRow}>
                    <span><MapPin size={14}/> {details.business_location || "N/A"}</span>
                    <span><ShieldCheck size={14}/> TPIN: {details.tpin || 'Not Provided'}</span>
                </div>
              </div>
            </section>
          </div>

          <div style={styles.column}>
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <Wallet size={20} color="#10b981" />
                <h3>Live Wallet Balances</h3>
              </div>
              <div style={styles.walletGrid}>
                {wallets.map((w, i) => (
                  <div key={i} style={styles.walletCard}>
                    <span style={styles.walletType}>{w.wallet_type} Account</span>
                    <span style={styles.walletBalance}>{w.currency} {w.balance}</span>
                  </div>
                ))}
              </div>
            </section>

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <History size={20} color="#10b981" />
                <h3>Credit History Summary</h3>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.requestHighlight}>
                    <span>Requested Amount:</span>
                    <span style={styles.bigAmount}>K{details.requested_amount}</span>
                </div>
                <div style={styles.historyList}>
                    <p style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>Past Loan Performance:</p>
                    {history.length === 0 ? <p style={styles.empty}>New Borrower (No prior history found)</p> : 
                      history.map((h, i) => (
                        <div key={i} style={styles.historyItem}>
                           <span>K{h.principal_amount}</span>
                           <span style={getLoanStatusStyle(h.status)}>{h.status}</span>
                        </div>
                      ))
                    }
                </div>
              </div>
            </section>

            <section style={styles.section}>
                <div style={styles.sectionHeader}><FileText size={20} color="#10b981" /><h3>Recent Transactions</h3></div>
                <div style={styles.infoCard}>
                    {transactions.length === 0 ? <p style={styles.empty}>No recent transactions</p> : 
                        transactions.map((t, i) => (
                        <div key={i} style={styles.txItem}>
                            <div>
                                <div style={{fontSize: '13px', fontWeight: 'bold'}}>{t.t_type.toUpperCase()}</div>
                                <div style={{fontSize: '10px', color: '#555'}}>{new Date(t.created_at).toLocaleDateString()}</div>
                            </div>
                            <span style={{color: t.status === 'successful' ? '#10b981' : '#ef4444', fontWeight: 'bold'}}>
                                K{t.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const getStatusBadgeStyle = (status) => ({
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: status === 'approved' ? '#10b981' : status === 'rejected' ? '#ef4444' : '#333',
    color: status === 'approved' ? '#000' : '#fff'
});

const getLoanStatusStyle = (status) => ({
    color: status === 'completed' ? '#10b981' : status === 'defaulted' ? '#ef4444' : '#f59e0b',
    fontSize: '12px',
    fontWeight: 'bold'
});

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' },
  main: { flex: 1, padding: '30px' },
  topNav: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center', background: '#0a0a0a', padding: '15px', borderRadius: '15px', border: '1px solid #1a1a1a' },
  backBtn: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  actionRow: { display: 'flex', gap: '12px' },
  approveBtn: { background: '#10b981', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  rejectBtn: { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  cancelBtn: { background: 'rgba(255, 255, 255, 0.05)', color: '#ccc', border: '1px solid #333', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  section: { marginBottom: '30px' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
  infoCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '24px', borderRadius: '15px' },
  
  profileHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #1a1a1a' },
  avatarImg: { width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid #10b981' },
  
  detailList: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  detailItem: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid #111', paddingBottom: '8px' },
  
  kinSection: { background: '#0f0f0f', padding: '15px', borderRadius: '10px', borderLeft: '3px solid #10b981', marginBottom: '20px', fontSize: '13px' },

  nrcGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
  nrcContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
  docLabel: { fontSize: '10px', color: '#555', fontWeight: 'bold' },
  imageWrapper: { position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #222' },
  nrcImage: { width: '100%', height: '140px', objectFit: 'cover' },
  zoomBtn: { position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', color: '#10b981', padding: '4px 8px', borderRadius: '5px', fontSize: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' },

  desc: { fontSize: '14px', color: '#aaa', lineHeight: '1.6' },
  metaRow: { display: 'flex', gap: '20px', marginTop: '15px', fontSize: '12px', color: '#555' },
  
  walletGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  walletCard: { background: '#0a0a0a', padding: '20px', borderRadius: '15px', border: '1px solid #1a1a1a' },
  walletType: { fontSize: '10px', textTransform: 'uppercase', color: '#555', fontWeight: 'bold', display: 'block' },
  walletBalance: { fontSize: '20px', fontWeight: '900', color: '#10b981', marginTop: '5px' },
  
  requestHighlight: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1a', paddingBottom: '15px', marginBottom: '15px' },
  bigAmount: { fontSize: '28px', fontWeight: '900', color: '#10b981' },
  historyItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #111', fontSize: '13px' },
  txItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #111' },
  empty: { color: '#444', fontSize: '13px', textAlign: 'center', padding: '10px' },
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', background: '#050505', fontSize: '18px', fontWeight: 'bold' }
};

export default ApplicationDetail;