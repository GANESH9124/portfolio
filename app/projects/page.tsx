import ComingSoon from '@/components/ComingSoon'

export default function Projects() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-light via-green to-green-neon mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">
            Showcasing my work in AI, Machine Learning, and Software Development
          </p>
        </div>

        <div className="flex justify-center">
          <ComingSoon
            title="Building Next-Gen Stuff 🚀"
            message="My latest projects involving GenAI, Full Stack, and Cloud are being polished. The repository will open soon!"
          />
        </div>
      </div>
    </div>
  )
}

