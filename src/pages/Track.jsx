import { Mail, Phone, Headphones, Clock, ShieldCheck } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import { PageHero, Orbs } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { breadcrumbLd } from '../data/seo.js'

const trackJsonLd = [
  breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Track Shipment', path: '/track' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Track Your SFam Logistics Shipment',
    url: 'https://sfamlogistics.com/track',
    description: 'For real-time load updates, contact your assigned operations manager directly at ops@sfamlogistics.com or call 1 (888) 698-5556.',
    isPartOf: { '@id': 'https://sfamlogistics.com/#website' }
  }
]

export default function Track() {
  return (
    <>
      <PageMeta
        title="Track Shipment — Contact Your Operations Manager"
        description="For real-time load updates, contact your assigned operations manager directly at ops@sfamlogistics.com or call 1 (888) 698-5556. SFam Logistics provides direct, hands-on freight visibility."
        keywords="freight tracking, shipment tracking, ops manager, SFam Logistics tracking, freight broker tracking, load updates"
        path="/track"
        jsonLd={trackJsonLd}
      />
      <PageHero
        eyebrow="Track Shipment"
        title={<>Real-Time <span className="text-orange-400">Load Updates</span></>}
        subtitle="Direct, hands-on visibility from the people moving your freight — not an automated tracker."
      />

      <section className="section pt-0">
        <Orbs />
        <div className="container-x relative max-w-4xl">
          <Reveal>
            <div className="glass-strong p-8 lg:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mx-auto mb-6 shadow-2xl shadow-orange-500/40">
                <Headphones className="w-10 h-10 text-brand-navy" />
              </div>
              <h2 className="font-display italic font-black text-3xl lg:text-4xl mb-4">
                Talk Directly To Your <span className="text-orange-400">Operations Manager</span>
              </h2>
              <div className="divider-glow w-32 mx-auto mb-6" />
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                For real-time load updates, contact your assigned operations manager directly at{' '}
                <a href="mailto:ops@sfamlogistics.com" className="text-orange-300 font-bold hover:text-orange-200 underline decoration-orange-400/50 hover:decoration-orange-300">ops@sfamlogistics.com</a>{' '}
                or call{' '}
                <a href="tel:+18886985556" className="text-orange-300 font-bold hover:text-orange-200 underline decoration-orange-400/50 hover:decoration-orange-300">1 (888) 698-5556</a>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <a
                  href="mailto:ops@sfamlogistics.com"
                  className="glass p-6 hover:border-orange-400/60 hover:-translate-y-1 transition group flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 group-hover:rotate-6 transition">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Email Operations</div>
                  <div className="font-display italic font-black text-lg text-white group-hover:text-orange-300 transition">ops@sfamlogistics.com</div>
                </a>

                <a
                  href="tel:+18886985556"
                  className="glass p-6 hover:border-orange-400/60 hover:-translate-y-1 transition group flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center mb-4 group-hover:rotate-6 transition">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Call Dispatch</div>
                  <div className="font-display italic font-black text-lg text-white group-hover:text-orange-300 transition">1 (888) 698-5556</div>
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Extended Hours</div>
                    <div className="text-xs text-white/60">Mon–Fri 7AM–5PM PST · Dispatch available extended hours for urgent freight.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Direct Line</div>
                    <div className="text-xs text-white/60">No phone trees — talk to a real person handling your freight.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Proactive Updates</div>
                    <div className="text-xs text-white/60">We push status changes to you, not the other way around.</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
