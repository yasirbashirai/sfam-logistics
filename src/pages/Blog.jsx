import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Search } from 'lucide-react'
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
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <>
      <PageHero eyebrow="Blog & Resources" title={<>Insights From <span className="text-orange-400">The Road</span></>} subtitle="Practical guides for shippers, carriers, and freight agents — written by people who've actually moved the load." image={IMG.cityLights} />

      {/* ===== 1. FEATURED ===== */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="badge mb-3">Featured</div>
                <h2 className="font-display italic font-black text-4xl">Editor&apos;s <span className="text-orange-400">Pick</span></h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Link to={`/blog/${featured.slug}`} className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img src={postImages[featured.slug]} alt={featured.title} className="w-full h-full object-cover zoom-img" />
                </div>
                <div className="p-8 lg:p-12 bg-brand-navy3/40 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs mb-4">
                    <span className="px-3 py-1 rounded-full bg-orange-400/20 text-orange-300 font-bold uppercase tracking-widest">{featured.tag}</span>
                    <span className="flex items-center gap-1 text-white/50"><Clock className="w-3 h-3" /> {featured.readMin} min</span>
                  </div>
                  <h3 className="font-display italic font-black text-3xl lg:text-4xl mb-4 group-hover:text-orange-300 transition">{featured.title}</h3>
                  <p className="text-white/70 text-lg mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-sm">Read full article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition" /></span>
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
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {['All Topics', 'Shippers', 'Carriers', 'Agents', 'Industry', 'Education'].map(c => (
                <button key={c} className="px-5 py-2 rounded-full border border-white/15 hover:border-orange-400 hover:bg-orange-400/10 hover:text-orange-300 text-sm font-bold transition">{c}</button>
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
            <div className="text-center mb-12">
              <div className="badge mb-3 mx-auto">Latest Articles</div>
              <h2 className="font-display italic font-black text-5xl">All <span className="text-orange-400">Insights</span></h2>
              <div className="divider-glow w-32 mx-auto mt-6" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link to={`/blog/${p.slug}`} className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition hover:-translate-y-1 h-full">
                  <div className="aspect-video overflow-hidden">
                    <img src={postImages[p.slug] || IMG.blogIndustry} alt={p.title} className="w-full h-full object-cover zoom-img" />
                  </div>
                  <div className="p-6 bg-brand-navy3/40">
                    <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                      <span className="px-2 py-1 rounded-full bg-orange-400/20 text-orange-300 font-bold uppercase tracking-widest">{p.tag}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readMin} min</span>
                    </div>
                    <h3 className="font-display italic font-black text-xl mb-2 group-hover:text-orange-300 transition">{p.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest">Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. NEWSLETTER ===== */}
      <section className="section">
        <div className="container-x">
          <div className="relative glass-strong neon-border p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full" />
            <div className="relative">
              <div className="badge mb-4 mx-auto">Stay Informed</div>
              <h2 className="font-display italic font-black text-4xl mb-4">Get Freight Insights <span className="text-orange-400">In Your Inbox</span></h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">Industry tips, rate trends, and SFam updates. No spam — ever.</p>
              <form className="flex gap-3 max-w-md mx-auto">
                <input className="input flex-1" type="email" placeholder="your@email.com" />
                <button className="btn-primary !px-7">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
