import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Wine, 
  Star, 
  Coffee, 
  Clock, 
  Users, 
  CheckCircle,
  CheckCircle2
} from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Services() {
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

  const packages = [
    {
      name: "Golden Standard",
      price: "650",
      description: "Perfect for intimate gatherings and classic celebrations. Serving the standard necessities for your event.",
      icon: Wine,
      popular: false,
      features: [
        "Comprehensive consultation & event planning",
        "3 hours of professional bartending service",
        "Mobile bar cart rental (5'×4'×2')",
        "1 certified bartender (ASK certified)",
        "Beer, Wine & Champagne service",
        "All necessities: cups, napkins, straws",
        "Travel within 30-mile radius"
      ],
      note: "Recommended: 1 bartender per 50 guests"
    },
    {
      name: "The Signature",
      price: "850",
      description: "Elevate your event with custom cocktails and premium touches that make your celebration truly memorable.",
      icon: Star,
      popular: true,
      features: [
        "Everything in Golden Standard",
        "2 Signature Cocktails (custom created)",
        "1 Premade Cocktail (batch prepared)",
        "Custom menu design (printed or digital)",
        "Homemade mixers & fresh ingredients",
        "Homemade syrups & purees",
        "Full Bar upgrade (multiple liquor options)"
      ],
      note: "Perfect for: Weddings, milestone birthdays, corporate events"
    },
    {
      name: "Uniquely Yours",
      price: "Custom",
      description: "Every event deserves something unique. Build your perfect package with our à la carte options.",
      icon: Coffee,
      popular: false,
      features: [
        "Additional Hours — $75/hr pre-booked",
        "Extra Bartenders — $75/hr each",
        "Additional Cocktails — $150 each",
        "Coffee/Hot Chocolate Bar — $100",
        "Arch Photo Backdrop — $350",
        "Glassware Rental — $3.50/glass",
        "Tent Rental — $250"
      ],
      note: "Fully customizable to your needs"
    }
  ]

  const steps = [
    {
      step: '01',
      title: 'Reach Out',
      description: 'Fill out our contact form or give us a call. Tell us about your event, date, and vision.'
    },
    {
      step: '02',
      title: 'Consultation',
      description: "We'll schedule a consultation to discuss details and create a custom quote just for you."
    },
    {
      step: '03',
      title: 'Book Your Date',
      description: 'Secure your date with a 25% non-refundable deposit and signed contract.'
    },
    {
      step: '04',
      title: 'Celebrate',
      description: 'We handle setup, service, and breakdown. You enjoy your event!'
    }
  ]

  const details = [
    {
      title: "Dry-Hire Service",
      content: "We provide everything but the alcohol. Due to Ohio state laws, all alcohol must be purchased by the host. We do, however, offer an amazing courier service or customized shopping lists to make it easy."
    },
    {
      title: "Payment Terms",
      content: "We require a 25% non-refundable deposit and signed contract to secure your date. Payment in full is due 2 weeks prior to your event. We accept credit cards, checks, and electronic payments."
    },
    {
      title: "Service Area",
      content: "Based in Hyde Park (45208), we serve all of Cincinnati, Northern Kentucky, and Southwest Indiana. Packages include travel within 30 miles. We're happy to travel further—just ask for a custom quote."
    },
    {
      title: "Fully Insured",
      content: "We carry vendor liability insurance and are a licensed Ohio LLC. All bartenders are ASK (Alcohol Server Knowledge) certified. We're happy to provide documentation to your venue."
    }
  ]

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal max-w-3xl">
            <span className="luxury-badge mb-6">
              <Wine size={14} />
              <span>Our Services</span>
            </span>
            <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Crafted for Your
              <span className="block gradient-text">Perfect Event</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Every event needs something different. As a dry-hire bar, we do everything 
              but purchase the alcohol. Let's find the perfect fit for your celebration.
            </p>
          </div>
        </div>
      </div>

      {/* Packages */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-[#0A1628] mb-4">
              Service Packages
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal luxury-card p-8 flex flex-col ${pkg.popular ? 'border-2 border-[#D4AF37]' : ''} stagger-${index + 1}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#D4AF37] to-[#CA8A04] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  pkg.popular 
                    ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#CA8A04]/20' 
                    : 'bg-[#0A1628]/5'
                }`}>
                  <pkg.icon size={32} className={pkg.popular ? 'text-[#CA8A04]' : 'text-[#0A1628]'} />
                </div>

                <h3 className="font-['Bodoni_Moda'] text-2xl font-bold text-[#0A1628] mb-2">
                  {pkg.name}
                </h3>

                {pkg.price !== 'Custom' ? (
                  <div className="price-tag mb-4">
                    <span className="currency">$</span>
                    <span className="amount">{pkg.price}</span>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-[#CA8A04] mb-4">Custom Quote</p>
                )}

                <p className="text-[#0A1628]/60 mb-6">{pkg.description}</p>

                <div className="flex-grow">
                  <h4 className="font-semibold text-[#0A1628] mb-4">What's Included:</h4>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-[#CA8A04] mt-0.5 flex-shrink-0" />
                        <span className="text-[#0A1628]/70 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`rounded-xl p-4 mb-6 ${pkg.popular ? 'bg-[#CA8A04]/10' : 'bg-[#0A1628]/5'}`}>
                  <p className={`text-sm ${pkg.popular ? 'text-[#CA8A04]' : 'text-[#0A1628]/60'}`}>
                    <strong>{pkg.note.split(':')[0]}:</strong> {pkg.note.split(':')[1] || pkg.note}
                  </p>
                </div>

                <Link 
                  to="/contact"
                  className={`w-full text-center py-4 rounded-full font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#CA8A04] text-white hover:shadow-lg hover:shadow-[#CA8A04]/25'
                      : 'bg-[#0A1628] text-white hover:bg-[#0A1628]/90'
                  }`}
                >
                  {pkg.price === 'Custom' ? 'Get Custom Quote' : 'Book This Package'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <span className="luxury-badge mb-4">
              <Clock size={14} />
              <span>Process</span>
            </span>
            <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-[#0A1628] mb-4">
              How It Works
            </h2>
            <p className="text-[#0A1628]/60 max-w-2xl mx-auto text-lg">
              From first contact to last call, we make the process seamless and stress-free.
            </p>
            <div className="section-divider mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal text-center stagger-${index + 1}`}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] flex items-center justify-center">
                    <span className="text-3xl font-bold text-white font-['Bodoni_Moda']">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/50 to-transparent -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="font-['Bodoni_Moda'] text-xl font-bold text-[#0A1628] mb-2">{item.title}</h3>
                <p className="text-[#0A1628]/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Details */}
      <section className="py-24 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1E3A8A]/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-white mb-4">
              Important Details
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {details.map((detail, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal liquid-glass-dark p-8 stagger-${index + 1}`}
              >
                <h3 className="font-['Bodoni_Moda'] text-xl font-bold text-[#D4AF37] mb-4">
                  {detail.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {detail.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#CA8A04] to-[#D4AF37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div ref={addToRefs} className="reveal-scale">
            <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Plan Your Perfect Event
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Every booking includes a thorough consultation and detailed custom quote.
            </p>
            <Link 
              to="/contact" 
              className="btn-luxury-white text-lg inline-flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
