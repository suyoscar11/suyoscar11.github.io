import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Zap, Calculator, TrendingUp, ArrowRight, Users, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'

const features = [
  {
    Icon: Zap,
    color: '#3B82F6',
    title: 'Financial Runway',
    desc: 'See exactly how many days your money lasts before the next semester. Calendar-aware — upcoming fees shrink your runway today.',
  },
  {
    Icon: Calculator,
    color: '#10B981',
    title: 'Tax Simulator',
    desc: 'Drag a slider to see your 2024 tax liability. Auto-calculates federal, FICA, and state taxes with an AI tip on spendable income.',
  },
  {
    Icon: TrendingUp,
    color: '#D4AF37',
    title: 'Wealth Builder',
    desc: 'Landed a Microsoft or Google internship? See how to allocate your summer earnings — 60% Index Funds, with a Tax Vault buffer.',
  },
]

const personas = [
  { label: 'Gap',        color: '#EF4444', tip: 'Critical: 12 days short. Activate Fisk Food Pantry.' },
  { label: 'Break-Even', color: '#3B82F6', tip: 'Tactical: $100 fee in 30 days. Cut $3.33/day now.'   },
  { label: 'Surplus',    color: '#D4AF37', tip: 'Strategy: Safety Net met. Open a Roth IRA today.'     },
]

const stats = [
  { val: '143', label: 'Internships Secured' },
  { val: '$1,247', label: 'Avg Student Runway' },
  { val: '79%', label: 'Students in Surplus' },
  { val: 'AES-256', label: 'Data Encryption' },
]

export default function Landing() {
  const navigate  = useNavigate()
  const { setupDone } = useApp()

  const handleCTA = () => navigate(setupDone ? '/dashboard' : '/setup')

  return (
    <div className="min-h-screen bg-app text-white overflow-x-hidden">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #D4AF37' }}>
            <Shield size={15} color="#D4AF37" />
          </div>
          <span className="font-display font-bold text-white">Fisk Navigator</span>
        </div>
        <div className="flex items-center gap-3">
          {setupDone && (
            <button onClick={() => navigate('/dashboard')}
              className="text-sm text-slate-400 hover:text-white transition-colors">
              Dashboard
            </button>
          )}
          <button onClick={handleCTA}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', color: '#001F3F' }}>
            {setupDone ? 'Open App' : 'Get Started'}
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="text-center pt-16 pb-20 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
            <Shield size={11} />
            Built for Fisk University Students by RISE
          </div>

          <h1 className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Your{' '}
            <span className="gold-text">Financial Intelligence</span>
            <br />Platform
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Know your runway. Simulate your taxes. Build your wealth.
            Fisk Navigator turns your financial anxiety into a clear, actionable plan.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.button
              onClick={handleCTA}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold transition-all"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', color: '#001F3F' }}>
              {setupDone ? 'Open Dashboard' : 'Begin Your Journey'}
              <ArrowRight size={18} />
            </motion.button>
            <button onClick={() => navigate('/rise-admin')}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-slate-300 glass glass-hover">
              <Users size={15} />
              RISE Admin Portal
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="border-y border-white/5 py-6"
        style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-4 gap-6 text-center">
          {stats.map(({ val, label }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}>
              <p className="font-num font-bold text-2xl text-[#D4AF37]">{val}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl text-white mb-3">Three Tools. One Mission.</h2>
          <p className="text-slate-400">Stop guessing. Start navigating.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
          {features.map(({ Icon, color, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass p-6 glass-hover cursor-pointer"
              onClick={handleCTA}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={22} color={color} />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                Explore <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Persona Preview ──────────────────────────────────── */}
      <section className="py-16 px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl text-white mb-3">Your AI Knows Your Situation</h2>
          <p className="text-slate-400">The app adapts in real-time to your financial persona.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
          {personas.map(({ label, color, tip }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass p-5"
              style={{ borderColor: `${color}30` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-white">{label}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: color }}>
                  Mode
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{tip}</p>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full"
                  style={{ width: label === 'Gap' ? '25%' : label === 'Break-Even' ? '50%' : '82%', background: color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Security / Trust ─────────────────────────────────── */}
      <section className="py-12 px-8 max-w-5xl mx-auto">
        <div className="glass p-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { Icon: Lock,   color: '#10B981', title: 'AES-256 Encrypted',     desc: 'Your data is encrypted and anonymized. We never store credentials.' },
              { Icon: Shield, color: '#D4AF37', title: 'Plaid Integration',      desc: 'Coming soon: direct bank sync for real-time runway. No manual entry.' },
              { Icon: Users,  color: '#3B82F6', title: 'RISE Dashboard',         desc: 'Organizers see trends, not transactions. Privacy first.' },
            ].map(({ Icon, color, title, desc }) => (
              <div key={title}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={18} color={color} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ───────────────────────────────────────── */}
      <section className="text-center py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <h2 className="font-display font-bold text-3xl text-white mb-4">Ready to Navigate Your Finances?</h2>
          <p className="text-slate-400 mb-8">Takes 90 seconds to set up. No account required.</p>
          <motion.button
            onClick={handleCTA}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl text-base font-bold"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', color: '#001F3F' }}>
            {setupDone ? 'Back to Dashboard' : 'Get Started — Free'}
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
