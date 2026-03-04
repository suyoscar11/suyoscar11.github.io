import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import {
  Shield, Home, Zap, Calculator, TrendingUp, Users,
  ChevronRight, Lock, AlertTriangle, Info, LogOut
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard',      Icon: Home        },
  { to: '/runway',    label: 'Financial Runway', Icon: Zap         },
  { to: '/tax',       label: 'Tax Simulator',  Icon: Calculator  },
  { to: '/wealth',    label: 'Wealth Builder', Icon: TrendingUp  },
  { to: '/rise-admin',label: 'RISE Admin',     Icon: Users       },
]

const PersonaIcon = ({ name, ...p }) => {
  if (name === 'AlertTriangle') return <AlertTriangle {...p} />
  if (name === 'Info')          return <Info {...p} />
  return <TrendingUp {...p} />
}

export default function Layout() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { persona, personas, runway, userName, resetSetup } = useApp()
  const cfg = personas[persona]

  const handleReset = () => { resetSetup(); navigate('/') }

  const aiTips = [
    { text: cfg.tip,                                                    color: cfg.color },
    { text: 'Plaid sync ready — link your bank for real-time updates.', color: '#3B82F6' },
    { text: 'AES-256 active. Data anonymized before RISE Dashboard.',   color: '#10B981' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-app">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-64 flex flex-col flex-shrink-0 border-r border-white/5"
        style={{ background: 'rgba(0,8,20,0.9)' }}>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #D4AF37' }}>
              <Shield size={17} color="#D4AF37" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-sm leading-none">Fisk Navigator</h1>
              <p className="text-xs text-gold mt-0.5">Financial Intelligence</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-0.5">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`
              }>
              {({ isActive }) => (
                <>
                  <Icon size={15} color={isActive ? '#D4AF37' : '#475569'} />
                  {label}
                  {isActive && <ChevronRight size={13} color="#D4AF37" className="ml-auto" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Persona Badge */}
        <div className="mx-3 px-4 py-3 rounded-xl"
          style={{ background: `${cfg.color}12`, border: `1px solid ${cfg.color}28` }}>
          <div className="flex items-center gap-1.5 mb-1">
            <PersonaIcon name={cfg.icon} size={12} color={cfg.color} />
            <span className="text-xs font-semibold" style={{ color: cfg.color }}>Active Mode</span>
          </div>
          <p className="text-white text-sm font-semibold">{persona}</p>
          <p className="text-xs text-slate-500 mt-1">
            Runway:{' '}
            <span className="font-num font-semibold"
              style={{ color: runway < 0 ? '#EF4444' : '#10B981' }}>
              {runway < 0 ? '-' : '+'}${Math.abs(runway).toLocaleString()}
            </span>
          </p>
        </div>

        {/* AI Feed */}
        <div className="flex-1 px-3 pt-4 overflow-auto min-h-0">
          <p className="text-xs text-slate-600 px-2 mb-3 uppercase tracking-widest">Smart AI Feed</p>
          <div className="space-y-2">
            {aiTips.map((t, i) => (
              <motion.div key={i + persona}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="px-3 py-2.5 rounded-xl text-xs"
                style={{ background: `${t.color}0d`, border: `1px solid ${t.color}1a` }}>
                <p className="text-slate-300 leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 pb-4 pt-3 border-t border-white/5 space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-600">
            <Lock size={11} color="#334155" />
            <span>AES-256 Encrypted · Anonymized</span>
          </div>
          <button onClick={handleReset}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-400 transition-colors">
            <LogOut size={11} />
            Reset & Restart
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="h-full">
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
