"use client";

import { Blog } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogCard({ blog, index }: { blog: Blog; index: number }) {
    const date = blog.created_at ? new Date(blog.created_at) : new Date();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false, margin: "-50px" }}
            className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg dark:hover:shadow-gray-800/50 transition-all duration-300 w-full"
        >
            {/* Meta Header */}
            <div className="flex justify-between items-center mb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{formatDistanceToNow(date, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Eye size={14} className="text-gray-400" />
                    <span>{blog.views} views</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="mb-6">
                <Link href={`/blogs/${blog.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {blog.title}
                    </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {blog.description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800/50">
                <Link
                    href={`/blogs/${blog.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:gap-3 transition-all"
                >
                    Read more <ArrowRight size={16} />
                </Link>

                {/* Tags */}
                <div className="hidden sm:flex gap-2">
                    {blog.tags.split(",").slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-md">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
