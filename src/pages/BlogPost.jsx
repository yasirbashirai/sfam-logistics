import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { Orbs } from '../components/Section.jsx'
import { blogPosts } from '../data/site.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <article className="relative pt-32 pb-20 overflow-hidden">
      <Orbs />
      <div className="container-x relative max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-orange-300 mb-8"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
        <div className="flex items-center gap-3 text-xs mb-5">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300">{post.tag}</span>
          <span className="flex items-center gap-1 text-white/50"><Clock className="w-3 h-3" /> {post.readMin} min read</span>
          <span className="text-white/50">{post.date}</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">{post.title}</h1>
        <p className="text-xl text-white/70 mb-10">{post.excerpt}</p>
        <div className="aspect-video rounded-3xl bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-purple-600/30 grid place-items-center text-9xl font-display font-bold gradient-text mb-10">
          {post.tag[0]}
        </div>
        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-lg whitespace-pre-line">
          {post.body}
        </div>
        <div className="mt-14 glass-strong neon-border p-10 text-center">
          <h3 className="font-display font-bold text-3xl mb-3">Need a Quote?</h3>
          <p className="text-white/70 mb-6">Get pricing in 30 minutes during business hours.</p>
          <Link to="/quote" className="btn-primary">Request a Quote</Link>
        </div>
      </div>
    </article>
  )
}
