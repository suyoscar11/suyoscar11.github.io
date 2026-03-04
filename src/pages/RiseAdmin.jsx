import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, TrendingUp, AlertTriangle, Shield, Users, Check } from 'lucide-react'

const HEATMAP = [
  { dept: 'STEM',       gap: 12, be: 34, surplus: 28 },
  { dept: 'Business',   gap: 8,  be: 22, surplus: 45 },
  { dept: 'Arts',       gap: 18, be: 29, surplus: 15 },
  { dept: 'Humanities', gap: 15, be: 31, surplus: 20 },
]

const METRICS = [
  { label: 'Avg Student Runway',   val: '$1,247', sub: '+12% vs last semester',   Icon: TrendingUp,    color: '#10B981' },
  { label: 'Total Internships',    val: '143',    sub: 'STEM: 67 · Business: 76', Icon: Users,         color: '#D4AF37' },
  { label: 'Students in Gap Mode', val: '38',     sub: '15% of active users',     Icon: AlertTriangle, color: '#EF4444' },
  { label: 'Safety Net Achieved',  val: '201',    sub: '79% of active users',     Icon: Shield,        color: '#10B981' },
]

export default function RiseAdmin() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin]       = useState('')
  const [err, setErr]       = useState(false)

  const attempt = () => {
    if (pin === '1868') { setAuthed(true); setErr(false) }
    else { setErr(true); setPin('') }
  }

  if (!authed) return (
    <div className="flex flex-col items-center justify-center min-h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass p-10 w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #D4AF3766' }}>
          <Lock size={28} color="#D4AF37" />
        </div>
        <h2 className="font-display font-bold text-xl text-white mb-1">RISE Admin Portal</h2>
        <p className="text-xs text-slate-500 mb-7">Protected route · Authorized personnel only</p>

        <input
          type="password" placeholder="Enter PIN" value={pin}
          onChange={e => { setPin(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          maxLength={4}
          className="w-full glass-dark px-4 py-3 rounded-xl text-white text-center text-2xl font-num tracking-[0.5em] outline-none mb-3"
          style={{ borderColor: err ? '#EF444466' : undefined }} />

        <AnimatePresence>
          {err && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-xs text-red-400 mb-3">
              Incorrect PIN. Try again.
            </motion.p>
          )}
        </AnimatePresence>

        <button onClick={attempt}
          className="w-full py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', color: '#001F3F' }}>
          Access Dashboard
        </button>
        <p className="text-xs text-slate-600 mt-4">Hint: Fisk University founding year</p>
      </motion.div>
    </div>
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">RISE Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">Aggregate metrics · Individual data anonymized</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-semibold">Live</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        {METRICS.map(({ label, val, sub, Icon, color }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass p-5 glass-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
                <Icon size={16} color={color} />
              </div>
              <span className="font-num font-bold text-2xl text-white">{val}</span>
            </div>
            <p className="text-sm text-slate-300 font-medium">{label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass p-6 mb-6">
        <h3 className="font-semibold text-white mb-5">Financial Risk Heatmap — By Department</h3>
        <div className="space-y-4">
          {HEATMAP.map(({ dept, gap, be, surplus }) => {
            const total = gap + be + surplus
            return (
              <div key={dept}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">{dept}</span>
                  <span className="text-slate-600">{total} students</span>
                </div>
                <div className="flex h-7 rounded-xl overflow-hidden gap-0.5">
                  {[
                    { val: gap,    color: '#EF4444', label: 'Gap'        },
                    { val: be,     color: '#3B82F6', label: 'Break-Even' },
                    { val: surplus,color: '#10B981', label: 'Surplus'    },
                  ].map(({ val, color, label }) => (
                    <motion.div key={label}
                      initial={{ width: 0 }} animate={{ width: `${(val / total) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full flex items-center justify-center text-xs font-bold text-white overflow-hidden"
                      style={{ background: color }}
                      title={`${label}: ${val}`}>
                      {val > 8 ? val : ''}
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
          <div className="flex gap-5 pt-1">
            {[['#EF4444','Gap'],['#3B82F6','Break-Even'],['#10B981','Surplus']].map(([c,l]) => (
              <div key={l} className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="w-3 h-3 rounded-sm" style={{ background: c }} />{l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Cards */}
      <div className="grid grid-cols-2 gap-5">
        {[
          {
            Icon: Lock, color: '#3B82F6', title: 'Plaid Integration',
            badge: 'Coming Soon',
            body: 'Directly link student bank accounts for real-time runway. No credentials stored. No manual entry required.',
          },
          {
            Icon: Shield, color: '#10B981', title: 'AES-256 Security',
            badge: null,
            body: 'All data encrypted and anonymized before reaching this dashboard. Organizers see trends, not individual transactions.',
          },
        ].map(({ Icon, color, title, badge, body }) => (
          <div key={title} className="glass p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} color={color} />
              <h3 className="text-white text-sm font-semibold">{title}</h3>
              {badge && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded font-medium"
                  style={{ background: `${color}18`, color }}>
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
