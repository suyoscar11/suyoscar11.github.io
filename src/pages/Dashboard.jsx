import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Calculator, TrendingUp, Users, ArrowRight, Shield, AlertTriangle, Info, Settings } from 'lucide-react'
import { useApp } from '../context/AppContext'

const PersonaIcon = ({ name, ...p }) => {
  if (name === 'AlertTriangle') return <AlertTriangle {...p} />
  if (name === 'Info')          return <Info {...p} />
  return <TrendingUp {...p} />
}

const cards = [
  {
    to: '/runway',
    Icon: Zap,
    color: '#3B82F6',
    title: 'Financial Runway',
    desc: 'See how many days your money lasts. Calendar-aware.',
    badge: null,
  },
  {
    to: '/tax',
    Icon: Calculator,
    color: '#10B981',
    title: 'Tax Simulator',
    desc: 'Drag a slider — get your 2024 tax breakdown instantly.',
    badge: null,
  },
  {
    to: '/wealth',
    Icon: TrendingUp,
    color: '#D4AF37',
    title: 'Wealth Builder',
    desc: 'Allocate your internship earnings. Tax vault included.',
    badge: 'Intern',
  },
  {
    to: '/rise-admin',
    Icon: Users,
    color: '#8B5CF6',
    title: 'RISE Admin',
    desc: 'Aggregate metrics for program organizers.',
    badge: 'Admin',
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const {
    userName, balance, safetyNet, persona, personas,
    runway, totalExp, hasIntern, taxData,
  } = useApp()
  const cfg = personas[persona]
  const safetyPct = Math.min(100, (balance / safetyNet) * 100)

  const greeting = userName ? `Good morning, ${userName}` : 'Good morning, Navigator'

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">
            {greeting.split(', ')[0]},{' '}
            <span className="gold-text">{greeting.split(', ').slice(1).join(', ')}</span>
          </h1>
          <p className="text-slate-400">Here's your financial overview for today.</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer"
          style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}30`, color: cfg.color }}
          onClick={() => navigate('/runway')}>
          <PersonaIcon name={cfg.icon} size={14} color={cfg.color} />
          {persona} Mode
        </motion.div>
      </div>

      {/* Persona Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 rounded-2xl flex items-start gap-3"
        style={{ background: `${cfg.color}0e`, border: `1px solid ${cfg.color}25` }}>
        <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: `${cfg.color}20` }}>
          <PersonaIcon name={cfg.icon} size={16} color={cfg.color} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-0.5">{cfg.label}</p>
          <p className="text-sm text-slate-400">{cfg.tip}</p>
        </div>
      </motion.div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Balance',       val: `$${balance.toLocaleString()}`,       color: '#D4AF37', sub: 'Available'       },
          { label: 'Runway',        val: `${runway < 0 ? '-' : '+'}$${Math.abs(runway).toLocaleString()}`, color: runway < 0 ? '#EF4444' : '#10B981', sub: 'After obligations' },
          { label: 'Safety Net',    val: `${safetyPct.toFixed(0)}%`,           color: '#3B82F6', sub: `of $${safetyNet.toLocaleString()} goal` },
          { label: 'Tax Liability', val: `$${taxData.total.toLocaleString()}`, color: '#8B5CF6', sub: `on $${(taxData.taxable).toLocaleString()} taxable` },
        ].map(({ label, val, color, sub }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass p-4 glass-hover">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="font-num font-bold text-2xl" style={{ color }}>{val}</p>
            <p className="text-xs text-slate-600 mt-1">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Safety Net Progress */}
      <div className="glass p-5 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Shield size={16} color="#D4AF37" />
          <span className="text-sm font-semibold text-white">Safety Net Progress</span>
          <span className="ml-auto text-xs font-num text-[#D4AF37]">
            ${balance.toLocaleString()} / ${safetyNet.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${safetyPct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-2.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #D4AF37, #10B981)' }} />
        </div>
        <p className="text-xs text-slate-600 mt-2">
          {safetyPct >= 100
            ? '✓ Safety Net achieved — consider a Roth IRA next'
            : `$${(safetyNet - balance).toLocaleString()} more to reach your $${safetyNet.toLocaleString()} safety net`}
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 gap-5">
        {cards.map(({ to, Icon, color, title, desc, badge }, i) => (
          <motion.button key={to}
            onClick={() => navigate(to)}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="glass p-6 text-left transition-all group"
            style={{ boxShadow: 'none' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}28` }}>
                <Icon size={22} color={color} />
              </div>
              <div className="flex items-center gap-2">
                {badge && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold"
                    style={{ background: `${color}18`, color }}>
                    {badge}
                  </span>
                )}
                {to === '/wealth' && !hasIntern && (
                  <span className="px-2 py-0.5 rounded-md text-xs text-slate-600"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    Enable internship
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">{desc}</p>
            <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
              style={{ color }}>
              Explore <ArrowRight size={14} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Edit Profile hint */}
      <div className="mt-6 flex items-center justify-center">
        <button onClick={() => navigate('/setup')}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
          <Settings size={12} />
          Edit your profile &amp; balances
        </button>
      </div>
    </div>
  )
}
