import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { 
  ArrowDownRight, ArrowUpRight, User, ShieldCheck, 
  ShieldAlert, Calendar, CreditCard, Hash, ChevronDown, ChevronUp 
} from 'lucide-react';
import { API_BASE_URL } from './config';

const TransactionsDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get_admin_transactions.php`);
      console.log(res.data);
      if (res.data.success) setTransactions(res.data.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <div style={styles.loader}>Accessing Ledger...</div>;

  return (
    <div style={styles.container}>
      <Sidebar activeTab="transactions" />
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>System Ledger</h1>
          <p style={styles.subtitle}>Real-time monitoring of all fund movements</p>
        </header>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Type</th>
                <th>Reference</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <React.Fragment key={tx.t_id}>
                  <tr 
                    style={{
                      ...styles.tableRow, 
                      backgroundColor: expandedId === tx.t_id ? '#0d0d0d' : 'transparent'
                    }} 
                    onClick={() => toggleRow(tx.t_id)}
                  >
                    <td>
                      <div style={styles.typeCell}>
                        {tx.t_type === 'transfer' ? 
                          <ArrowUpRight size={16} color="#ef4444" /> : 
                          <ArrowDownRight size={16} color="#10b981" />
                        }
                        {tx.t_type.toUpperCase()}
                      </div>
                    </td>
                    <td style={styles.refCell}>{tx.reference}</td>
                    <td>{tx.user_id}</td>
                    <td style={styles.amountCell}>K{parseFloat(tx.amount).toLocaleString()}</td>
                    <td>
                      <span style={getStatusStyle(tx.status)}>{tx.status}</span>
                    </td>
                    <td style={styles.dateCell}>{tx.created_at}</td>
                    <td>
                      {expandedId === tx.t_id ? <ChevronUp size={18}/> : <ChevronDown size={18} color="#444"/>}
                    </td>
                  </tr>

                  {expandedId === tx.t_id && (
                    <tr style={styles.expandedRow}>
                      <td colSpan="7">
                        <div style={styles.detailsContainer}>
                          <div style={styles.detailsGrid}>
                            <div style={styles.detailsCard}>
                              <div style={styles.cardHeader}><User size={14}/> User Identity</div>
                              <div style={styles.infoLine}><span>Full Name:</span> <strong>{tx.full_name || 'N/A'}</strong></div>
                              <div style={styles.infoLine}><span>Email:</span> <strong>{tx.email}</strong></div>
                              <div style={styles.infoLine}><span>KYC Status:</span> 
                                <div style={tx.kyc_status === 'approved' ? styles.kycOk : styles.kycBad}>
                                  {tx.kyc_status === 'approved' ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                                  {tx.kyc_status?.toUpperCase() || 'NO PROFILE'}
                                </div>
                              </div>
                            </div>

                            <div style={styles.detailsCard}>
                              <div style={styles.cardHeader}><CreditCard size={14}/> Financial Context</div>
                              <div style={styles.infoLine}><span>Wallet ID:</span> <strong>{tx.wallet_id}</strong></div>
                              <div style={styles.infoLine}><span>Current Balance:</span> <strong>K{tx.current_balance}</strong></div>
                              <div style={styles.infoLine}><span>Sender ID:</span> <small>{tx.sender_id}</small></div>
                            </div>

                            <div style={styles.detailsCard}>
                              <div style={styles.cardHeader}><Hash size={14}/> Metadata</div>
                              <div style={styles.infoLine}><span>Internal ID:</span> <strong>#{tx.t_id}</strong></div>
                              <div style={styles.infoLine}><span>Receiver ID:</span> <strong>{tx.receiver_id}</strong></div>
                              <div style={styles.infoLine}><span>Time:</span> <strong>{new Date(tx.created_at).toLocaleTimeString()}</strong></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const getStatusStyle = (status) => ({
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 'bold',
  background: status === 'successful' ? '#10b98122' : '#f59e0b22',
  color: status === 'successful' ? '#10b981' : '#f59e0b',
  border: `1px solid ${status === 'successful' ? '#10b98144' : '#f59e0b44'}`
});

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#020202', color: '#fff' },
  main: { flex: 1, padding: '40px' },
  header: { marginBottom: '30px' },
  title: { fontSize: '26px', fontWeight: '800', margin: 0 },
  subtitle: { color: '#555', fontSize: '14px' },
  
  tableWrapper: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { textAlign: 'left', background: '#0d0d0d', color: '#444', fontSize: '11px', textTransform: 'uppercase' },
  tableRow: { borderBottom: '1px solid #111', cursor: 'pointer', transition: '0.2s' },
  
  typeCell: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '12px' },
  refCell: { fontFamily: 'monospace', color: '#10b981' },
  amountCell: { fontWeight: '800' },
  dateCell: { color: '#555', fontSize: '13px' },

  expandedRow: { backgroundColor: '#0d0d0d' },
  detailsContainer: { padding: '20px', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', animation: 'slideDown 0.3s ease' },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  detailsCard: { background: '#050505', padding: '15px', borderRadius: '12px', border: '1px solid #1a1a1a' },
  cardHeader: { color: '#10b981', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' },
  infoLine: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#888' },
  
  kycOk: { display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 'bold' },
  kycBad: { display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontWeight: 'bold' },
  
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', background: '#000' }
};

export default TransactionsDashboard;