import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Wine,
  Truck,
  CreditCard,
  Calendar,
  Shield,
  MapPin
} from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
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

  const faqs = [
    {
      icon: Wine,
      question: "What is a 'dry-hire' bar service?",
      answer: "As a dry-hire bar service, we provide everything EXCEPT the alcohol. This includes professional bartenders, the mobile bar, mixers, garnishes, cups, and all necessary equipment. Due to Ohio state laws, the host must purchase all alcohol. However, we make this easy by offering a courier service or customized shopping lists based on your guest count and drink preferences."
    },
    {
      icon: Truck,
      question: "What areas do you serve?",
      answer: "We're based in Hyde Park, Cincinnati (45208) and serve the entire Cincinnati metro area, Northern Kentucky, and Southwest Indiana. All packages include travel within a 30-mile radius. For events outside this area, we're happy to travel—just contact us for a custom quote that includes travel fees."
    },
    {
      icon: CreditCard,
      question: "What are your payment terms?",
      answer: "We require a 25% non-refundable deposit and signed contract to secure your date. The remaining balance is due 2 weeks prior to your event. We accept credit cards, checks, and electronic payments (Venmo, Zelle). For bookings within 2 weeks of the event, full payment is required at booking."
    },
    {
      icon: Calendar,
      question: "How far in advance should I book?",
      answer: "We recommend booking 3-6 months in advance, especially for peak wedding season (May-October) and popular dates (Saturdays, holidays). However, we occasionally have last-minute availability, so don't hesitate to reach out even if your event is soon!"
    },
    {
      icon: Shield,
      question: "Are you licensed and insured?",
      answer: "Yes! We are a licensed Ohio LLC and carry comprehensive vendor liability insurance. All our bartenders are ASK (Alcohol Server Knowledge) certified. We're happy to provide certificates of insurance to your venue upon request."
    },
    {
      icon: MapPin,
      question: "What does the mobile bar look like?",
      answer: "Our mobile bar is a stunning 5'×4'×2' cart that's designed to be both functional and visually appealing. It features LED lighting, professional-grade equipment, and can be decorated to match your event theme. Photos coming soon to our Gallery page!"
    },
    {
      icon: Wine,
      question: "Can you create custom cocktails?",
      answer: "Absolutely! Our Signature package includes 2 custom signature cocktails designed specifically for your event. We can create drinks based on your favorite flavors, wedding colors, event theme, or anything else you'd like. We also make all our syrups and mixers from scratch using fresh ingredients."
    },
    {
      icon: Calendar,
      question: "How long do you need for setup and breakdown?",
      answer: "We typically arrive 1-2 hours before your event starts for setup, and breakdown takes about 30-45 minutes after service ends. This time is not included in your booked service hours—you only pay for the time we're actively serving your guests."
    },
    {
      icon: Shield,
      question: "What happens if a bartender gets sick?",
      answer: "We have a network of certified backup bartenders who can step in if needed. In the unlikely event of an emergency, we guarantee a replacement bartender of equal qualification or a full refund of your deposit."
    },
    {
      icon: CreditCard,
      question: "What's your cancellation policy?",
      answer: "The 25% deposit is non-refundable but can be transferred to a new date if you need to reschedule (subject to availability). Cancellations within 30 days of the event forfeit the full payment. We understand life happens, so please contact us as soon as possible if you need to make changes."
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addToRefs} className="reveal max-w-3xl">
            <span className="luxury-badge mb-6">
              <HelpCircle size={14} />
              <span>FAQ</span>
            </span>
            <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked
              <span className="block gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-white/70">
              Everything you need to know about 513 Sips. Can't find what you're looking for? 
              Feel free to contact us.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <section className="py-24 bg-[#FAF8F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                ref={addToRefs}
                className={`reveal luxury-card overflow-hidden stagger-${(index % 5) + 1}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-[#0A1628]/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center flex-shrink-0">
                      <faq.icon size={20} className="text-[#CA8A04]" />
                    </div>
                    <h3 className="font-['Bodoni_Moda'] text-lg font-bold text-[#0A1628]">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-[#0A1628]/5 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} className="text-[#0A1628]" />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pl-[88px]">
                    <p className="text-[#0A1628]/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div ref={addToRefs} className="reveal mt-16 text-center">
            <div className="liquid-glass p-12">
              <h3 className="font-['Bodoni_Moda'] text-2xl font-bold text-[#0A1628] mb-4">
                Still Have Questions?
              </h3>
              <p className="text-[#0A1628]/60 mb-6">
                Can't find the answer you're looking for? Please reach out and we'll get back to you within 24 hours.
              </p>
              <a 
                href="/contact" 
                className="btn-luxury inline-flex items-center gap-2"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
