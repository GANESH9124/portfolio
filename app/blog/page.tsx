import ComingSoon from '@/components/ComingSoon'

export default function Blog() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Blog
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-light via-green to-green-neon mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">
            Thoughts on AI, Machine Learning, and Software Development
          </p>
        </div>

        <div className="space-y-8">
          <ComingSoon
            title="Tech Thoughts Loading..."
            message="I'm brewing some in-depth articles on Machine Learning, System Design, and Web Dev. Grab a coffee, they'll be here soon! ☕"
          />
        </div>
      </div>
    </div>
  )
}

