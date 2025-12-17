'use client'

import { motion } from 'framer-motion'
import { BookOpen, MonitorPlay, Trophy, Plane, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const hobbies = [
    {
        id: 'reading',
        title: 'Reading Books',
        icon: BookOpen,
        color: 'from-blue-400 to-indigo-600',
        desc: "Exploring wisdom from pages. My library of thoughts and atomic habits.",
        cta: "Tour my bookshelf"
    },
    {
        id: 'anime',
        title: 'Binge Watching',
        icon: MonitorPlay,
        color: 'from-pink-400 to-rose-600',
        desc: "I don’t binge, I commit.",
        cta: "Exchange series suggestions"
    },
    {
        id: 'sports',
        title: 'Playing Basketball',
        icon: Trophy,
        color: 'from-orange-400 to-amber-600',
        desc: "My court, my rules. Embracing the Mamba Mentality every single day.",
        cta: "Witness the journey"
    },
    {
        id: 'travel',
        title: 'Traveling',
        icon: Plane,
        color: 'from-emerald-400 to-teal-600',
        desc: "New places, new perspectives. Capturing moments across the map.",
        cta: "Explore my map"
    },

]
export default function HobbyScroll() {
    return (
        <section className="py-20 space-y-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    Beyond the Code
                </h2>
                <p className="text-gray-500 mt-2">What keeps me moving when the laptop is closed.</p>
            </div>

            <div className="space-y-24">
                {hobbies.map((hobby, index) => (
                    <motion.div
                        key={hobby.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <Link href={`/hobbies/${hobby.id}`} className="block group">
                            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">

                                {/* Background Gradient Glow */}
                                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${hobby.color} opacity-10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:opacity-20 transition-opacity`} />
                                <div className={`absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr ${hobby.color} opacity-5 blur-3xl rounded-full -ml-20 -mb-20 group-hover:opacity-15 transition-opacity`} />

                                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${hobby.color} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                        <hobby.icon size={48} />
                                    </div>

                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-colors">
                                            {hobby.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                                            {hobby.desc}
                                        </p>
                                        <div className={`inline-flex items-center gap-2 font-medium bg-gradient-to-r ${hobby.color} text-transparent bg-clip-text group-hover:tracking-wider transition-all`}>
                                            {hobby.cta} <ArrowRight size={20} className={`text-${hobby.color.split('-')[1]}-500`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
