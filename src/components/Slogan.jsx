import { company } from '../data/site'

// Company slogan, two-tone like the brand graphics:
// "Stronger Together," in white, "Family Forever." in brand gold.
export default function Slogan({ className = '' }) {
  const [first, second] = company.slogan.split(', ')
  return (
    <p className={`font-display italic font-bold text-white ${className}`}>
      {first},{' '}<span className="text-brand-orange">{second}</span>
    </p>
  )
}
