import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Shield, Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'

const SLICES = [
  { key: 'index',     label: 'Index Funds',    pct: 60, color: '#D4AF37' },
  { key: 'skill',     label: 'Skill-Arbitrage',pct: 20, color: '#10B981' },
  { key: 'reloc',     label: 'Relocation Cash',pct: 20, color: '#3B82F6' },
]

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="glass px-3 py-2 text-xs">
      <p className="text-white font-semibold">{d.label}</p>
      <p style={{ color: d.color }}>${d.amt.toLocaleString()} ({d.pct}%)</p>
    </div>
  )
}

export default function InternDonut() {
  const { company, weeklyPay } = useApp()
  const summer   = weeklyPay * 10
  const taxBuf   = Math.round(summer * 0.25)
  const spendable = summer - taxBuf
  const weekSpend = Math.round(weeklyPay * 0.75)

  const data = SLICES.map(s => ({
    ...s,
    amt: Math.round(spendable * (s.pct / 100)),
  }))

  return (
    <div className="glass p-6 glass-hover">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl" style={{ background: 'rgba(212,175,55,0.12)' }}>
          <Zap size={20} color="#D4AF37" />
        </div>
        <div>
          <h2 className="font-semibold text-white">Wealth Multiplier</h2>
          <p className="text-xs text-[#D4AF37]">{company} — Intern Mode Active</p>
        </div>
      </div>

      {/* Tax Vault */}
      <div className="mb-5 px-4 py-3 rounded-xl flex items-center gap-3"
        style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <Shield size={16} color="#EF4444" className="flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-red-400">Tax Vault — 25% Buffer</p>
          <p className="text-xs text-slate-400">
            <span className="text-white font-num font-bold">${taxBuf.toLocaleString()}</span> diverted to prevent April tax shock
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut */}
        <div style={{ width: 160, height: 160, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                paddingAngle={3} dataKey="pct">
                {data.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend + stats */}
        <div className="flex-1 space-y-3">
          {data.map(s => (
            <div key={s.key} className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <div className="flex-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{s.label}</span>
                  <span className="font-num text-white">{s.pct}%</span>
                </div>
                <p className="text-xs text-slate-500">${s.amt.toLocaleString()}</p>
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-white/10">
            <p className="text-xs text-slate-500">Weekly Spendable</p>
            <p className="font-num font-bold text-xl" style={{ color: '#10B981' }}>
              ${weekSpend.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">after tax buffer</p>
          </div>
        </div>
      </div>

      {/* Summer summary */}
      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Gross Summer', val: `$${summer.toLocaleString()}`,    color: '#94a3b8' },
          { label: 'Tax Vault',    val: `$${taxBuf.toLocaleString()}`,    color: '#EF4444' },
          { label: 'Investable',   val: `$${spendable.toLocaleString()}`, color: '#D4AF37' },
        ].map(({ label, val, color }) => (
          <div key={label}>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="font-num font-semibold text-sm" style={{ color }}>{val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
