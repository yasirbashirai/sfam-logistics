export function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl animate-orb" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-orb" style={{ animationDelay: '6s' }} />
      <div className="container-x relative text-center">
        {eyebrow && <div className="label mb-4">{eyebrow}</div>}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-4 justify-center">{children}</div>}
      </div>
    </section>
  )
}

export function Orbs() {
  return (
    <>
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-3xl animate-orb pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl animate-orb pointer-events-none" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
    </>
  )
}
