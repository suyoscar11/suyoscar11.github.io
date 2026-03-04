import { motion } from 'framer-motion'
import { Calculator, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { STANDARD_DEDUCTION } from '../utils/taxCalc'

const BARS = [
  { key: 'net',     label: 'Net Income',  dataKey: 'net',     color: '#10B981' },
  { key: 'federal', label: 'Federal Tax', dataKey: 'federal', color: '#3B82F6' },
  { key: 'fica',    label: 'FICA 7.65%',  dataKey: 'fica',    color: '#8B5CF6' },
  { key: 'state',   label: 'State ~5%',   dataKey: 'state',   color: '#F59E0B' },
]

export default function TaxSimulator() {
  const { taxIncome, setTaxIncome, taxData } = useApp()

  return (
    <div className="glass p-6 glass-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.12)' }}>
          <Calculator size={20} color="#10B981" />
        </div>
        <div>
          <h2 className="font-semibold text-white">Tax & What-If Simulator</h2>
          <p className="text-xs text-slate-400">2024 Tax Year · Single Filer</p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-3">
          <label className="text-sm text-slate-300">Summer Earnings</label>
          <span className="font-num font-bold text-2xl text-[#D4AF37]">
            ${taxIncome.toLocaleString()}
          </span>
        </div>
        <input type="range" min="1000" max="80000" step="500"
          value={taxIncome} onChange={e => setTaxIncome(+e.target.value)}
          className="range-gold" />
        <div className="flex justify-between text-xs text-slate-600 mt-1.5">
          <span>$1,000</span><span>$80,000</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Net Take-Home',  val: `$${taxData.net.toLocaleString()}`,     color: '#10B981' },
          { label: 'Tax Liability',  val: `$${taxData.total.toLocaleString()}`,    color: '#EF4444' },
          { label: 'Effective Rate', val: `${taxData.effectiveRate}%`,             color: '#3B82F6' },
          { label: 'Taxable Income', val: `$${taxData.taxable.toLocaleString()}`,  color: '#F59E0B' },
        ].map(({ label, val, color }) => (
          <div key={label} className="glass-dark px-4 py-3 rounded-xl">
            <p className="text-xs text-slate-500">{label}</p>
            <motion.p key={val} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-num font-bold text-lg" style={{ color }}>
              {val}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Breakdown bars */}
      <div className="space-y-2.5 mb-5">
        {BARS.map(({ key, label, dataKey, color }) => (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{label}</span>
              <span className="font-num" style={{ color }}>${taxData[dataKey].toLocaleString()}</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (taxData[dataKey] / Math.max(1, taxIncome)) * 100)}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-1.5 rounded-full" style={{ background: color }} />
            </div>
          </div>
        ))}
      </div>

      {/* AI Tip */}
      <div className="px-4 py-3.5 rounded-xl"
        style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.18)' }}>
        <div className="flex items-start gap-2">
          <Zap size={14} color="#D4AF37" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-[#D4AF37] mb-1">AI Planner</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your paycheck looks like{' '}
              <span className="text-white font-semibold">${(taxIncome / 10 | 0).toLocaleString()}/wk</span>,
              but spendable is only{' '}
              <span className="font-semibold" style={{ color: '#10B981' }}>${(taxData.net / 10 | 0).toLocaleString()}</span>.
              We auto-diverted{' '}
              <span className="font-semibold text-red-400">${(taxData.total / 10 | 0).toLocaleString()}/wk</span> to
              your Tax Vault.
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 mt-3 text-center">
        Std. Deduction ${STANDARD_DEDUCTION.toLocaleString()} applied · Estimates only
      </p>
    </div>
  )
}
