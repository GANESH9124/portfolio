'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="pt-6 text-center">
              <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 lg:text-7xl xl:text-8xl">
                Hi
                <span role="img" aria-label="hey">👋,</span>
                I’m
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Ganesh</span>
                .
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                A developer, AI engineer, and creator. Welcome to my little, personal slice of the internet.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500">
                Explore about my <Link href="/projects" className="text-gray-900 dark:text-gray-100 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors">side hustle</Link> and <Link href="/blogs" className="text-gray-900 dark:text-gray-100 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors">blogs</Link> while you are here.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
