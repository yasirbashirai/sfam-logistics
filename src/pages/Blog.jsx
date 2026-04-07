import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { PageHero, Orbs } from '../components/Section.jsx'
import { blogPosts } from '../data/site.js'

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog & Resources" title={<>Insights From <span className="gradient-text">The Road</span></>} subtitle="Practical guides for shippers, carriers, and freight agents — written by people who've actually moved the load." />
      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(p => (
            <Link to={`/blog/${p.slug}`} key={p.slug} className="group glass overflow-hidden hover:border-orange-400/50 transition hover:-translate-y-1">
              <div className="aspect-video bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-purple-600/30 grid place-items-center text-6xl font-display font-bold gradient-text">
                {p.tag[0]}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                  <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">{p.tag}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readMin} min</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-orange-300 transition">{p.title}</h3>
                <p className="text-sm text-white/60 mb-4">{p.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-orange-300 text-sm font-semibold">Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
