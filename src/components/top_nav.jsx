import React, { useState } from 'react';
import '../App.css';
import '../tailwind.css';
import { Leaf, Menu, X, PhoneCall } from 'lucide-react';
import { Link } from "react-router-dom";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="nav-blur" style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, right: 0 }}>
      <div className="nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Logo Section */}
        <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none' }}>
          <div className="clickable-bounce" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: '#10b981', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>
              <Leaf size={20} color="white" fill="white" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 900, fontSize: '1.2rem', lineHeight: 1, color: 'white', letterSpacing: '-0.5px' }}>GreeNloans</span>
              <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700, trackingLetter: '1px' }}>GREENHUB FINANCIAL</span>
            </div>
          </div>
        </Link>

        <div className="nav-links" style={{ display: 'none', gap: '2.5rem', fontWeight: 600, fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <Link to="/services" className="hover-green" style={{ textDecoration: 'none', color: 'inherit' }}>Loan Services</Link>
          <Link to="/terms" className="hover-green" style={{ textDecoration: 'none', color: 'inherit' }}>Terms Of Usage</Link>
          <Link to="/contact" className="hover-green" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link>
          <Link to="/success_stories" className="hover-green" style={{ textDecoration: 'none', color: 'inherit' }}>Success Stories</Link>
          <Link to="/locations" className="hover-green" style={{ textDecoration: 'none', color: 'inherit' }}>Locations</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="tel:+260978330929" className="clickable-bounce" style={{ display: 'none', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, alignItems: 'center', gap: '8px' }}>
            <PhoneCall size={18} className="text-emerald-500" />
            <span className="desktop-phone">+260 978 330929</span>
          </a>
          
          <button className="cta-pill clickable-bounce" style={{ display: 'none', background: '#10b981', color: 'black', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
            APPLY NOW
          </button>
          
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMenu}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <div className={`mobile-dropdown ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', padding: '3rem 2rem' }}>
          <Link to="/loans" onClick={closeMenu} className="mobile-link">Loan Services</Link>
          <Link to="/chilimba" onClick={closeMenu} className="mobile-link">About us</Link>
          <Link to="/impact" onClick={closeMenu} className="mobile-link">Contact us</Link>
          <Link to="/locations" onClick={closeMenu} className="mobile-link">Our Offices</Link>
          <hr style={{ border: 'none', borderTop: '1px solid #222' }} />
          <a href="tel:+260978330929" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 700 }}>Call Support: +260 978 330929</a>
          <button className="cta-pill" style={{ width: '100%', background: '#10b981', color: 'black', padding: '1rem', borderRadius: '15px', fontWeight: 800 }}>DOWNLOAD APP</button>
        </div>
      </div>

      <style>{`
        .nav-blur { background: rgba(5, 5, 5, 0.8); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .hover-green:hover { color: #10b981 !important; transition: 0.3s; }
        
        @media (min-width: 1024px) {
          .nav-links { display: flex !important; }
          .cta-pill { display: block !important; }
          .desktop-phone { display: inline !important; }
          .clickable-bounce[href^="tel"] { display: flex !important; }
          .mobile-menu-toggle { display: none !important; }
        }

        .mobile-dropdown {
          position: fixed; top: 70px; left: 0; right: 0;
          background: #0a0a0a; max-height: 0; opacity: 0;
          transition: all 0.4s ease-in-out; overflow: hidden;
        }
        .mobile-dropdown.open { max-height: 100vh; opacity: 1; }
        .mobile-link { color: white; text-decoration: none; font-size: 1.5rem; font-weight: 800; }
      `}</style>
    </nav>
  );
};

export default TopNav;