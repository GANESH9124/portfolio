'use client'

import { motion } from 'framer-motion'
import { Utensils } from 'lucide-react'

interface ComingSoonProps {
    title?: string
    message?: string
}

export default function ComingSoon({
    title = "Cooking Up Something Awesome! 🍳",
    message = "This section is currently under development. Stay tuned for some spicy content coming your way soon!"
}: ComingSoonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800"
        >
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 text-orange-500 dark:text-orange-400">
                <Utensils size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {message}
            </p>
        </motion.div>
    )
}
