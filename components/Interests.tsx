'use client'

import { motion } from 'framer-motion'

export default function Interests() {
  const interests = [
    {
      title: 'Reading',
      description: 'Love exploring new ideas and knowledge',
    },
    {
      title: 'Basketball',
      description: 'Represented college for 2 years',
    },
    {
      title: 'Table Tennis',
      description: 'Fast-paced precision sport',
    },
    {
      title: 'Cricket',
      description: 'Passion for the gentleman\'s game',
    },
  ]

  return (
    <section id="interests" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm text-gray-500 mb-2">/ INTERESTS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Beyond Code
          </h2>
          <p className="text-gray-400">
            What keeps me motivated and balanced
          </p>
        </motion.div>

        <div className="space-y-8">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-1"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-green-light">
                {interest.title}
              </h3>
              <p className="text-gray-400">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
