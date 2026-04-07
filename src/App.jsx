import { Routes, Route } from 'react-router-dom'
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
import Login from './pages/Login.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AdminQuotes from './pages/admin/AdminQuotes.jsx'
import AdminCarriers from './pages/admin/AdminCarriers.jsx'
import AdminAgents from './pages/admin/AdminAgents.jsx'
import AdminContacts from './pages/admin/AdminContacts.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-ink text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/carrier-onboarding" element={<CarrierOnboarding />} />
          <Route path="/agent-opportunities" element={<AgentOpportunities />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="carriers" element={<AdminCarriers />} />
            <Route path="agents" element={<AdminAgents />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
