import { useEffect, useState } from 'react'
import { Star, ExternalLink, MessageSquarePlus } from 'lucide-react'
import Reveal from './Reveal.jsx'

// Google Business Profile page (official share link from the profile owner) —
// used for both buttons until the backend has a GOOGLE_MAPS_API_KEY configured.
const GOOGLE_PROFILE_URL = 'https://share.google/ifNAdIMyOui1a7dNy'

// Official "leave us a review" deep link from the Google Business Profile.
const WRITE_REVIEW_URL = 'https://g.page/r/CaqJrgVE_XMlEAE/review'

// Real reviews copied from the SFam Google Business Profile (2026-07-15).
// Shown until the backend has a GOOGLE_MAPS_API_KEY; once the key is set the
// widget switches to live data from Google and this snapshot is ignored.
const SEED = {
  configured: true,
  rating: 5.0,
  total: 2,
  mapsUrl: GOOGLE_PROFILE_URL,
  writeReviewUrl: WRITE_REVIEW_URL,
  reviews: [
    {
      author: 'Don Sootee',
      avatar: null,
      rating: 5,
      text: 'Worked with Sulley at SFam Logistics on a load out of Washington. I was skeptical at first because they seem to be new and as we all know, new brokers turns not to know what they are doing but Dude actually knows trucking. Not your typical broker who’s never been in a truck. Rates were fair, no surprises on the back end, and he kept communication tight from pickup to delivery. He promised payment on delivery with no charge and he kept his promise. Refreshing to work with a broker who respects carriers and keep their promise. Will keep using them.',
      time: '2 weeks ago'
    },
    {
      author: 'Qwame Boafo Flyboi',
      avatar: null,
      rating: 5,
      text: '',
      time: '2 weeks ago'
    }
  ]
}

// Official Google "G" mark, inlined so the widget loads nothing external.
const GoogleG = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
)

const Stars = ({ rating, size = 'w-4 h-4' }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(n => (
      <Star
        key={n}
        className={`${size} ${n <= Math.round(rating) ? 'text-orange-400 fill-orange-400' : 'text-white/20'}`}
      />
    ))}
  </div>
)

// Live Google Reviews widget. Pulls rating + latest reviews from our backend
// (/api/google-reviews, cached server-side). Until the API key is configured
// the section still renders — as a clean "find us on Google" CTA, never an
// empty box or fake data.
export default function GoogleReviews() {
  // Render the snapshot immediately; silently upgrade to live Google data
  // when the backend responds (it cold-starts slowly on Render's free tier).
  const [data, setData] = useState(SEED)

  useEffect(() => {
    let alive = true
    fetch('/api/google-reviews')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive && d?.configured && d.rating) setData(d) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  const live = data?.configured && data.rating
  const mapsUrl = data?.mapsUrl || GOOGLE_PROFILE_URL
  // Always use the owner's official review deep link, even with live API data.
  const writeReviewUrl = WRITE_REVIEW_URL

  return (
    <section className="section-light">
      <div className="container-x max-w-4xl">
        <Reveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.15em] mb-3 mx-auto">
              <GoogleG className="w-3.5 h-3.5" /> Google Reviews
            </div>
            <h2 className="font-display italic font-black text-3xl text-white">What Our Partners <span className="text-orange-400">Say On Google</span></h2>
            <div className="h-0.5 w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          </div>
        </Reveal>

        {live && (
          <>
            {/* Rating summary */}
            <Reveal delay={100}>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <GoogleG className="w-10 h-10" />
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-display italic font-black text-4xl text-white">{data.rating.toFixed(1)}</span>
                    <Stars rating={data.rating} size="w-5 h-5" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">Based on {data.total} Google review{data.total === 1 ? '' : 's'}</div>
                </div>
              </div>
            </Reveal>

            {/* Review cards */}
            {data.reviews.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mb-8 items-start">
                {data.reviews.slice(0, 4).map((r, i) => (
                  <Reveal key={`${r.author}-${i}`} delay={i * 100}>
                    <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-5 flex flex-col hover:border-orange-400/40 transition">
                      <div className="flex items-center gap-3 mb-3">
                        {r.avatar
                          ? <img src={r.avatar} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-10 h-10 rounded-full border border-white/15" />
                          : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 grid place-items-center text-white font-bold">{r.author.charAt(0)}</div>}
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-white truncate">{r.author}</div>
                          <div className="text-white/50 text-xs">{r.time}</div>
                        </div>
                        <GoogleG className="w-4 h-4 ml-auto shrink-0" />
                      </div>
                      <Stars rating={r.rating} />
                      {r.text
                        ? <p className="text-white/75 text-sm leading-relaxed mt-3">{r.text}</p>
                        : <p className="text-white/50 text-sm italic mt-3">Rated {r.rating} stars on Google</p>}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}

        {!live && data && (
          <Reveal delay={100}>
            <p className="text-white/70 text-center max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              We&apos;re proud of the relationships we build with every shipper and carrier.
              Read what they say about working with us — straight from our Google Business Profile.
            </p>
          </Reveal>
        )}

        {/* CTAs — always shown */}
        <Reveal delay={200}>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-brand-navy font-bold text-sm uppercase tracking-wider hover:-translate-y-0.5 transition"
            >
              <MessageSquarePlus className="w-4 h-4" /> Review Us On Google
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white/30 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-400 hover:text-brand-navy transition"
            >
              See All Reviews <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
