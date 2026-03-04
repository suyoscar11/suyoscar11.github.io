import TaxSimulator from '../components/TaxSimulator'
import { useApp } from '../context/AppContext'
import { Calculator, Info } from 'lucide-react'

export default function TaxPage() {
  const { taxData, taxIncome } = useApp()

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-white mb-1">Tax & What-If Simulator</h1>
        <p className="text-slate-400 text-sm">
          Drag the slider to see your real 2024 tax liability. No surprises in April.
        </p>
      </div>

      {/* Explainer */}
      <div className="glass p-5 mb-6 flex items-start gap-3">
        <Info size={16} color="#3B82F6" className="flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-white">How it works:</strong> Enter your expected summer income.
          The simulator applies the 2024 Standard Deduction (${(14600).toLocaleString()}), then
          calculates federal brackets, FICA (7.65%), and average state tax (~5%).
          The AI suggests how much to withhold each week so you're never caught short in April.
        </div>
      </div>

      <TaxSimulator />
    </div>
  )
}
