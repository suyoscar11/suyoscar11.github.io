import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { calcTax } from '../utils/taxCalc'

const Ctx = createContext()
export const useApp = () => useContext(Ctx)

const DEFAULT_EVENTS = [
  { id: 1, name: 'Spring Formal',   cost: 50,  date: 'Apr 12' },
  { id: 2, name: 'Graduation Fees', cost: 200, date: 'May 8'  },
  { id: 3, name: 'Lab Fee',         cost: 75,  date: 'Sep 2'  },
]

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export function AppProvider({ children }) {
  const [setupDone,  setSetupDone]  = useState(() => load('fn_setupDone',  false))
  const [userName,   setUserName]   = useState(() => load('fn_userName',   ''))
  const [balance,    setBalance]    = useState(() => load('fn_balance',    1700))
  const [fixedFees,  setFixedFees]  = useState(() => load('fn_fixedFees',  1300))
  const [hasIntern,  setHasIntern]  = useState(() => load('fn_hasIntern',  false))
  const [company,    setCompany]    = useState(() => load('fn_company',    'Microsoft'))
  const [weeklyPay,  setWeeklyPay]  = useState(() => load('fn_weeklyPay',  1500))
  const [daysLeft,   setDaysLeft]   = useState(() => load('fn_daysLeft',   120))
  const [taxIncome,  setTaxIncome]  = useState(() => load('fn_taxIncome',  15000))
  const [events,     setEvents]     = useState(() => load('fn_events',     DEFAULT_EVENTS))

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('fn_setupDone', JSON.stringify(setupDone)) }, [setupDone])
  useEffect(() => { localStorage.setItem('fn_userName',  JSON.stringify(userName))  }, [userName])
  useEffect(() => { localStorage.setItem('fn_balance',   JSON.stringify(balance))   }, [balance])
  useEffect(() => { localStorage.setItem('fn_fixedFees', JSON.stringify(fixedFees)) }, [fixedFees])
  useEffect(() => { localStorage.setItem('fn_hasIntern', JSON.stringify(hasIntern)) }, [hasIntern])
  useEffect(() => { localStorage.setItem('fn_company',   JSON.stringify(company))   }, [company])
  useEffect(() => { localStorage.setItem('fn_weeklyPay', JSON.stringify(weeklyPay)) }, [weeklyPay])
  useEffect(() => { localStorage.setItem('fn_daysLeft',  JSON.stringify(daysLeft))  }, [daysLeft])
  useEffect(() => { localStorage.setItem('fn_taxIncome', JSON.stringify(taxIncome)) }, [taxIncome])
  useEffect(() => { localStorage.setItem('fn_events',    JSON.stringify(events))    }, [events])

  // Derived
  const calendarTotal = events.reduce((s, e) => s + e.cost, 0)
  const totalExp      = fixedFees + calendarTotal
  const runway        = balance - totalExp
  const persona       = runway < 0 ? 'Gap' : runway < 500 ? 'Break-Even' : 'Surplus'
  const safetyNet     = 8000

  const taxData   = useMemo(() => calcTax(taxIncome),      [taxIncome])
  const summerTax = useMemo(() => calcTax(weeklyPay * 10), [weeklyPay])

  const personas = {
    'Gap': {
      color: '#EF4444', border: 'border-red-500/40', bg: 'bg-red-500/10',
      icon: 'AlertTriangle', label: 'Gap — Critical Alert',
      tip: `Critical Alert: Your runway ends ${Math.abs(Math.round(runway / Math.max(1, totalExp / 120)))} days before semester. Use the Fisk Food Pantry to save $60 this week.`,
    },
    'Break-Even': {
      color: '#3B82F6', border: 'border-blue-500/40', bg: 'bg-blue-500/10',
      icon: 'Info', label: 'Break-Even — Tactical Mode',
      tip: `Tactical Move: Your calendar shows $${calendarTotal} in upcoming costs. Reduce misc spend by $${Math.max(1, (calendarTotal / Math.max(1, daysLeft)).toFixed(2))}/day to stay level.`,
    },
    'Surplus': {
      color: '#D4AF37', border: 'border-yellow-500/40', bg: 'bg-yellow-500/10',
      icon: 'TrendingUp', label: 'Surplus — Growth Mode',
      tip: balance >= safetyNet
        ? `Strategy: You've exceeded your $${safetyNet.toLocaleString()} Safety Net. Redirect the next $500 into a Roth IRA while your tax bracket is low.`
        : `You're ${Math.round((balance / safetyNet) * 100)}% to your $${safetyNet.toLocaleString()} Safety Net. Keep building!`,
    },
  }

  const addEvent = (name, cost) => {
    if (!name || !cost) return
    setEvents(p => [...p, { id: Date.now(), name, cost: +cost || 0, date: 'TBD' }])
  }
  const removeEvent = id => setEvents(p => p.filter(e => e.id !== id))

  const resetSetup = () => {
    setSetupDone(false)
    setUserName(''); setBalance(1700); setFixedFees(1300)
    setHasIntern(false); setCompany('Microsoft'); setWeeklyPay(1500)
    setDaysLeft(120); setTaxIncome(15000); setEvents(DEFAULT_EVENTS)
  }

  return (
    <Ctx.Provider value={{
      setupDone, setSetupDone,
      userName,  setUserName,
      balance,   setBalance,
      fixedFees, setFixedFees,
      hasIntern, setHasIntern,
      company,   setCompany,
      weeklyPay, setWeeklyPay,
      daysLeft,  setDaysLeft,
      taxIncome, setTaxIncome,
      events, addEvent, removeEvent,
      calendarTotal, totalExp, runway, persona, personas, safetyNet,
      taxData, summerTax,
      resetSetup,
    }}>
      {children}
    </Ctx.Provider>
  )
}
