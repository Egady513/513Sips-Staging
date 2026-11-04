import { useState, useEffect } from 'react'
import { 
  Calculator, 
  Users, 
  Clock, 
  Wine, 
  Sparkles, 
  Coffee,
  Tent,
  GlassWater,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const [guests, setGuests] = useState(50)
  const [hours, setHours] = useState(3)
  const [packageType, setPackageType] = useState('signature')
  const [addOns, setAddOns] = useState({
    extraBartender: false,
    glassware: false,
    coffeeBar: false,
    tent: false,
    arch: false,
  })
  const [showEstimate, setShowEstimate] = useState(false)

  const basePrices = {
    golden: 650,
    signature: 850,
    custom: 0
  }

  const addOnPrices = {
    extraBartender: { price: 75, label: 'Extra Bartender', per: 'hour' },
    glassware: { price: 3.50, label: 'Glassware Rental', per: 'glass' },
    coffeeBar: { price: 100, label: 'Coffee/Hot Chocolate Bar', per: 'flat' },
    tent: { price: 250, label: 'Tent Rental', per: 'flat' },
    arch: { price: 350, label: 'Arch Photo Backdrop', per: 'flat' },
  }

  const calculateEstimate = () => {
    let total = basePrices[packageType]
    
    // Extra hours beyond base 3
    if (hours > 3) {
      total += (hours - 3) * 75
    }

    // Add-ons
    if (addOns.extraBartender) {
      total += addOnPrices.extraBartender.price * hours
    }
    if (addOns.glassware) {
      total += addOnPrices.glassware.price * guests
    }
    if (addOns.coffeeBar) {
      total += addOnPrices.coffeeBar.price
    }
    if (addOns.tent) {
      total += addOnPrices.tent.price
    }
    if (addOns.arch) {
      total += addOnPrices.arch.price
    }

    return total
  }

  const toggleAddOn = (key) => {
    setAddOns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const estimate = calculateEstimate()

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Calculator size={16} className="text-[#D4AF37]" />
            <span className="text-white/80 text-sm">Instant Estimate</span>
          </div>
          <h1 className="font-['Bodoni_Moda'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Pricing Calculator
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get an instant estimate for your event. Customize your package and see pricing in real-time.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="liquid-glass p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side - Inputs */}
            <div className="space-y-8">
              {/* Package Selection */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-4 uppercase tracking-wider">
                  Select Package
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'golden', name: 'Golden', price: '$650', icon: Wine },
                    { key: 'signature', name: 'Signature', price: '$850', icon: Sparkles },
                    { key: 'custom', name: 'Custom', price: 'Quote', icon: Coffee },
                  ].map((pkg) => (
                    <button
                      key={pkg.key}
                      onClick={() => setPackageType(pkg.key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        packageType === pkg.key
                          ? 'border-[#CA8A04] bg-[#CA8A04]/5'
                          : 'border-[#0A1628]/10 hover:border-[#0A1628]/30'
                      }`}
                    >
                      <pkg.icon size={24} className={`mx-auto mb-2 ${packageType === pkg.key ? 'text-[#CA8A04]' : 'text-[#0A1628]/40'}`} />
                      <p className={`font-semibold ${packageType === pkg.key ? 'text-[#0A1628]' : 'text-[#0A1628]/60'}`}>
                        {pkg.name}
                      </p>
                      <p className="text-sm text-[#CA8A04] font-medium">{pkg.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-4 uppercase tracking-wider">
                  Guest Count
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests(Math.max(10, guests - 10))}
                    className="w-12 h-12 rounded-xl bg-[#0A1628]/5 hover:bg-[#0A1628]/10 flex items-center justify-center transition-colors"
                  >
                    <Minus size={20} className="text-[#0A1628]" />
                  </button>
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users size={20} className="text-[#CA8A04]" />
                      <span className="text-3xl font-bold text-[#0A1628]">{guests}</span>
                    </div>
                    <span className="text-sm text-[#0A1628]/50">guests</span>
                  </div>
                  <button
                    onClick={() => setGuests(Math.min(300, guests + 10))}
                    className="w-12 h-12 rounded-xl bg-[#0A1628]/5 hover:bg-[#0A1628]/10 flex items-center justify-center transition-colors"
                  >
                    <Plus size={20} className="text-[#0A1628]" />
                  </button>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full mt-4 accent-[#CA8A04]"
                />
              </div>

              {/* Hours */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-4 uppercase tracking-wider">
                  Service Hours
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setHours(Math.max(2, hours - 1))}
                    className="w-12 h-12 rounded-xl bg-[#0A1628]/5 hover:bg-[#0A1628]/10 flex items-center justify-center transition-colors"
                  >
                    <Minus size={20} className="text-[#0A1628]" />
                  </button>
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock size={20} className="text-[#CA8A04]" />
                      <span className="text-3xl font-bold text-[#0A1628]">{hours}</span>
                    </div>
                    <span className="text-sm text-[#0A1628]/50">hours</span>
                  </div>
                  <button
                    onClick={() => setHours(Math.min(8, hours + 1))}
                    className="w-12 h-12 rounded-xl bg-[#0A1628]/5 hover:bg-[#0A1628]/10 flex items-center justify-center transition-colors"
                  >
                    <Plus size={20} className="text-[#0A1628]" />
                  </button>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full mt-4 accent-[#CA8A04]"
                />
                {hours > 3 && (
                  <p className="text-sm text-[#CA8A04] mt-2">
                    +${(hours - 3) * 75} for extra hours
                  </p>
                )}
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-4 uppercase tracking-wider">
                  Add-ons
                </label>
                <div className="space-y-3">
                  {Object.entries(addOnPrices).map(([key, addon]) => (
                    <button
                      key={key}
                      onClick={() => toggleAddOn(key)}
                      className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-300 ${
                        addOns[key]
                          ? 'border-[#CA8A04] bg-[#CA8A04]/5'
                          : 'border-[#0A1628]/10 hover:border-[#0A1628]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          addOns[key] ? 'bg-[#CA8A04]/20' : 'bg-[#0A1628]/5'
                        }`}>
                          {key === 'extraBartender' && <Users size={18} className={addOns[key] ? 'text-[#CA8A04]' : 'text-[#0A1628]/40'} />}
                          {key === 'glassware' && <GlassWater size={18} className={addOns[key] ? 'text-[#CA8A04]' : 'text-[#0A1628]/40'} />}
                          {key === 'coffeeBar' && <Coffee size={18} className={addOns[key] ? 'text-[#CA8A04]' : 'text-[#0A1628]/40'} />}
                          {key === 'tent' && <Tent size={18} className={addOns[key] ? 'text-[#CA8A04]' : 'text-[#0A1628]/40'} />}
                          {key === 'arch' && <Sparkles size={18} className={addOns[key] ? 'text-[#CA8A04]' : 'text-[#0A1628]/40'} />}
                        </div>
                        <div className="text-left">
                          <p className={`font-medium ${addOns[key] ? 'text-[#0A1628]' : 'text-[#0A1628]/70'}`}>
                            {addon.label}
                          </p>
                          <p className="text-sm text-[#0A1628]/50">
                            ${addon.price}{addon.per === 'hour' ? '/hr' : addon.per === 'glass' ? '/glass' : ''}
                          </p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        addOns[key] ? 'border-[#CA8A04] bg-[#CA8A04]' : 'border-[#0A1628]/20'
                      }`}>
                        {addOns[key] && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Estimate */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] rounded-3xl p-8 text-white">
                <h3 className="font-['Bodoni_Moda'] text-2xl font-bold mb-6">Your Estimate</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">
                      {packageType === 'golden' ? 'Golden Standard' : packageType === 'signature' ? 'The Signature' : 'Custom Package'}
                    </span>
                    <span className="font-semibold">
                      {packageType === 'custom' ? 'Quote' : `$${basePrices[packageType]}`}
                    </span>
                  </div>

                  {hours > 3 && (
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-white/70">Extra Hours ({hours - 3})</span>
                      <span className="font-semibold">+${(hours - 3) * 75}</span>
                    </div>
                  )}

                  {Object.entries(addOns).map(([key, enabled]) => {
                    if (!enabled) return null
                    const addon = addOnPrices[key]
                    let price = addon.price
                    if (key === 'extraBartender') price *= hours
                    if (key === 'glassware') price *= guests
                    return (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-white/70">{addon.label}</span>
                        <span className="font-semibold">+${price}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-white/70">Estimated Total</span>
                    <div className="text-right">
                      {packageType === 'custom' ? (
                        <span className="text-3xl font-bold gradient-text">Custom Quote</span>
                      ) : (
                        <>
                          <span className="text-sm text-white/50">Starting at</span>
                          <div className="price-tag">
                            <span className="currency text-white/70">$</span>
                            <span className="amount text-white">{estimate}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-white/50 mb-6">
                    <Info size={16} className="mt-0.5 flex-shrink-0" />
                    <p>This is an estimate. Final pricing may vary based on specific requirements and availability.</p>
                  </div>

                  <Link
                    to="/contact"
                    className="btn-luxury w-full text-center flex items-center justify-center gap-2"
                  >
                    <span>Book This Package</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-6 liquid-glass p-6">
                <h4 className="font-semibold text-[#0A1628] mb-4">What's Included</h4>
                <ul className="space-y-2 text-sm text-[#0A1628]/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#CA8A04]" />
                    Professional ASK-certified bartender
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#CA8A04]" />
                    Mobile bar cart (5'×4'×2')
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#CA8A04]" />
                    All bar necessities & supplies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#CA8A04]" />
                    Setup & breakdown included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#CA8A04]" />
                    Travel within 30 miles
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-['Bodoni_Moda'] text-4xl font-bold text-[#0A1628] mb-4">
            Package Comparison
          </h2>
          <div className="section-divider mx-auto"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#0A1628]/10">
                <th className="text-left py-4 px-6 font-semibold text-[#0A1628]">Feature</th>
                <th className="text-center py-4 px-6 font-semibold text-[#0A1628]">Golden Standard</th>
                <th className="text-center py-4 px-6 font-semibold text-[#CA8A04]">The Signature</th>
                <th className="text-center py-4 px-6 font-semibold text-[#0A1628]">Uniquely Yours</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { feature: 'Service Hours', golden: '3 hours', signature: '3 hours', custom: 'Flexible' },
                { feature: 'Guest Capacity', golden: 'Up to 50', signature: 'Up to 75', custom: 'Any size' },
                { feature: 'Bartenders', golden: '1', signature: '1', custom: 'As needed' },
                { feature: 'Beer & Wine', golden: true, signature: true, custom: true },
                { feature: 'Signature Cocktails', golden: false, signature: '2 included', custom: 'Optional' },
                { feature: 'Custom Menu Design', golden: false, signature: true, custom: true },
                { feature: 'Homemade Mixers', golden: false, signature: true, custom: true },
                { feature: 'Mobile Bar Cart', golden: true, signature: true, custom: true },
                { feature: 'Glassware Rental', golden: false, signature: false, custom: 'Optional' },
                { feature: 'Coffee/Hot Chocolate Bar', golden: false, signature: false, custom: 'Optional' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-[#0A1628]/5 hover:bg-[#0A1628]/[0.02]">
                  <td className="py-4 px-6 text-[#0A1628]">{row.feature}</td>
                  <td className="py-4 px-6 text-center">
                    {typeof row.golden === 'boolean' ? (
                      row.golden ? <CheckCircle2 size={18} className="text-[#CA8A04] mx-auto" /> : <span className="text-[#0A1628]/20">—</span>
                    ) : (
                      <span className="text-[#0A1628]/70">{row.golden}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center bg-[#CA8A04]/5">
                    {typeof row.signature === 'boolean' ? (
                      row.signature ? <CheckCircle2 size={18} className="text-[#CA8A04] mx-auto" /> : <span className="text-[#0A1628]/20">—</span>
                    ) : (
                      <span className="text-[#0A1628] font-medium">{row.signature}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof row.custom === 'boolean' ? (
                      row.custom ? <CheckCircle2 size={18} className="text-[#CA8A04] mx-auto" /> : <span className="text-[#0A1628]/20">—</span>
                    ) : (
                      <span className="text-[#0A1628]/70">{row.custom}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
