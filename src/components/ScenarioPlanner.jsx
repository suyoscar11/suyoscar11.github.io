import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, Trash2, Briefcase, SlidersHorizontal } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ScenarioPlanner() {
  const {
    balance, setBalance, fixedFees, setFixedFees,
    hasIntern, setHasIntern, company, setCompany,
    weeklyPay, setWeeklyPay, daysLeft, setDaysLeft,
    events, addEvent, removeEvent,
    persona, personas, runway, calendarTotal,
  } = useApp()

  const [evtName, setEvtName] = useState('')
  const [evtCost, setEvtCost] = useState('')
  const cfg = personas[persona]

  const handleAdd = () => {
    addEvent(evtName, evtCost)
    setEvtName(''); setEvtCost('')
  }

  return (
    <div className="glass p-6 glass-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl" style={{ background: `${cfg.color}18` }}>
          <SlidersHorizontal size={18} color={cfg.color} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-white">Scenario Planner</h2>
          <p className="text-xs" style={{ color: cfg.color }}>{cfg.label}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: cfg.color }}>
          {persona}
        </span>
      </div>

      <div className="space-y-5">
        {/* Balance */}
        <div>
          <label className="text-xs text-slate-400 mb-1.5 block">Current Balance</label>
          <div className="flex items-center gap-2 glass-dark px-3 py-2.5">
            <span className="font-bold text-[#D4AF37]">$</span>
            <input type="number" value={balance} onChange={e => setBalance(+e.target.value)}
              className="bg-transparent text-white w-full outline-none font-num text-lg" />
          </div>
        </div>

        {/* Fixed Fees */}
        <div>
          <label className="text-xs text-slate-400 mb-1.5 block">Fixed Fees (tuition, housing…)</label>
          <div className="flex items-center gap-2 glass-dark px-3 py-2.5">
            <span className="font-bold text-[#D4AF37]">$</span>
            <input type="number" value={fixedFees} onChange={e => setFixedFees(+e.target.value)}
              className="bg-transparent text-white w-full outline-none font-num text-lg" />
          </div>
        </div>

        {/* Calendar Events */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={13} color="#64748b" />
            <span className="text-xs text-slate-400">Calendar Events</span>
            <span className="ml-auto text-xs font-num text-[#D4AF37]">${calendarTotal} total</span>
          </div>
          <div className="space-y-1.5 mb-2.5">
            <AnimatePresence>
              {events.map(ev => (
                <motion.div key={ev.id}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }}
                  className="flex items-center justify-between glass-dark px-3 py-2">
                  <div>
                    <span className="text-white text-sm">{ev.name}</span>
                    <span className="text-slate-500 text-xs ml-2">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-num text-sm font-semibold text-[#D4AF37]">${ev.cost}</span>
                    <button onClick={() => removeEvent(ev.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            <input placeholder="Event name" value={evtName}
              onChange={e => setEvtName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="glass-dark px-3 py-2 text-sm text-white flex-1 outline-none placeholder:text-slate-600" />
            <input placeholder="$" value={evtCost}
              onChange={e => setEvtCost(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              type="number"
              className="glass-dark px-3 py-2 text-sm text-white w-16 outline-none placeholder:text-slate-600" />
            <button onClick={handleAdd}
              className="px-3 py-2 rounded-xl text-[#001F3F] font-bold transition-all hover:opacity-80 flex-shrink-0"
              style={{ background: '#D4AF37', borderRadius: 10 }}>
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Internship Toggle */}
        <div className="flex items-center justify-between glass-dark px-4 py-3">
          <div className="flex items-center gap-2">
            <Briefcase size={15} color="#94a3b8" />
            <span className="text-sm text-slate-300">Internship Active</span>
          </div>
          <button onClick={() => setHasIntern(!hasIntern)}
            className="relative w-11 h-6 rounded-full transition-all"
            style={{ background: hasIntern ? '#D4AF37' : 'rgba(255,255,255,0.1)' }}>
            <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
              style={{ left: hasIntern ? '24px' : '4px' }} />
          </button>
        </div>

        <AnimatePresence>
          {hasIntern && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Company</label>
                <select value={company} onChange={e => setCompany(e.target.value)}
                  className="glass-dark px-3 py-2.5 text-white text-sm w-full outline-none"
                  style={{ background: 'rgba(0,15,35,0.55)', borderRadius: 12 }}>
                  {['Microsoft','Google','Amazon','Meta','Apple','Other'].map(c =>
                    <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Weekly Pay</label>
                <div className="flex items-center gap-2 glass-dark px-3 py-2.5">
                  <span className="font-bold text-[#D4AF37]">$</span>
                  <input type="number" value={weeklyPay} onChange={e => setWeeklyPay(+e.target.value)}
                    className="bg-transparent text-white w-full outline-none font-num text-lg" />
                </div>
              </div>
            </motion.div>
          )}

          {!hasIntern && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-slate-400">Days to Semester</label>
                <span className="text-xs font-num font-bold text-[#D4AF37]">{daysLeft}d</span>
              </div>
              <input type="range" min="30" max="365" value={daysLeft}
                onChange={e => setDaysLeft(+e.target.value)} className="range-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Strip */}
      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Fixed',    val: `$${fixedFees.toLocaleString()}`,                      color: '#94a3b8'  },
          { label: 'Calendar', val: `$${calendarTotal}`,                                   color: '#D4AF37'  },
          { label: 'Runway',   val: `${runway < 0 ? '-' : '+'}$${Math.abs(runway).toLocaleString()}`,
                               color: runway < 0 ? '#EF4444' : '#10B981' },
        ].map(({ label, val, color }) => (
          <div key={label}>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="font-num font-bold text-sm" style={{ color }}>{val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
