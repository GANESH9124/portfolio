"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";


export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false, margin: "-50px" }}
            className="group block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 h-full flex flex-col"
        >
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                </h3>
            </div>

            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.split(",").map((tag) => (
                    <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-md"
                    >
                        {tag.trim()}
                    </span>
                ))}
            </div>
        </motion.a>
    );
}
