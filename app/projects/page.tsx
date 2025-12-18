"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/projects`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Funky Header */}
        <div className="mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white"
          >
            Side <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hustles.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl"
          >
            A collection of my weird, fun, and fast-built side projects.
            Shipped for laughs, learning, and the <span className="text-red-500">♥</span> of building.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 text-sm text-gray-500"
          >
            <span>🚀 Experimental</span>
            <span>•</span>
            <span>⚡ Fast</span>
            <span>•</span>
            <span>🛠️ Broken (sometimes)</span>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">No hustles found yet.</h3>
            <p className="text-gray-500">I'm probably debugging one right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

