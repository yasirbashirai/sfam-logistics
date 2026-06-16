import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/Chatbot.jsx'
import CreativeMarquee from './components/CreativeMarquee.jsx'
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
import Track from './pages/Track.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import NotFound from './pages/NotFound.jsx'

// Admin dashboard is code-split: public/SEO visitors never download it,
// keeping the initial bundle small for faster page loads (Core Web Vitals).
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const AdminQuotes = lazy(() => import('./pages/admin/AdminQuotes.jsx'))
const AdminCarriers = lazy(() => import('./pages/admin/AdminCarriers.jsx'))
const AdminAgents = lazy(() => import('./pages/admin/AdminAgents.jsx'))
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts.jsx'))
const AdminShipments = lazy(() => import('./pages/admin/AdminShipments.jsx'))
const AdminChat = lazy(() => import('./pages/admin/AdminChat.jsx'))
const AdminSubscribers = lazy(() => import('./pages/admin/AdminSubscribers.jsx'))

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
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <div className="min-h-screen flex flex-col bg-brand-navy text-white">
      <ScrollToTop />
      <Navbar />
      {/* Marquee sits directly under the header (offset for the fixed nav). Hidden on admin routes. */}
      {!isAdmin && (
        <>
          <div className="md:pt-[8.5rem] pt-24" aria-hidden="true" />
          <CreativeMarquee />
        </>
      )}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-[60vh] grid place-items-center text-white/40">Loading…</div>}>
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
            {/* /terms is served as the Terms & Conditions PDF at the server level
                (Vite middleware / Express route / .htaccess rewrite), not by React Router. */}
            <Route path="/login" element={<Page><Login /></Page>} />
            <Route path="/forgot-password" element={<Page><ForgotPassword /></Page>} />
            <Route path="/reset-password" element={<Page><ResetPassword /></Page>} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="shipments" element={<AdminShipments />} />
              <Route path="chat" element={<AdminChat />} />
              <Route path="chat/:id" element={<AdminChat />} />
              <Route path="quotes" element={<AdminQuotes />} />
              <Route path="carriers" element={<AdminCarriers />} />
              <Route path="agents" element={<AdminAgents />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
            </Route>
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
