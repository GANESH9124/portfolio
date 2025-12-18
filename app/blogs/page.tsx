"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { Blog } from "@/types";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch(`${API_URL}/blogs`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                // Sort by Newest
                const sorted = data.sort((a: Blog, b: Blog) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
                setBlogs(sorted);
                setFilteredBlogs(sorted);
            } catch (err) {
                setError("Oops! My backend tripped over a cable. 🔌");
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredBlogs(blogs);
        } else {
            const lowerSearch = search.toLowerCase();
            setFilteredBlogs(blogs.filter(blog =>
                blog.title.toLowerCase().includes(lowerSearch) ||
                blog.description.toLowerCase().includes(lowerSearch) ||
                blog.tags.toLowerCase().includes(lowerSearch)
            ));
        }
    }, [search, blogs]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white"
                    >
                        Writing<span className="text-blue-600">.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-xl"
                    >
                        Thoughts, tutorials, and rants about code, life, and everything in between.
                    </motion.p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-5 py-4 pl-12 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* Content */}
                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="h-48 bg-gray-200 dark:bg-gray-900 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-xl font-bold text-red-500 mb-2">Error 500ish</p>
                        <p className="text-gray-500">{error}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBlogs.map((blog, index) => (
                            <BlogCard key={blog.id} blog={blog} index={index} />
                        ))}

                        {filteredBlogs.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-800">
                                {search ? (
                                    <>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white ">No results found.</h3>
                                        <p className="text-gray-500">Maybe try a different keyword?</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white ">No ink in the pen. ✒️</h3>
                                        <p className="text-gray-500">I haven't written anything yet. Check back soon!</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
