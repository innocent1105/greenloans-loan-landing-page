import React from 'react';
import '../App.css';
import '../tailwind.css';
import { 
  Leaf, Shield, Zap, Globe, 
  Instagram, Twitter, Github, Mail, MapPin, Phone, Send
} from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="big-footer" style={{ padding: '6rem 1.5rem 2rem', background: '#050505' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Brand & Mission Column */}
          <div className="footer-col">
            <div className="clickable-bounce" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem'}}>
               <div style={{width: '32px', height: '32px', background: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <Leaf size={18} color="white" />
               </div>
               <span style={{fontWeight: 900, fontSize: '1.5rem', color: 'white', letterSpacing: '-1px'}}>GreeNloans</span>
            </div>
            <p style={{color: '#666', lineHeight: 1.6, fontSize: '0.9rem', marginBottom: '1.5rem'}}>
              GreeNhub eResources Ltd: Specialized in Community-Led Savings and Small Business Empowerment loans. The Hub of Growth.
            </p>
            <div style={{display: 'flex', gap: '1.5rem'}}>
               <Instagram size={20} className="clickable-bounce" style={{ color: '#444', cursor: 'pointer' }} />
               <Twitter size={20} className="clickable-bounce" style={{ color: '#444', cursor: 'pointer' }} />
               <Github size={20} className="clickable-bounce" style={{ color: '#444', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Business Loans Column */}
          <div className="footer-col">
            <h4 style={{color: '#10b981', marginBottom: '1.2rem', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px'}}>OUR PRODUCTS</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              {['Marketeers Loan', 'Intemba Loan', 'BYD Project Loan', 'Chilimba Savings', 'Education Loans'].map(item => (
                <li key={item} style={{marginBottom: '0.8rem'}}>
                  <a href="#" className="clickable-bounce" style={{color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s'}}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Locations Column */}
          <div className="footer-col">
            <h4 style={{color: '#10b981', marginBottom: '1.2rem', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px'}}>LOCATIONS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ color: '#eee', fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>Solwezi Office (HQ)</span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>Plot L/40269, Mutanda Road</span>
              </div>
              <div>
                <span style={{ color: '#eee', fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>Ndola Office</span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>0526, Luapula Road</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Mobile Link */}
          <div className="footer-col">
            <h4 style={{color: '#10b981', marginBottom: '1.2rem', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px'}}>GET STARTED</h4>
            <p style={{color: '#444', fontSize: '0.8rem', marginBottom: '1rem'}}>Enter your email for the direct download link.</p>
            <div style={{position: 'relative', maxWidth: '300px'}}>
              <input 
                type="text" 
                placeholder="Email Address" 
                style={{width: '100%', background: '#111', border: '1px solid #222', padding: '0.8rem 1rem', borderRadius: '12px', color: 'white', outline: 'none'}} 
              />
              <button className="clickable-bounce" style={{position: 'absolute', right: '5px', top: '5px', background: '#10b981', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer'}}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Bar */}
        <div className="footer-bottom" style={{maxWidth: '1200px', margin: '4rem auto 0', borderTop: '1px solid #1a1a1c', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#444', fontSize: '0.75rem'}}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ color: '#888', fontWeight: 700 }}>© 2026 GreeNhub eResources Ltd</span>
              <span>Reg No: 126180000196 | TPIN: 1007633038</span>
              <span>By Cynite Technologies. All loans subject to terms.</span>
            </div>
            
            <div style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap'}}>
               <span className="clickable-bounce" style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Phone size={12}/> +260-978-330-929</span>
               <span className="clickable-bounce" style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Mail size={12}/> greeNloansoffice@gmail.com</span>
               <span className="clickable-bounce" style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Shield size={12}/> Secure 256-bit AES</span>
            </div>
          </div>
        </div>

        <style>{`
          .footer-col a:hover { color: #10b981 !important; }
          @media (min-width: 768px) {
            .footer-bottom { flex-direction: row; justify-content: space-between; margin-top: 6rem; }
          }
        `}</style>
      </footer>
  );
};

export default Footer;