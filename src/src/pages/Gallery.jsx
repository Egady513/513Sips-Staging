import { useEffect, useRef } from 'react'
import { 
  Image,
  Wine,
  Sparkles,
  Heart
} from 'lucide-react'

export default function Gallery() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const galleryItems = [
    { type: 'large', icon: Wine, title: 'Signature Cocktails', subtitle: 'Custom creations for your special day' },
    { type: 'normal', icon: Sparkles, title: 'Mobile Bar Setup', subtitle: 'Elegant 5×4 mobile bar' },
    { type: 'normal', icon: Heart, title: 'Wedding Events', subtitle: 'Making your day memorable' },
    { type: 'wide', icon: Image, title: 'Event Gallery', subtitle: 'Photos coming soon' },
    { type: 'normal', icon: Wine, title: 'Craft Mixology', subtitle: 'Homemade syrups & fresh ingredients' },
    { type: 'normal', icon: Sparkles, title: 'Corporate Events', subtitle: 'Professional service for any occasion' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal max-w-3xl">
            <span className="luxury-badge mb-6">
              <Image size={14} />
              <span>Gallery</span>
            </span>
            <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Event Gallery
            </h1>
            <p className="text-xl text-white/70">
              A glimpse into the 513 Sips experience. Real moments from real celebrations.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bento-grid">
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal bento-item ${
                  item.type === 'large' ? 'bento-item-large' : 
                  item.type === 'wide' ? 'bento-item-wide' : ''
                } stagger-${(index % 5) + 1}`}
              >
                <div className="w-full h-full min-h-[280px] luxury-card flex flex-col items-center justify-center p-8 text-center group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-[#CA8A04]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={36} className="text-[#CA8A04]" />
                  </div>
                  <h3 className="font-['Bodoni_Moda'] text-2xl font-bold text-[#0A1628] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#0A1628]/60">{item.subtitle}</p>
                  <div className="mt-6 px-4 py-2 rounded-full bg-[#0A1628]/5 text-sm text-[#0A1628]/50">
                    Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div ref={addToRefs} className="reveal mt-16 text-center">
            <div className="liquid-glass p-12 inline-block">
              <h3 className="font-['Bodoni_Moda'] text-2xl font-bold text-[#0A1628] mb-4">
                Follow Our Journey
              </h3>
              <p className="text-[#0A1628]/60 mb-6 max-w-md">
                Stay updated with our latest events and behind-the-scenes content on Instagram.
              </p>
              <a 
                href="https://instagram.com/513sips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-luxury inline-flex items-center gap-2"
              >
                <span>@513sips</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
