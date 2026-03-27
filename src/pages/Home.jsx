import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, Shield, TrendingUp, Users, CheckCircle2,
  Star, ArrowRight, Truck, Dumbbell, Utensils, Moon,
} from 'lucide-react'

// ── DOT Score Calculator ──────────────────────────────────────────────────────
const DotCalculator = () => {
  const [form, setForm] = useState({ systolic: '', diastolic: '', weight: '', height: '', glucose: '' })
  const [result, setResult] = useState(null)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const calculate = () => {
    const sys = Number(form.systolic)
    const dia = Number(form.diastolic)
    const wt  = Number(form.weight)
    const ht  = Number(form.height)
    const glc = Number(form.glucose)

    let score = 0
    let flags = []

    // BP — 30 pts
    if (dia >= 100) { flags.push({ label: 'Blood Pressure', msg: 'Diastolic ≥ 100 is disqualifying', color: '#dc2626' }) }
    else if (sys < 140) { score += 30 }
    else if (sys <= 159) { score += 15; flags.push({ label: 'Blood Pressure', msg: 'Stage 1 hypertension — improve before your physical', color: '#d97706' }) }
    else { flags.push({ label: 'Blood Pressure', msg: 'Stage 2+ hypertension — high risk of disqualification', color: '#dc2626' }) }

    // BMI — 20 pts
    if (ht > 0 && wt > 0) {
      const bmi = (wt / (ht * ht)) * 703
      if (bmi < 30) { score += 20 }
      else if (bmi < 35) { score += 10; flags.push({ label: 'BMI', msg: `BMI ${bmi.toFixed(1)} — obese range, weight loss recommended`, color: '#d97706' }) }
      else { flags.push({ label: 'BMI', msg: `BMI ${bmi.toFixed(1)} — may trigger sleep apnea evaluation`, color: '#dc2626' }) }
    }

    // Glucose — 20 pts
    if (glc > 0) {
      if (glc < 100) { score += 20 }
      else if (glc < 126) { score += 10; flags.push({ label: 'Blood Glucose', msg: 'Pre-diabetic range — monitor closely', color: '#d97706' }) }
      else { flags.push({ label: 'Blood Glucose', msg: 'Diabetic range — possible FMCSA exemption required', color: '#dc2626' }) }
    }

    // Streak bonus simulation
    score += 15

    const status = score >= 75 ? 'green' : score >= 55 ? 'yellow' : 'red'
    setResult({ score, status, flags })
  }

  const allFilled = form.systolic && form.diastolic && form.weight && form.height && form.glucose

  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>DOT Risk Calculator</h3>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Enter your numbers — see your risk level instantly. No signup required.</p>

      {!result ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            {[
              { key: 'systolic',  label: 'Systolic BP',    placeholder: 'e.g. 135', unit: 'mmHg' },
              { key: 'diastolic', label: 'Diastolic BP',   placeholder: 'e.g. 88',  unit: 'mmHg' },
              { key: 'weight',    label: 'Weight',         placeholder: 'e.g. 245', unit: 'lbs'  },
              { key: 'height',    label: 'Height',         placeholder: 'e.g. 70',  unit: 'in'   },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <div style={{ display: 'flex', border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <input
                    type="number"
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    style={{ flex: 1, padding: '10px 12px', border: 'none', fontSize: '15px', outline: 'none' }}
                  />
                  <span style={{ padding: '10px 12px', background: '#f9fafb', color: '#9ca3af', fontSize: '13px', borderLeft: '1px solid #e5e7eb' }}>{f.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Fasting Blood Glucose</label>
            <div style={{ display: 'flex', border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <input
                type="number"
                placeholder="e.g. 105"
                value={form.glucose}
                onChange={e => set('glucose', e.target.value)}
                style={{ flex: 1, padding: '10px 12px', border: 'none', fontSize: '15px', outline: 'none' }}
              />
              <span style={{ padding: '10px 12px', background: '#f9fafb', color: '#9ca3af', fontSize: '13px', borderLeft: '1px solid #e5e7eb' }}>mg/dL</span>
            </div>
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '14px', opacity: allFilled ? 1 : 0.5 }}
            disabled={!allFilled}
            onClick={calculate}
          >
            Calculate My DOT Risk Score
          </button>
        </>
      ) : (
        <div>
          <div style={{
            textAlign: 'center', padding: '24px', borderRadius: '12px', marginBottom: '20px',
            background: result.status === 'green' ? '#f0fdf4' : result.status === 'yellow' ? '#fefce8' : '#fef2f2',
            border: `2px solid ${result.status === 'green' ? '#86efac' : result.status === 'yellow' ? '#fde047' : '#fca5a5'}`,
          }}>
            <p style={{ fontSize: '52px', fontWeight: '800', color: result.status === 'green' ? '#15803d' : result.status === 'yellow' ? '#a16207' : '#dc2626' }}>
              {result.score}<span style={{ fontSize: '24px', fontWeight: '400', color: '#9ca3af' }}>/100</span>
            </p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: result.status === 'green' ? '#15803d' : result.status === 'yellow' ? '#a16207' : '#dc2626' }}>
              {result.status === 'green' ? 'DOT Ready' : result.status === 'yellow' ? 'At Risk' : 'High Risk'}
            </p>
          </div>

          {result.flags.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Issues to address:</p>
              {result.flags.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px 12px', background: '#fef9f9', borderRadius: '8px', marginBottom: '8px', borderLeft: `3px solid ${f.color}` }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: f.color }}>{f.label}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>{f.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/drivers" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Download DriveWell to Fix It <ArrowRight size={16} />
          </Link>
          <button onClick={() => setResult(null)} style={{ width: '100%', marginTop: '10px', background: 'none', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '11px', cursor: 'pointer', color: '#6b7280', fontSize: '14px' }}>
            Recalculate
          </button>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Home = () => (
  <main>
    {/* HERO */}
    <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)', color: 'white', padding: '80px 0 100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
              <Truck size={14} /> Built for CDL Drivers
            </div>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>
              Stay DOT-Ready.<br />Keep Your CDL.
            </h1>
            <p style={{ fontSize: '20px', opacity: 0.88, marginBottom: '32px', lineHeight: '1.6' }}>
              DriveWell helps truck drivers track their health, pass DOT physicals, and stay on the road — while giving fleet managers real-time visibility to protect their business.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link to="/drivers" className="btn-white">Download Free App</Link>
              <Link to="/fleets" className="btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>Fleet Demo →</Link>
            </div>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[['12,000+', 'CDL Drivers'], ['500+', 'Fleets'], ['94%', 'DOT Pass Rate']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontSize: '26px', fontWeight: '800' }}>{v}</p>
                  <p style={{ fontSize: '13px', opacity: 0.75 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <DotCalculator />
          </div>
        </div>
      </div>
    </section>

    {/* SOCIAL PROOF STRIP */}
    <section style={{ background: '#f9fafb', padding: '28px 0', borderBottom: '1px solid #e5e7eb' }}>
      <div className="container">
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', marginBottom: '20px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trusted by drivers at</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.5 }}>
          {['J.B. Hunt', 'Werner', 'Schneider', 'Swift', 'Knight-Swift', 'CRST'].map(c => (
            <p key={c} style={{ fontSize: '16px', fontWeight: '700', color: '#374151' }}>{c}</p>
          ))}
        </div>
      </div>
    </section>

    {/* THREE AUDIENCES */}
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2>One Platform. Three Audiences.</h2>
          <p className="text-muted" style={{ marginTop: '12px', fontSize: '18px' }}>DriveWell connects drivers, fleet managers, and fitness trainers in one ecosystem.</p>
        </div>
        <div className="grid-3">
          {[
            {
              icon: Truck, color: '#2563eb', bg: '#eff6ff',
              title: 'CDL Drivers',
              desc: 'Track health metrics, complete workouts, log nutrition, screen for sleep apnea, and get your DOT score — all in one mobile app.',
              cta: 'Driver Features', link: '/drivers',
            },
            {
              icon: Users, color: '#7c3aed', bg: '#f5f3ff',
              title: 'Fleet Companies',
              desc: 'Monitor your entire fleet\'s DOT readiness, get renewal alerts 90 days out, and generate insurance compliance reports in one click.',
              cta: 'Fleet Features', link: '/fleets',
            },
            {
              icon: Dumbbell, color: '#ea580c', bg: '#fff7ed',
              title: 'Personal Trainers',
              desc: 'Reach thousands of CDL drivers seeking coaching. List your services, get matched with clients, and deliver programs through the app.',
              cta: 'Trainer Program', link: '/trainers',
            },
          ].map(({ icon: Icon, color, bg, title, desc, cta, link }) => (
            <div key={title} className="card" style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon size={26} color={color} />
              </div>
              <h3 style={{ marginBottom: '10px' }}>{title}</h3>
              <p className="text-muted" style={{ fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>{desc}</p>
              <Link to={link} style={{ color, fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES GRID */}
    <section className="section" style={{ background: '#f9fafb' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2>Everything a Driver Needs to Stay Certified</h2>
          <p className="text-muted" style={{ marginTop: '12px', fontSize: '17px' }}>Built around the real health metrics FMCSA examiners evaluate.</p>
        </div>
        <div className="grid-4">
          {[
            { icon: Activity,   color: '#2563eb', title: 'DOT Score',        desc: 'FMCSA-weighted readiness score updated daily' },
            { icon: Dumbbell,   color: '#7c3aed', title: 'Workouts',         desc: '50+ routines built for truck cabs & parking lots' },
            { icon: Utensils,   color: '#ea580c', title: 'Nutrition',        desc: 'Track macros, find healthy food near truck stops' },
            { icon: Moon,       color: '#0891b2', title: 'Sleep Health',     desc: 'STOP-BANG sleep apnea screening + HOS context' },
            { icon: TrendingUp, color: '#059669', title: 'Progress Trends',  desc: '90-day charts for BP, weight, glucose, and more' },
            { icon: Shield,     color: '#dc2626', title: 'Insurance Reports',desc: 'One-click PDF reports for your insurance carrier' },
            { icon: Users,      color: '#d97706', title: 'Trainer Access',   desc: 'Connect with CDL-specialized coaches on demand' },
            { icon: Star,       color: '#7c3aed', title: 'Telehealth',       desc: 'Book DOT-certified medical examiners directly' },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="card">
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Icon size={22} color={color} />
              </div>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{title}</h3>
              <p className="text-muted" style={{ fontSize: '13px', lineHeight: '1.5' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>What Drivers Are Saying</h2>
        <div className="grid-3">
          {[
            { name: 'Marcus T.', cdl: 'CDL-TX', text: 'My blood pressure was 148/94 — I was terrified of failing my physical. After 3 months on DriveWell, I passed with 128/82. This app literally saved my career.', stars: 5 },
            { name: 'Sharon W.', cdl: 'CDL-FL', text: 'The in-cab workouts are the only thing that works for me. 5 minutes between pickups, 3x a day. Down 18 pounds in 4 months without a gym.', stars: 5 },
            { name: 'Dale H.', cdl: 'CDL-TN', text: 'The sleep apnea screening found I was high risk. Got tested, got my CPAP, and I haven\'t felt this alert driving in years. My fleet manager loves the reports.', stars: 5 },
          ].map((t) => (
            <div key={t.name} className="card">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} color="#eab308" fill="#eab308" />)}
              </div>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div>
                <p style={{ fontWeight: '600', fontSize: '14px' }}>{t.name}</p>
                <p style={{ fontSize: '13px', color: '#9ca3af' }}>{t.cdl}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FLEET CTA */}
    <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '80px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ color: '#93c5fd', fontWeight: '600', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>For Fleet Managers</p>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>One DOT failure costs $2,500+.<br />DriveWell costs $10/driver/month.</h2>
        <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}>
          Real-time driver health visibility. DOT renewal alerts. Insurance compliance reports. For less than a cup of coffee per driver per day.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/fleets" className="btn-primary">Book a Fleet Demo</Link>
          <Link to="/pricing" className="btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>View Pricing</Link>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '14px' }}>Your CDL is your livelihood. Protect it.</h2>
        <p className="text-muted" style={{ fontSize: '18px', marginBottom: '32px' }}>Download DriveWell free. No credit card. No commitment.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/drivers" className="btn-primary" style={{ fontSize: '17px', padding: '16px 32px' }}>
            Download Free — iOS & Android
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px' }}>
          {['Free to start', 'No credit card', 'Cancel anytime'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '14px' }}>
              <CheckCircle2 size={15} color="#22c55e" /> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
)

export default Home
