import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Briefcase, ArrowRight } from 'lucide-react'
import InternDonut from '../components/InternDonut'
import ScenarioPlanner from '../components/ScenarioPlanner'
import { useApp } from '../context/AppContext'

export default function WealthPage() {
  const navigate  = useNavigate()
  const { hasIntern, setHasIntern, company, weeklyPay } = useApp()

  if (!hasIntern) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass p-10 max-w-sm w-full">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid #D4AF3766' }}>
            <Briefcase size={28} color="#D4AF37" />
          </div>
          <h2 className="font-display font-bold text-xl text-white mb-2">Intern Mode Locked</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            The Wealth Builder is designed for students with internship income.
            Enable your internship in the Scenario Planner to unlock it.
          </p>
          <button
            onClick={() => { setHasIntern(true); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B8960C)', color: '#001F3F' }}>
            <Briefcase size={15} />
            Enable Internship Mode
          </button>
          <button onClick={() => navigate('/runway')}
            className="mt-3 w-full text-xs text-slate-500 hover:text-slate-300 transition-colors py-2">
            View Runway instead →
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-white mb-1">Wealth Builder</h1>
        <p className="text-slate-400 text-sm">
          You landed a <span className="text-[#D4AF37] font-semibold">{company}</span> internship.
          Here's how to make every dollar count — including the ones the IRS will want back.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <InternDonut />
        </div>
        <div className="col-span-2">
          <ScenarioPlanner />
        </div>
      </div>
    </div>
  )
}
