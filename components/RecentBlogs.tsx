'use client'

import ComingSoon from './ComingSoon'
import { motion } from 'framer-motion'

export default function RecentBlogs() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Fresh from the Keyboard ✍️
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto rounded-full" />
                </motion.div>

                <ComingSoon
                    title="Top 5 Blogs In The Oven!"
                    message="We're curating the best insights on AI and Tech. These articles will be served hot very soon."
                />
            </div>
        </section>
    )
}
