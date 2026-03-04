import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import RunwayPage from './pages/RunwayPage'
import TaxPage from './pages/TaxPage'
import WealthPage from './pages/WealthPage'
import RiseAdmin from './pages/RiseAdmin'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/runway" element={<RunwayPage />} />
          <Route path="/tax" element={<TaxPage />} />
          <Route path="/wealth" element={<WealthPage />} />
          <Route path="/rise-admin" element={<RiseAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}
