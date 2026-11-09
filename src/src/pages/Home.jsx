import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Award, 
  Star, 
  Wine, 
  Sparkles,
  Heart,
  Clock,
  MapPin,
  CheckCircle2,
  Instagram,
  Facebook,
  Mail
} from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Home() {
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

  const features = [
    {
      icon: Award,
      title: "Licensed & Insured",
      description: "Full vendor liability coverage for your peace of mind"
    },
    {
      icon: Star,
      title: "ASK Certified",
      description: "Professional bartenders with alcohol service certification"
    },
    {
      icon: Clock,
      title: "5×4 Mobile Bar",
      description: "Stunning portable bar that elevates any venue"
    },
    {
      icon: MapPin,
      title: "Cincinnati Based",
      description: "Serving Ohio, N. Kentucky & SW Indiana"
    }
  ]

  const packages = [
    {
      name: "Golden Standard",
      price: "650",
      description: "Perfect for intimate gatherings and classic celebrations",
      icon: Wine,
      popular: false,
      features: [
        "3 hours of service",
        "Up to 50 guests",
        "Beer, Wine & Champagne",
        "Mobile bar cart rental",
        "All necessities included",
        "1 certified bartender"
      ]
    },
    {
      name: "The Signature",
      price: "850",
      description: "Elevate your event with custom cocktails and premium service",
      icon: Sparkles,
      popular: true,
      features: [
        "Everything in Golden Standard",
        "2 Signature Cocktails",
        "Custom menu design",
        "Homemade mixers & syrups",
        "1 Premade cocktail",
        "Full Bar upgrade"
      ]
    },
    {
      name: "Uniquely Yours",
      price: "Custom",
      description: "Build your perfect package with our à la carte options",
      icon: Heart,
      popular: false,
      features: [
        "Additional hours available",
        "Extra bartenders",
        "Glassware rental",
        "Coffee/Hot Chocolate bar",
        "Tent & backdrop rentals",
        "Fully customizable"
      ]
    }
  ]

  const testimonials = [
    {
      quote: "513 Sips made our wedding absolutely magical. The signature cocktails were a huge hit and the bartenders were so professional. Our guests are still talking about it!",
      author: "Sarah & Michael",
      event: "Wedding",
      location: "Cincinnati, OH"
    },
    {
      quote: "From the first consultation to the last call, everything was seamless. The mobile bar looked stunning and the service was impeccable. Highly recommend!",
      author: "Jennifer T.",
      event: "Corporate Event",
      location: "Covington, KY"
    },
    {
      quote: "We booked 513 Sips for our anniversary party and it was the best decision. The custom cocktails perfectly matched our theme. Eddie and his team are true professionals.",
      author: "David & Lisa",
      event: "Anniversary Party",
      location: "Hyde Park, OH"
    }
  ]

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1E3A8A] to-[#0A1628]"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#CA8A04]/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#D4AF37]/5 to-transparent rounded-full"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div ref={addToRefs} className="reveal">
              <div className="luxury-badge mb-6">
                <Star size={14} fill="currentColor" />
                <span>Premium Mobile Bar Service</span>
              </div>
              
              <h1 className="font-['Bodoni_Moda'] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                Elevate Your
                <span className="block gradient-text">Celebration</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                Premium mobile bar service in Cincinnati. We bring the bar to you—
                certified bartenders, signature cocktails, and unforgettable experiences 
                for weddings, corporate events, and private parties.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/contact" className="btn-luxury inline-flex items-center justify-center gap-2 text-lg">
                  <span>Get a Quote</span>
                  <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn-luxury-outline border-white text-white hover:text-[#0A1628] inline-flex items-center justify-center text-lg">
                  <span>View Services</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6">
                {features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/60">
                    <feature.icon size={18} className="text-[#D4AF37]" />
                    <span className="text-sm">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Visual element */}
            <div ref={addToRefs} className="reveal-right hidden lg:block">
              <div className="relative">
                {/* Main glass card */}
                <div className="liquid-glass-dark p-8 relative z-10">
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#CA8A04]/10 flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <Wine size={80} className="text-[#D4AF37] mx-auto mb-4" />
                      <p className="text-white/60 text-lg">Mobile Bar Experience</p>
                    </div>
                  </div>
                  
                  {/* Floating stats */}
                  <div className="absolute -bottom-6 -left-6 liquid-glass p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#CA8A04] flex items-center justify-center">
                        <Heart size={20} className="text-white" fill="white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#0A1628]">100+</p>
                        <p className="text-sm text-[#0A1628]/60">Events Served</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 liquid-glass p-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="text-[#D4AF37]" fill="#D4AF37" />
                      ))}
                    </div>
                    <p className="text-sm text-[#0A1628]/60 mt-1">5.0 Rating</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#D4AF37]/20 rounded-3xl"></div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#D4AF37]/10 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <span className="luxury-badge mb-4">
              <Award size={14} />
              <span>Why Choose Us</span>
            </span>
            <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              The 513 Sips Difference
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal luxury-card p-8 text-center stagger-${index + 1}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-[#CA8A04]/10 flex items-center justify-center">
                  <feature.icon size={28} className="text-[#CA8A04]" />
                </div>
                <h3 className="font-['Bodoni_Moda'] text-xl font-bold text-[#0A1628] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#0A1628]/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FAF8F3] to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <span className="luxury-badge mb-4">
              <Sparkles size={14} />
              <span>Our Packages</span>
            </span>
            <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              Choose Your Experience
            </h2>
            <p className="text-[#0A1628]/60 max-w-2xl mx-auto text-lg">
              Every event is unique. Choose the package that fits your vision, 
              or let us create something completely custom.
            </p>
            <div className="section-divider mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal luxury-card p-8 relative ${pkg.popular ? 'border-[#D4AF37] border-2' : ''} stagger-${index + 1}`}
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

                <div className="price-tag mb-4">
                  <span className="currency">$</span>
                  <span className="amount">{pkg.price}</span>
                </div>

                <p className="text-[#0A1628]/60 mb-6">{pkg.description}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#CA8A04] mt-0.5 flex-shrink-0" />
                      <span className="text-[#0A1628]/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to={pkg.price === 'Custom' ? '/contact' : '/contact'}
                  className={`w-full text-center block py-4 rounded-full font-semibold transition-all duration-300 ${
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

          <div ref={addToRefs} className="reveal mt-12 text-center">
            <Link to="/pricing" className="inline-flex items-center gap-2 text-[#CA8A04] font-semibold hover:gap-3 transition-all">
              <span>Try Our Pricing Calculator</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#0A1628] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1E3A8A]/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={addToRefs} className="reveal-left">
              <span className="luxury-badge mb-6">
                <Heart size={14} />
                <span>Our Story</span>
              </span>
              
              <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Born from Family,
                <span className="block gradient-text">Built for Community</span>
              </h2>
              
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
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
              </div>

              <Link to="/about" className="btn-luxury-outline border-white text-white hover:text-[#0A1628] inline-flex items-center gap-2 mt-8">
                <span>Read Our Story</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div ref={addToRefs} className="reveal-right">
              <div className="relative">
                <div className="liquid-glass-gold p-2">
                  <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1628] flex items-center justify-center">
                    <div className="text-center text-white">
                      <Users size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg opacity-75">Founder Photo</p>
                      <p className="text-sm opacity-50">Coming Soon</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 liquid-glass p-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={24} className="text-[#CA8A04]" />
                    <div>
                      <p className="text-2xl font-bold text-[#0A1628]">2024</p>
                      <p className="text-sm text-[#0A1628]/60">Founded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal text-center mb-16">
            <span className="luxury-badge mb-4">
              <Star size={14} fill="currentColor" />
              <span>Testimonials</span>
            </span>
            <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
              What Our Clients Say
            </h2>
            <div className="section-divider mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal testimonial-card stagger-${index + 1}`}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-[#D4AF37]" fill="#D4AF37" />
                  ))}
                </div>
                
                <p className="text-[#0A1628]/80 mb-6 leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#CA8A04] flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A1628]">{testimonial.author}</p>
                    <p className="text-sm text-[#0A1628]/60">{testimonial.event} • {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div ref={addToRefs} className="reveal-scale">
            <h2 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Elevate
              <span className="block gradient-text">Your Event?</span>
            </h2>
            
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Let's create something unforgettable together. Get in touch for a custom quote 
              tailored to your unique celebration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-luxury text-lg py-4 px-10">
                Get Your Quote
              </Link>
              <a href="tel:513-322-2645" className="btn-luxury-white text-lg py-4 px-10">
                Call (513) 322-2645
              </a>
            </div>

            <p className="text-white/40 mt-8 text-sm">
              Response within 24 hours • Free consultation
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
