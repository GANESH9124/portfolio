"use client";

import { Blog, Project } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { ExternalLink, Eye, BookOpen, Layers } from "lucide-react";
import Link from "next/link";

type FeedItemProps = {
    item: Blog | Project;
    type: "blog" | "project";
    index: number;
};

export default function FeedItem({ item, type, index }: FeedItemProps) {
    const isProject = type === "project";
    const href = isProject ? (item as Project).link : `/blogs/${item.id}`;
    const date = item.created_at ? new Date(item.created_at) : new Date();
    const thumbnail = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors mb-8"
        >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    GS
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        Ganesh Subhash
                        <span className="text-gray-400 font-normal">posted a {type}</span>
                        {isProject ? <Layers size={14} className="text-blue-500" /> : <BookOpen size={14} className="text-green-500" />}
                    </span>
                    <span className="text-xs text-gray-500">
                        {formatDistanceToNow(date, { addSuffix: true })}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-0">
                <div className="px-4 py-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3 leading-relaxed">
                        {item.description}
                    </p>
                </div>

                {/* Large Image (if exists) */}
                {thumbnail && (
                    <div className="w-full h-64 sm:h-80 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img
                            src={thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-2">
                    {item.tags && item.tags.split(",").slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Eye size={14} />
                        <span>{item.views}</span>
                    </div>

                    {isProject ? (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Visit <ExternalLink size={14} />
                        </a>
                    ) : (
                        <Link
                            href={href}
                            className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"
                        >
                            Read More
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
