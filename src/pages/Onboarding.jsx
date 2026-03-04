import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ArrowRight, ArrowLeft, Check, Plus, Trash2, Calendar, Briefcase } from 'lucide-react'
import { useApp } from '../context/AppContext'

const STEP_COUNT = 3

const variants = {
  enter:  dir => ({ x: dir > 0 ?  60 : -60, opacity: 0 }),
  center:      () => ({ x: 0, opacity: 1 }),
  exit:   dir => ({ x: dir > 0 ? -60 :  60, opacity: 0 }),
}

export default function Onboarding() {
  const navigate  = useNavigate()
  const {
    userName, setUserName, balance, setBalance,
    fixedFees, setFixedFees, hasIntern, setHasIntern,
    company, setCompany, weeklyPay, setWeeklyPay,
    daysLeft, setDaysLeft, events, addEvent, removeEvent,
    setSetupDone,
  } = useApp()

  const [step, setStep] = useState(1)
  const [dir,  setDir]  = useState(1)
  const [evtName, setEvtName] = useState('')
  const [evtCost, setEvtCost] = useState('')

  const go = (next) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const finish = () => {
    setSetupDone(true)
    navigate('/dashboard')
  }

  const handleAddEvent = () => {
    addEvent(evtName, evtCost)
    setEvtName(''); setEvtCost('')
  }

  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #D4AF37' }}>
          <Shield size={17} color="#D4AF37" />
        </div>
        <span className="font-display font-bold text-white text-lg">Fisk Navigator</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map(s => (
          <div key={s} className="flex items-center gap-2">
            <motion.div
              animate={{ scale: step === s ? 1.1 : 1 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              style={{
                background: s < step ? '#D4AF37' : s === step ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.06)',
                border: s <= step ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                color: s < step ? '#001F3F' : s === step ? '#D4AF37' : '#475569',
              }}>
              {s < step ? <Check size={14} /> : s}
            </motion.div>
            {s < STEP_COUNT && (
              <div className="w-12 h-0.5 rounded-full"
                style={{ background: s < step ? '#D4AF37' : 'rgba(255,255,255,0.08)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-md glass p-8 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}>

            {/* ── Step 1: Baseline ──────────────────────── */}
            {step === 1 && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Step 1 of 3</p>
                <h2 className="font-display font-bold text-2xl text-white mb-2">Your Baseline</h2>
                <p className="text-slate-400 text-sm mb-7">Tell us where you stand financially right now.</p>

                <div className="space-y-5">
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Your Name (optional)</label>
                    <input
                      type="text" value={userName} onChange={e => setUserName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full glass-dark px-4 py-3 text-white outline-none placeholder:text-slate-600 text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Current Balance</label>
                    <div className="flex items-center gap-2 glass-dark px-4 py-3">
                      <span className="font-bold text-[#D4AF37] text-lg">$</span>
                      <input type="number" value={balance} onChange={e => setBalance(+e.target.value)}
                        className="bg-transparent text-white w-full outline-none font-num text-xl" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">Total money you have available right now</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs text-slate-400">Fixed Fees</label>
                      <span className="text-xs font-num font-bold text-[#D4AF37]">
                        ${fixedFees.toLocaleString()}
                      </span>
                    </div>
                    <input type="range" min="500" max="5000" step="50"
                      value={fixedFees} onChange={e => setFixedFees(+e.target.value)}
                      className="range-gold" />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>$500</span>
                      <span>Tuition, housing, meal plan, etc.</span>
                      <span>$5,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Income ────────────────────────── */}
            {step === 2 && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Step 2 of 3</p>
                <h2 className="font-display font-bold text-2xl text-white mb-2">Your Income</h2>
                <p className="text-slate-400 text-sm mb-7">Do you have an internship or other income this semester?</p>

                {/* Toggle */}
                <div className="flex gap-3 mb-6">
                  {[true, false].map(val => (
                    <button key={String(val)}
                      onClick={() => setHasIntern(val)}
                      className="flex-1 py-4 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-2"
                      style={{
                        background: hasIntern === val ? (val ? 'rgba(212,175,55,0.15)' : 'rgba(59,130,246,0.12)') : 'rgba(255,255,255,0.04)',
                        border: hasIntern === val ? `1px solid ${val ? '#D4AF37' : '#3B82F6'}50` : '1px solid rgba(255,255,255,0.08)',
                        color: hasIntern === val ? (val ? '#D4AF37' : '#3B82F6') : '#64748b',
                      }}>
                      {val ? <Briefcase size={20} /> : <span style={{ fontSize: 20 }}>🎓</span>}
                      {val ? 'Yes, I have an internship' : 'No, I\'m a full-time student'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {hasIntern ? (
                    <motion.div key="intern"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }} className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Company</label>
                        <select value={company} onChange={e => setCompany(e.target.value)}
                          className="w-full glass-dark px-4 py-3 text-white text-sm outline-none"
                          style={{ background: 'rgba(0,15,35,0.55)', borderRadius: 12 }}>
                          {['Microsoft','Google','Amazon','Meta','Apple','Other'].map(c =>
                            <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <label className="text-xs text-slate-400">Weekly Pay</label>
                          <span className="text-xs font-num font-bold text-[#D4AF37]">${weeklyPay.toLocaleString()}</span>
                        </div>
                        <input type="range" min="500" max="4000" step="50"
                          value={weeklyPay} onChange={e => setWeeklyPay(+e.target.value)}
                          className="range-gold" />
                        <p className="text-xs text-slate-600 mt-1">
                          Spendable after tax: <span className="text-green-400 font-num">${Math.round(weeklyPay * 0.75).toLocaleString()}/wk</span>
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="student"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-xs text-slate-400">Days until next semester</label>
                        <span className="text-xs font-num font-bold text-[#D4AF37]">{daysLeft}d</span>
                      </div>
                      <input type="range" min="30" max="365"
                        value={daysLeft} onChange={e => setDaysLeft(+e.target.value)}
                        className="range-gold" />
                      <p className="text-xs text-slate-600 mt-1">Used to calculate your Financial Oxygen days</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ── Step 3: Calendar ──────────────────────── */}
            {step === 3 && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Step 3 of 3</p>
                <h2 className="font-display font-bold text-2xl text-white mb-2">Upcoming Costs</h2>
                <p className="text-slate-400 text-sm mb-6">
                  Any known expenses? These shrink your runway <em>today</em> so you don't overspend.
                </p>

                <div className="space-y-2 mb-4 max-h-48 overflow-auto">
                  <AnimatePresence>
                    {events.map(ev => (
                      <motion.div key={ev.id}
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between glass-dark px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} color="#475569" />
                          <span className="text-white text-sm">{ev.name}</span>
                          <span className="text-slate-500 text-xs">{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-num text-sm font-semibold text-[#D4AF37]">${ev.cost}</span>
                          <button onClick={() => removeEvent(ev.id)}
                            className="text-slate-600 hover:text-red-400 transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex gap-2 mb-5">
                  <input placeholder="Event name" value={evtName}
                    onChange={e => setEvtName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddEvent()}
                    className="glass-dark px-3 py-2.5 text-sm text-white flex-1 outline-none placeholder:text-slate-600" />
                  <input placeholder="$" value={evtCost}
                    onChange={e => setEvtCost(e.target.value)} type="number"
                    onKeyDown={e => e.key === 'Enter' && handleAddEvent()}
                    className="glass-dark px-3 py-2.5 text-sm text-white w-16 outline-none placeholder:text-slate-600" />
                  <button onClick={handleAddEvent}
                    className="px-3 py-2.5 rounded-xl text-[#001F3F] font-bold flex-shrink-0 hover:opacity-80 transition-all"
                    style={{ background: '#D4AF37', borderRadius: 10 }}>
                    <Plus size={15} />
                  </button>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  You can always add or edit events from the dashboard
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6 w-full max-w-md">
        {step > 1 && (
          <button onClick={() => go(step - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-400 glass hover:text-white transition-colors">
            <ArrowLeft size={15} /> Back
          </button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => step < STEP_COUNT ? go(step + 1) : finish()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', color: '#001F3F' }}>
          {step < STEP_COUNT ? (
            <><span>Continue</span><ArrowRight size={15} /></>
          ) : (
            <><Check size={15} /><span>Launch My Dashboard</span></>
          )}
        </motion.button>
      </div>

      <button onClick={() => navigate('/')}
        className="mt-4 text-xs text-slate-600 hover:text-slate-400 transition-colors">
        ← Back to home
      </button>
    </div>
  )
}
