export function PageHero({ eyebrow, title, subtitle, children, image = '/images/truck-hero.jpg' }) {
  return (
    <section className="relative pt-40 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/90 to-brand-navy" />
        <div className="absolute inset-0 grid-bg" />
      </div>
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-orange-400/12 rounded-full blur-3xl animate-orb" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-orange-400/8 rounded-full blur-3xl animate-orb" style={{ animationDelay: '6s' }} />
      <div className="container-x relative text-center">
        {eyebrow && <div className="badge mb-4 mx-auto">{eyebrow}</div>}
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-shadow">{title}</h1>
        <div className="divider-glow w-24 mx-auto my-4" />
        {subtitle && <p className="text-sm text-white/75 max-w-xl mx-auto">{subtitle}</p>}
        {children && <div className="mt-6 flex flex-wrap gap-3 justify-center">{children}</div>}
      </div>
    </section>
  )
}

export function Orbs() {
  return (
    <>
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-orange-400/12 rounded-full blur-3xl animate-orb pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl animate-orb pointer-events-none" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
    </>
  )
}
