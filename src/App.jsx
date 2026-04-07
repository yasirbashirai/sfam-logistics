import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/Chatbot.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/services/ServiceDetail.jsx'
import Quote from './pages/Quote.jsx'
import CarrierOnboarding from './pages/CarrierOnboarding.jsx'
import AgentOpportunities from './pages/AgentOpportunities.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Track from './pages/Track.jsx'
import Login from './pages/Login.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminQuotes from './pages/admin/AdminQuotes.jsx'
import AdminCarriers from './pages/admin/AdminCarriers.jsx'
import AdminAgents from './pages/admin/AdminAgents.jsx'
import AdminContacts from './pages/admin/AdminContacts.jsx'
import NotFound from './pages/NotFound.jsx'

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
)

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-brand-ink text-white">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/services" element={<Page><Services /></Page>} />
            <Route path="/services/:slug" element={<Page><ServiceDetail /></Page>} />
            <Route path="/quote" element={<Page><Quote /></Page>} />
            <Route path="/track" element={<Page><Track /></Page>} />
            <Route path="/carrier-onboarding" element={<Page><CarrierOnboarding /></Page>} />
            <Route path="/agent-opportunities" element={<Page><AgentOpportunities /></Page>} />
            <Route path="/blog" element={<Page><Blog /></Page>} />
            <Route path="/blog/:slug" element={<Page><BlogPost /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="/privacy" element={<Page><Privacy /></Page>} />
            <Route path="/terms" element={<Page><Terms /></Page>} />
            <Route path="/login" element={<Page><Login /></Page>} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="quotes" element={<AdminQuotes />} />
              <Route path="carriers" element={<AdminCarriers />} />
              <Route path="agents" element={<AdminAgents />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
