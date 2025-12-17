'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, MonitorPlay, Trophy, Plane, X, Star, Quote } from 'lucide-react'
import Image from 'next/image'

// Types
type HobbyType = 'reading' | 'anime' | 'sports' | 'travel' | null

interface Book {
    id: number
    title: string
    author: string
    rating: number
    cover: string
    thoughts: string
}

interface Anime {
    id: number
    title: string
    quote: string
    lesson: string
}

// Mock Data
const BOOKS: Book[] = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        rating: 5,
        cover: "/images/books/atomic.jpg",
        thoughts: "Small habits make a big difference."
    },
    {
        id: 2,
        title: "Deep Work",
        author: "Cal Newport",
        rating: 5,
        cover: "/images/books/deepwork.jpg",
        thoughts: "Focus is the new IQ in the knowledge economy."
    },
    {
        id: 3,
        title: "Psychology of Money",
        author: "Morgan Housel",
        rating: 5,
        cover: "/images/books/money.jpg",
        thoughts: "Doing well with money has a little to do with how smart you are and a lot to do with how you behave."
    }
]

const ANIMES: Anime[] = [
    {
        id: 1,
        title: "Naruto",
        quote: "Hard work is worthless for those that don't believe in themselves.",
        lesson: "Never give up."
    },
    {
        id: 2,
        title: "Attack on Titan",
        quote: "If you don't fight, you can't win!",
        lesson: "Freedom comes at a cost."
    },
    {
        id: 3,
        title: "Haikyuu!!",
        quote: "Talent is something you make bloom, instinct is something you polish.",
        lesson: "Teamwork makes the dream work."
    }
]

export default function HobbyGrid() {
    const [selectedHobby, setSelectedHobby] = useState<HobbyType>(null)
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)

    // Simulate API Call for Books
    useEffect(() => {
        if (selectedHobby === 'reading') {
            setLoading(true)
            // Simulate network delay
            setTimeout(() => {
                setBooks(BOOKS)
                setLoading(false)
            }, 800)
        }
    }, [selectedHobby])

    const hobbies = [
        {
            id: 'reading',
            title: 'Reading Books',
            icon: BookOpen,
            color: 'from-blue-400 to-indigo-600',
            desc: "Exploring wisdom from pages."
        },
        {
            id: 'anime',
            title: 'Watching Anime',
            icon: MonitorPlay,
            color: 'from-pink-400 to-rose-600',
            desc: "Learnings wrapped in entertainment."
        },
        {
            id: 'sports',
            title: 'Playing Basketball',
            icon: Trophy,
            color: 'from-orange-400 to-amber-600',
            desc: "My court, my rules. Kobe mentality 🏀"
        },
        {
            id: 'travel',
            title: 'Traveling',
            icon: Plane,
            color: 'from-emerald-400 to-teal-600',
            desc: "New places, new perspectives."
        }
    ] as const

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hobbies.map((hobby) => (
                    <motion.div
                        key={hobby.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedHobby(hobby.id)}
                        className="group relative overflow-hidden p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer min-h-[160px] flex flex-col justify-between"
                    >
                        <div className={`absolute top-0 right-0 p-32 opacity-10 bg-gradient-to-br ${hobby.color} blur-3xl rounded-full -mr-16 -mt-16 transition-opacity group-hover:opacity-20`} />

                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${hobby.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                <hobby.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{hobby.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{hobby.desc}</p>
                        </div>

                        <div className="absolute bottom-4 right-4 text-gray-300 dark:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                            Explore →
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedHobby && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedHobby(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-950 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedHobby(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                {selectedHobby === 'reading' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
                                            My Bookshelf
                                        </h2>
                                        {loading ? (
                                            <div className="flex justify-center py-12">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                                            </div>
                                        ) : (
                                            <div className="grid gap-6">
                                                {books.map((book) => (
                                                    <div key={book.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                                        <div className="w-16 h-24 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0" /> {/* Placeholder for Cover */}
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 dark:text-white">{book.title}</h3>
                                                            <p className="text-sm text-gray-500">{book.author}</p>
                                                            <div className="flex items-center gap-1 my-2">
                                                                {[...Array(book.rating)].map((_, i) => (
                                                                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                                                ))}
                                                            </div>
                                                            <p className="text-sm italic text-gray-600 dark:text-gray-400">"{book.thoughts}"</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedHobby === 'anime' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-600">
                                            Anime & Learnings
                                        </h2>
                                        <div className="grid gap-4">
                                            {ANIMES.map((anime) => (
                                                <div key={anime.id} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-pink-500/30 transition-colors">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{anime.title}</h3>
                                                    <div className="flex gap-3 mb-3">
                                                        <Quote className="flex-shrink-0 text-pink-500" size={20} />
                                                        <p className="text-lg italic text-gray-700 dark:text-gray-300 font-serif">
                                                            {anime.quote}
                                                        </p>
                                                    </div>
                                                    <div className="inline-block px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-xs font-semibold text-pink-600 dark:text-pink-400">
                                                        Lesson: {anime.lesson}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(selectedHobby === 'sports' || selectedHobby === 'travel') && (
                                    <div className="text-center py-12">
                                        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
                                            Photo Gallery
                                        </h2>
                                        <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                            <p className="text-gray-500 font-medium">📸 Photos are being developed in the darkroom! Coming soon...</p>
                                        </div>
                                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                                            Showcasing my journey through {selectedHobby === 'sports' ? 'basketball courts' : 'new destinations'}.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
