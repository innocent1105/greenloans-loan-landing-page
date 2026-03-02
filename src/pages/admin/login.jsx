import React, { useState } from 'react';
import axios from 'axios';
import { Leaf, Lock, Phone, ShieldCheck, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from './config';
import { Link, useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mobile_number: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login.php', formData);
      const data = response.data;

      if (data.success) {
        localStorage.clear();
        
        console.log(response.data.token);
        const text = response.data.token;

        const base64 = btoa(text);
        // const text = atob(base64);
        console.log(base64);
        localStorage.setItem('authToken', base64);
      } else {
        setError(data.message || 'Invalid PIN or Phone Number.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Server Error occurred.');
      } else if (err.request) {
        setError('No response from server. Check XAMPP/CORS settings.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error("Axios Error Detail:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <Leaf size={32} color="#10b981" fill="#10b981" />
          </div>
          <h2 style={styles.title}>GreeNhub <span style={{color: '#10b981'}}>Portal</span></h2>
          <p style={styles.subtitle}>Secure Access for Business Owners</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={18} />
            <span style={{fontSize: '13px'}}>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputWrapper}>
            <Phone size={18} style={styles.icon} />
            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              style={styles.input}
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <Lock size={18} style={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="6-Digit PIN"
              maxLength="6"
              style={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Account'}
            {!loading && <ChevronRight size={20} />}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={{color: '#666', fontSize: '14px'}}>
            New to GreeNhub? <a href="/register" style={styles.link}>Apply Now</a>
          </p>
        </div>

        <div style={styles.trustFooter}>
          <ShieldCheck size={14} color="#10b981" />
          <span style={styles.trustText}>Secured by 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', padding: '20px', fontFamily: 'Inter, sans-serif' },
  card: { width: '100%', maxWidth: '400px', background: '#0a0a0a', padding: '40px', borderRadius: '24px', border: '1px solid #1a1a1a', textAlign: 'center' },
  header: { marginBottom: '30px' },
  logoContainer: { background: 'rgba(16,185,129,0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' },
  title: { color: 'white', fontSize: '24px', fontWeight: '800', margin: 0 },
  subtitle: { color: '#666', fontSize: '14px', marginTop: '5px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '15px', color: '#444' },
  input: { width: '100%', padding: '15px 15px 15px 45px', background: '#111', border: '1px solid #222', borderRadius: '12px', color: 'white', fontSize: '16px', outline: 'none' },
  button: { background: '#10b981', color: 'black', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' },
  errorBox: { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' },
  footer: { marginTop: '20px' },
  link: { color: '#10b981', textDecoration: 'none', fontWeight: '700' },
  trustFooter: { marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' },
  trustText: { color: '#444', fontSize: '11px', fontWeight: '600' }
};

export default Login;