import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Logistics Manager',
      company: 'Global Freight Solutions',
      content: 'Logistics Lynx has transformed our operations. The AI-powered automation saves us hours every day, and the real-time tracking gives us complete visibility.',
      rating: 5,
      avatar: '/avatars/sarah.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'Express Transport Co.',
      content: 'The autonomous agents are incredible. They handle complex routing decisions automatically, and our delivery times have improved by 30%.',
      rating: 5,
      avatar: '/avatars/michael.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fleet Manager',
      company: 'Regional Carriers Inc.',
      content: 'Finally, a TMS that actually works for carriers. The driver management features are intuitive, and the compliance tracking is a lifesaver.',
      rating: 5,
      avatar: '/avatars/emily.jpg',
    },
  ]

  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See what our customers are saying about Logistics Lynx.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-200 dark:text-primary-800" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
