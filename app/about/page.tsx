'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import HobbyScroll from '@/components/HobbyScroll'

function QuoteSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 p-8 md:p-12 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 p-4 opacity-10 text-6xl font-serif text-purple-500">“</div>

      <blockquote className="relative z-10 max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed">
          "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
        </p>
        <footer className="mt-6 text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
          — Steve Jobs
        </footer>
      </blockquote>

      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-100 to-transparent dark:from-purple-900/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
    </motion.div>
  )
}

function TiltImage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const xPct = (clientX - left) / width - 0.5
    const yPct = (clientY - top) / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md aspect-[4/5]"
    >
      {/* Gradient Glow Effect */}
      <div
        className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-30 dark:opacity-50 blur-2xl -z-10 transition-opacity duration-300"
        style={{ transform: "translateZ(-20px)" }}
      />

      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
      >
        <Image
          src="/images/profile/ganesh.JPG"
          alt="Ganesh Kumbhar"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 500px"
          priority
        />

        {/* Subtle overlay for better blending in themes */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent dark:from-purple-900/20 pointer-events-none mix-blend-overlay" />
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Hey there, let's meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Ganesh</span>.
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full" />
        </motion.div>

        {/* content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 text-lg text-gray-600 dark:text-gray-300 leading-relaxed order-2 lg:order-1"
          >
            <p>
              😎 Ganesh is a software developer and AI enthusiast based in Chennai, India. What began as a simple curiosity about how things work slowly grew into a passion for building systems that think, scale, and solve real-world problems.
            </p>

            <p>
              With a background in Computer Science and a focus on AI, Ganesh enjoys working at the intersection of logic and usability 🤓. He is currently working as Junior Software Developer at <Link href="https://randomwalk.ai/" target="_blank" rel="noopener noreferrer" className='text-gray-900 dark:text-gray-100 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors'>RandomWalk.ai</Link>, where he contributes to building practical, scalable solutions that are designed to work well in real-world environments.
            </p>

            <p>
              He completed his B.Tech in CSE with major in AI from <Link href='https://www.iiitdm.ac.in/' target="_blank" rel="noopener noreferrer" className='text-gray-900 dark:text-gray-100 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors'> IIITDM Kancheepuram </Link>🎓, where hands-on learning and experimentation and also participation in sports shaped teamwork. His schooling at Jawahar Navodaya Vidyalaya, Solapur played an early role in building curiosity and a steady learning mindset that continues to guide his work today 🌱.
            </p>

            {/* Vacant space for future use */}
            <div></div>

            <div className="pt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:opacity-90 transition-opacity"
              >
                What He’s Building →
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Tilt Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center lg:justify-end perspective-1000 order-1 lg:order-2"
          >
            <TiltImage />
          </motion.div>

        </div>

        {/* Scroll Hobbies Section */}
        <HobbyScroll />

        {/* Quote Section */}
        <QuoteSection />

      </div>
    </main>
  )
}
