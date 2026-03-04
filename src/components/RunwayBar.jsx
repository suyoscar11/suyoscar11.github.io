import { motion } from 'framer-motion'
import { Zap, Calendar } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function RunwayBar() {
  const { balance, totalExp, daysLeft, persona, personas, events } = useApp()

  const pct    = Math.min(100, Math.max(0, (balance / Math.max(1, totalExp)) * 100))
  const daysO2 = Math.round((balance / Math.max(1, totalExp)) * daysLeft)
  const gap    = Math.max(0, daysLeft - daysO2)
  const color  = persona === 'Gap' ? '#EF4444' : persona === 'Break-Even' ? '#3B82F6' : '#10B981'

  return (
    <div className="glass p-6 glass-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl" style={{ background: `${color}18` }}>
          <Zap size={20} color={color} />
        </div>
        <div>
          <h2 className="font-semibold text-white">Financial Oxygen</h2>
          <p className="text-xs text-slate-400">How many days your money lasts</p>
        </div>
      </div>

      {/* Big Number */}
      <div className="text-center mb-8">
        <motion.p
          key={daysO2}
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="font-num font-bold leading-none"
          style={{ fontSize: 80, color }}>
          {daysO2}
        </motion.p>
        <p className="text-slate-400 text-sm mt-2">Days of Financial Oxygen</p>
        {gap > 0 && (
          <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
            {gap} day gap before semester starts
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Today</span>
          <span>Semester ({daysLeft}d)</span>
        </div>
        <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full relative"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}>
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/60 rounded-full" />
          </motion.div>
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span style={{ color }}>{pct.toFixed(0)}% of runway covered</span>
          <span className="text-slate-500">${totalExp.toLocaleString()} total needed</span>
        </div>
      </div>

      {/* Calendar Drag */}
      {events.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-3">Calendar events eating into your runway</p>
          <div className="space-y-2">
            {events.map(ev => {
              const d = Math.round((ev.cost / Math.max(1, totalExp)) * daysLeft)
              return (
                <div key={ev.id} className="flex items-center gap-3 text-sm">
                  <Calendar size={13} color="#475569" className="flex-shrink-0" />
                  <span className="text-slate-300 flex-1">{ev.name}</span>
                  <span className="text-xs text-slate-500">{ev.date}</span>
                  <span className="font-num text-xs font-semibold" style={{ color: '#F87171' }}>
                    −{d}d
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
