import { useApp } from '../context/AppContext'
import RunwayBar from '../components/RunwayBar'
import ScenarioPlanner from '../components/ScenarioPlanner'

export default function RunwayPage() {
  const { persona, personas } = useApp()
  const cfg = personas[persona]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-white mb-1">Financial Runway</h1>
        <p className="text-slate-400 text-sm">
          See exactly how many days your money lasts — including calendar events you haven't paid for yet.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <RunwayBar />
        </div>
        <div className="col-span-2">
          <ScenarioPlanner />
        </div>
      </div>
    </div>
  )
}
