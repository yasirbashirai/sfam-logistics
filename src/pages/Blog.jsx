import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { blogPosts } from '../data/site.js'
import IMG from '../data/images.js'

const postImages = {
  'how-to-choose-a-freight-broker': IMG.blogShipping,
  'ftl-vs-ltl': IMG.blogIndustry,
  'carrier-onboarding-checklist': IMG.blogCarriers,
  'becoming-a-freight-agent': IMG.teamMeeting
}

export default function Blog() {
  const [filter, setFilter] = useState('All Topics')
  const [nlEmail, setNlEmail] = useState('')
  const [nlDone, setNlDone] = useState(false)

  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)
  const categories = ['All Topics', 'Shippers', 'Carriers', 'Agents', 'Industry', 'Education']
  const filtered = filter === 'All Topics' ? rest : rest.filter(p => p.tag === filter)

  const handleNewsletter = (e) => {
    e.preventDefault()
    setNlDone(true)
    setNlEmail('')
  }

  return (
    <>
      <PageMeta title="Blog & Freight Industry Insights" description="Freight industry insights from SFam Logistics. Guides for shippers, carriers, and freight agents — covering FTL vs LTL, carrier vetting, freight broker selection, and agent opportunities." />
      <PageHero eyebrow="Blog & Resources" title={<>Insights From <span className="text-orange-400">The Road</span></>} subtitle="Practical guides for shippers, carriers, and freight agents — written by people who've actually moved the load." image={IMG.cityLights} />

      {/* ===== 1. FEATURED ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="badge mb-3">Featured</div>
                <h2 className="font-display italic font-black text-3xl">Editor&apos;s <span className="text-orange-400">Pick</span></h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Link to={`/blog/${featured.slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img src={postImages[featured.slug]} alt={featured.title} className="w-full h-full object-cover zoom-img" />
                </div>
                <div className="p-6 lg:p-10 bg-brand-navy3/40 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="px-3 py-1 rounded-full bg-orange-400/20 text-orange-300 font-bold uppercase tracking-widest">{featured.tag}</span>
                    <span className="flex items-center gap-1 text-white/50"><Clock className="w-3 h-3" /> {featured.readMin} min</span>
                  </div>
                  <h3 className="font-display italic font-black text-2xl lg:text-3xl mb-3 group-hover:text-orange-300 transition">{featured.title}</h3>
                  <p className="text-white/70 mb-4">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">Read full article <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition" /></span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== 2. CATEGORIES ===== */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold transition ${filter === c ? 'bg-orange-400 border-orange-400 text-brand-navy' : 'border-white/15 hover:border-orange-400 hover:bg-orange-400/10 hover:text-orange-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. LATEST GRID ===== */}
      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative">
          <Reveal>
            <div className="text-center mb-10">
              <div className="badge mb-3 mx-auto">Latest Articles</div>
              <h2 className="font-display italic font-black text-3xl">All <span className="text-orange-400">Insights</span></h2>
              <div className="divider-glow w-24 mx-auto mt-4" />
            </div>
          </Reveal>
          {filtered.length === 0 ? (
            <div className="text-center text-white/50 py-12">No articles found in this category yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <Link to={`/blog/${p.slug}`} className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition hover:-translate-y-1 h-full">
                    <div className="aspect-video overflow-hidden">
                      <img src={postImages[p.slug] || IMG.blogIndustry} alt={p.title} className="w-full h-full object-cover zoom-img" />
                    </div>
                    <div className="p-5 bg-brand-navy3/40">
                      <div className="flex items-center gap-3 text-xs text-white/50 mb-2">
                        <span className="px-2 py-1 rounded-full bg-orange-400/20 text-orange-300 font-bold uppercase tracking-widest">{p.tag}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readMin} min</span>
                      </div>
                      <h3 className="font-display italic font-black text-lg mb-2 group-hover:text-orange-300 transition">{p.title}</h3>
                      <p className="text-xs text-white/60 mb-3">{p.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-orange-400 text-[10px] font-bold uppercase tracking-widest">Read more <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition" /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 4. NEWSLETTER ===== */}
      <section className="section">
        <div className="container-x">
          <div className="relative bg-brand-navy3/60 border border-orange-400/20 rounded-2xl p-10 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-400/15 blur-3xl rounded-full" />
            <div className="relative">
              <div className="badge mb-3 mx-auto">Stay Informed</div>
              <h2 className="font-display italic font-black text-2xl mb-3">Get Freight Insights <span className="text-orange-400">In Your Inbox</span></h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto text-sm">Industry tips, rate trends, and SFam updates. No spam — ever.</p>
              {nlDone ? (
                <div className="text-emerald-400 font-bold text-sm">Subscribed! Thanks for signing up.</div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm mx-auto">
                  <input className="input flex-1 !py-2.5 text-sm" type="email" placeholder="your@email.com" value={nlEmail} onChange={e => setNlEmail(e.target.value)} required />
                  <button type="submit" className="btn-primary !px-6 text-sm">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
