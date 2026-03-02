import React, { useEffect } from 'react';
import '../App.css';
import { Leaf, ShieldCheck, Scale, Lock, FileText, ChevronRight, AlertCircle, Info, Users } from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const GreeNloansTerms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const sections = [
    { id: "eligibility", title: "1. Eligibility & Registration" },
    { id: "loans", title: "2. Loan Disbursement & Interest" },
    { id: "repayment", title: "3. Repayment & Defaults" },
    { id: "privacy", title: "4. Data & CRB Reporting" },
    { id: "conduct", title: "5. User Conduct" },
    { id: "liability", title: "6. Limitation of Liability" }
  ];

  return (
    <div className="app-container" style={{ backgroundColor: '#050505', color: '#ccc', lineHeight: '1.8' }}>
      <TopNav />

      {/* --- HEADER --- */}
      <header style={{ paddingTop: '10rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, #06261d 0%, #050505 100%)' }}>
        <center className="reveal">
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: 'fit-content', padding: '5px 15px', borderRadius: '50px', border: '1px solid #10b981', marginBottom: '1rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800 }}>LEGAL FRAMEWORK V2.1</span>
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', marginBottom: '1rem', fontSize: '3rem' }}>
            Terms of <span style={{color: '#10b981'}}>Service</span>
          </h1>
          <p style={{ maxWidth: '600px', opacity: 0.7 }}>Last updated: February 2026. These terms govern your relationship with GreeNhub eResources Ltd.</p>
        </center>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 10rem', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
        
        {/* --- TABLE OF CONTENTS --- */}
        <aside className="reveal sticky-toc">
          <div style={{ background: '#0a0a0a', padding: '2rem', borderRadius: '25px', border: '1px solid #1a1a1a' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800 }}>SECTIONS</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`} className="toc-link">
                  {s.title} <ChevronRight size={14} color="#10b981" />
                </a>
              ))}
            </nav>
            <hr style={{ border: 'none', borderTop: '1px solid #1a1a1a', margin: '2rem 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.75rem' }}>
              <Info size={16} />
              <span>Need help? Call +260 978 330929</span>
            </div>
          </div>
        </aside>

        {/* --- LEGAL CONTENT --- */}
        <div className="reveal legal-body" style={{ color: '#aaa', fontSize: '1rem' }}>
          
          <section id="eligibility">
            <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck color="#10b981" /> 1. Eligibility & Registration
            </h2>
            <p>To access GreeNloans, you must be a resident of Zambia and at least 18 years of age. By registering, you represent that all information provided—including your <strong>National Registration Card (NRC)</strong> and TPIN—is accurate and belongs to you.</p>
            <p>GreeNhub eResources Ltd reserves the right to decline any registration without providing specific reasons, particularly if the applicant does not meet our internal risk assessment criteria.</p>
          </section>

          <section id="loans">
            <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Scale color="#10b981" /> 2. Loan Disbursement & Interest
            </h2>
            <p>Loan products including the <strong>Marketeers Loan</strong>, <strong>Intemba Loan</strong>, and <strong>BYD Project Loan</strong> carry specific interest rates as displayed during the application process. These rates are calculated in accordance with Bank of Zambia fair-lending guidelines.</p>
            <ul className="legal-list">
              <li><strong>Disbursement:</strong> Funds are sent via Mobile Money (Airtel/MTN/Zamtel) or direct bank transfer.</li>
              <li><strong>Processing Fees:</strong> A one-time administrative fee may be deducted from the principal amount before disbursement.</li>
              <li><strong>Interest:</strong> Interest begins accruing from the moment the funds are successfully moved to your account.</li>
            </ul>
          </section>

          <section id="repayment">
            <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle color="#10b981" /> 3. Repayment & Defaults
            </h2>
            <p>Repayments must be made on or before the due date specified in your loan schedule. GreeNhub provides multiple repayment channels including USSD, Mobile App, and Office deposits.</p>
            <div style={{ padding: '1.5rem', background: '#0a1a14', borderLeft: '4px solid #10b981', marginTop: '1.5rem', borderRadius: '0 15px 15px 0' }}>
              <h4 style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem' }}>LATE PAYMENT POLICY</h4>
              <p style={{ fontSize: '0.85rem', color: '#ccc', margin: 0 }}>
                Late payments incur a penalty fee of 5% of the outstanding balance for every 7 days of default. Continued default exceeding 30 days will trigger a formal collection process.
              </p>
            </div>
          </section>

          <section id="privacy">
            <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock color="#10b981" /> 4. Data & CRB Reporting
            </h2>
            <p>We respect your privacy under the <strong>Data Protection Act of Zambia</strong>. However, to maintain the integrity of our lending platform, you agree to the following:</p>
            <p>By using GreeNloans, you authorize GreeNhub eResources Ltd to share your credit performance data (both positive and negative) with registered <strong>Credit Reference Bureaus (CRB)</strong>. This may affect your ability to borrow from other financial institutions.</p>
          </section>

          <section id="conduct">
            <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users color="#10b981" /> 5. User Conduct
            </h2>
            <p>You agree not to use the loan funds for any illegal activities as defined by the laws of the Republic of Zambia. Any attempt to defraud the system via identity theft or falsified business records will be reported to the <strong>Zambia Police Service</strong> and the <strong>Financial Intelligence Centre (FIC)</strong>.</p>
          </section>

          <section id="liability">
            <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText color="#10b981" /> 6. Limitation of Liability
            </h2>
            <p>GreeNhub eResources Ltd shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the service. We do not guarantee that the App will be uninterrupted or error-free at all times due to third-party network providers (Mobile Money networks).</p>
          </section>

        </div>
      </main>

      <Footer />

      <style>{`
        .legal-body p { margin-bottom: 1.5rem; color: #999; }
        .legal-body section { scroll-margin-top: 120px; margin-bottom: 5rem; }
        .toc-link { 
          color: #888; 
          text-decoration: none; 
          font-size: 0.85rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          transition: 0.3s;
          font-weight: 600;
        }
        .toc-link:hover { color: #10b981; transform: translateX(5px); }
        .legal-list { padding-left: 1.2rem; margin-bottom: 1.5rem; }
        .legal-list li { margin-bottom: 0.8rem; color: #999; }
        
        @media (min-width: 900px) {
          main { grid-template-columns: 320px 1fr; }
          .sticky-toc { position: sticky; top: 120px; height: fit-content; }
        }
      `}</style>
    </div>
  );
};

export default GreeNloansTerms;