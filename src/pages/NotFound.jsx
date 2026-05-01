import { Link } from 'react-router-dom'
import { Orbs } from '../components/Section.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center pt-32 pb-20 relative overflow-hidden">
      <PageMeta title="Page Not Found" description="The page you are looking for could not be found. Return to the SFam Logistics home page." noindex />
      <Orbs />
      <div className="container-x relative text-center">
        <div className="text-9xl font-display font-bold gradient-text">404</div>
        <h1 className="font-display font-bold text-4xl mt-4 mb-3">Lost in transit</h1>
        <p className="text-white/60 mb-8">This page took the wrong exit. Let&apos;s reroute you.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </section>
  )
}
