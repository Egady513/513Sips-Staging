import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar, Users, Wine } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    packageInterest: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required'
    if (!formData.eventType) newErrors.eventType = 'Event type is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
      setSubmitted(true)
    } else {
      setErrors(newErrors)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAF8F3]">
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle size={80} className="mx-auto mb-6 text-[#D4AF37]" />
            <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl font-bold text-white mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-[#0A1628]/60 mb-8 text-lg">
            In the meantime, feel free to explore our services or check out our FAQ page 
            for answers to common questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-luxury">
              View Services
            </Link>
            <Link to="/faq" className="btn-luxury-outline">
              Read FAQ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="luxury-badge mb-6">
              <Mail size={14} />
              <span>Get In Touch</span>
            </span>
            <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's Start Planning
            </h1>
            <p className="text-xl text-white/70">
              Ready to elevate your event? Fill out the form below and we'll get back to you 
              with a custom quote within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="liquid-glass p-8 md:p-12">
                <h2 className="font-['Bodoni_Moda'] text-2xl font-bold text-[#0A1628] mb-8">
                  Request a Quote
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`luxury-input ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="John & Jane Smith"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`luxury-input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="luxury-input"
                        placeholder="(513) 555-0199"
                      />
                    </div>

                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className={`luxury-input ${errors.eventDate ? 'border-red-500' : ''}`}
                      />
                      {errors.eventDate && <p className="mt-1 text-sm text-red-500">{errors.eventDate}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className={`luxury-input ${errors.eventType ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="bbq">BBQ / Cookout</option>
                        <option value="tailgate">Tailgate</option>
                        <option value="baby-shower">Baby Shower</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.eventType && <p className="mt-1 text-sm text-red-500">{errors.eventType}</p>}
                    </div>

                    <div>
                      <label htmlFor="guestCount" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                        Expected Guest Count
                      </label>
                      <select
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="luxury-input"
                      >
                        <option value="">Select range</option>
                        <option value="1-25">1-25 guests</option>
                        <option value="26-50">26-50 guests</option>
                        <option value="51-100">51-100 guests</option>
                        <option value="101-150">101-150 guests</option>
                        <option value="150+">150+ guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="packageInterest" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                      Package Interest
                    </label>
                    <select
                      id="packageInterest"
                      name="packageInterest"
                      value={formData.packageInterest}
                      onChange={handleChange}
                      className="luxury-input"
                    >
                      <option value="">Select a package</option>
                      <option value="golden">Golden Standard ($650)</option>
                      <option value="signature">The Signature ($850)</option>
                      <option value="custom">Uniquely Yours (Custom)</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#0A1628] mb-2 uppercase tracking-wider">
                      Tell Us About Your Event
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="luxury-input resize-none"
                      placeholder="Share details about your vision, any special requests, or questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury w-full md:w-auto inline-flex items-center justify-center gap-2 text-lg"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="liquid-glass p-8">
                <h3 className="font-['Bodoni_Moda'] text-xl font-bold text-[#0A1628] mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#CA8A04]" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">Phone</p>
                      <a href="tel:513-322-2645" className="text-[#0A1628]/60 hover:text-[#CA8A04] transition-colors">
                        (513) 322-2645
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#CA8A04]" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">Email</p>
                      <a href="mailto:hello@513sips.com" className="text-[#0A1628]/60 hover:text-[#CA8A04] transition-colors">
                        hello@513sips.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#CA8A04]" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">Location</p>
                      <p className="text-[#0A1628]/60">
                        Hyde Park, Cincinnati, OH 45208<br />
                        <span className="text-sm">Serving Cincinnati, N. Kentucky & SW Indiana</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-[#CA8A04]" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628]">Response Time</p>
                      <p className="text-[#0A1628]/60">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] rounded-3xl p-8 text-white">
                <h3 className="font-['Bodoni_Moda'] text-xl font-bold mb-6">
                  What Happens Next?
                </h3>
                <ol className="space-y-4">
                  {[
                    "We'll review your request within 24 hours",
                    "Schedule a consultation call to discuss details",
                    "Receive your custom quote",
                    "Secure your date with deposit & contract"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0A1628] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-white/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
