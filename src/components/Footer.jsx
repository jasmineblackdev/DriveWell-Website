import React from 'react'
import { Link } from 'react-router-dom'
import { Truck } from 'lucide-react'

const Footer = () => (
  <footer style={{ background: '#0f172a', color: 'white', padding: '60px 0 32px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '48px' }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={20} color="white" />
            </div>
            <span style={{ fontWeight: '800', fontSize: '18px' }}>DriveWell</span>
          </div>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
            The health & DOT compliance platform built for CDL drivers and the fleets that depend on them.
          </p>
        </div>

        {/* Product */}
        <div>
          <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '14px', color: '#e2e8f0' }}>Product</p>
          {[['For Drivers', '/drivers'], ['For Fleets', '/fleets'], ['For Trainers', '/trainers'], ['Pricing', '/pricing']].map(([l, p]) => (
            <Link key={p} to={p} style={{ display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>{l}</Link>
          ))}
        </div>

        {/* Features */}
        <div>
          <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '14px', color: '#e2e8f0' }}>Features</p>
          {['DOT Readiness Score', 'Workout Library', 'Nutrition Tracking', 'Sleep Health', 'Fleet Dashboard', 'Insurance Reports'].map(f => (
            <p key={f} style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>{f}</p>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '14px', color: '#e2e8f0' }}>Company</p>
          {['About', 'Blog', 'Press', 'Careers', 'Contact'].map(f => (
            <p key={f} style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px' }}>{f}</p>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontSize: '13px', color: '#64748b' }}>© {new Date().getFullYear()} DriveWell. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map(l => (
            <a key={l} href="#" style={{ fontSize: '13px', color: '#64748b' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
