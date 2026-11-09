import { Link } from 'react-router-dom'
import { 
  Wine, 
  Star, 
  Coffee, 
  ArrowRight,
  Heart,
  Users,
  Calendar,
  MapPin,
  Award
} from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function About() {
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

  const values = [
    {
      icon: Heart,
      title: "Family First",
      description: "Every event we serve is treated like our own family celebration."
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "ASK-certified bartenders and full insurance for your peace of mind."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Proudly serving Cincinnati, Northern Kentucky, and Southwest Indiana."
    },
    {
      icon: Wine,
      title: "Craft Cocktails",
      description: "Homemade syrups, fresh ingredients, and signature creations."
    }
  ]

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal max-w-3xl">
            <span className="luxury-badge mb-6">
              <Users size={14} />
              <span>About Us</span>
            </span>
            <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              From family gatherings to your special day—513 Sips brings the spirit of 
              celebration to every event we serve.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={addToRefs} className="reveal-left">
              <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-[#0A1628] mb-6">
                Born from Family,
                <span className="block text-[#CA8A04]">Built for Community</span>
              </h2>
              
              <div className="space-y-4 text-[#0A1628]/70 text-lg leading-relaxed">
                <p>
                  513 Sips was born out of equal parts family, community, and a love for creating 
                  unforgettable experiences. Growing up with an "open house," there were constantly 
                  guests at the table—every holiday or random Saturday seemed to turn into a celebration.
                </p>
                <p>
                  That tradition shaped me. Amongst my friends, I'm known as "The Hub"—always the one 
                  planning or hosting. What started as a fun family reflection grew into something bigger: 
                  a vision to create a mobile bar that brings those same feelings of connection and 
                  celebration wherever people gather.
                </p>
                <p>
                  Today, 513 Sips is more than a mobile bar service—it's a promise to bring warmth, 
                  professionalism, and unforgettable moments to every event we touch.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#CA8A04] font-['Bodoni_Moda']">100+</p>
                  <p className="text-sm text-[#0A1628]/60">Events Served</p>
                </div>
                <div className="w-px h-12 bg-[#0A1628]/10"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#CA8A04] font-['Bodoni_Moda']">5.0</p>
                  <p className="text-sm text-[#0A1628]/60">Rating</p>
                </div>
                <div className="w-px h-12 bg-[#0A1628]/10"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#CA8A04] font-['Bodoni_Moda']">2024</p>
                  <p className="text-sm text-[#0A1628]/60">Founded</p>
                </div>
              </div>
            </div>

            <div ref={addToRefs} className="reveal-right">
              <div className="relative">
                <div className="liquid-glass-gold p-2">
                  <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1628] flex items-center justify-center">
                    <div className="text-center text-white">
                      <Users size={80} className="mx-auto mb-4 opacity-50" />
                      <p className="text-xl opacity-75">Founder Photo</p>
                      <p className="text-sm opacity-50">Coming Soon</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 liquid-glass p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#CA8A04] flex items-center justify-center">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">ASK Certified</p>
                      <p className="text-sm text-[#0A1628]/60">Professional Bartenders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <span className="luxury-badge mb-4">
              <Star size={14} />
              <span>Our Values</span>
            </span>
            <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-[#0A1628] mb-4">
              What We Stand For
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal luxury-card p-8 text-center stagger-${index + 1}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-[#CA8A04]/10 flex items-center justify-center">
                  <value.icon size={28} className="text-[#CA8A04]" />
                </div>
                <h3 className="font-['Bodoni_Moda'] text-xl font-bold text-[#0A1628] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#0A1628]/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1E3A8A]/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={addToRefs} className="reveal-left">
              <span className="luxury-badge mb-6">
                <MapPin size={14} />
                <span>Service Area</span>
              </span>
              
              <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-white mb-6">
                Serving the
                <span className="block gradient-text">Tri-State Area</span>
              </h2>
              
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Based in Hyde Park (45208), we're proud to serve Cincinnati, Northern Kentucky, 
                and Southwest Indiana. All packages include travel within 30 miles, and we're 
                happy to travel further for your special event.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, text: "Cincinnati, OH" },
                  { icon: MapPin, text: "Northern Kentucky" },
                  { icon: MapPin, text: "Southwest Indiana" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/80">
                    <item.icon size={18} className="text-[#D4AF37]" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={addToRefs} className="reveal-right">
              <div className="liquid-glass-dark p-8">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#1E3A8A]/50 to-[#0A1628] flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg opacity-75">Service Area Map</p>
                    <p className="text-sm opacity-50">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#CA8A04] to-[#D4AF37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={addToRefs} className="reveal-scale">
            <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create Something Special
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Ready to bring the 513 Sips experience to your event?
            </p>
            <Link 
              to="/contact" 
              className="btn-luxury-white text-lg inline-flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
