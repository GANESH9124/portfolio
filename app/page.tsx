
"use client";

import { useEffect, useState } from "react";
import { Blog, Project } from "@/types";
import FeedItem from "@/components/FeedItem";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type FeedData = {
  item: Blog | Project;
  type: "blog" | "project";
  created_at: string;
};

export default function Home() {
  const [feed, setFeed] = useState<FeedData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const [blogsRes, projectsRes] = await Promise.all([
          fetch(`${API_URL}/blogs`),
          fetch(`${API_URL}/projects`),
        ]);

        const blogs = await blogsRes.json();
        const projects = await projectsRes.json();

        // Combine and Sort
        const feedItems: FeedData[] = [
          ...blogs.slice(0, 5).map((b: Blog) => ({ item: b, type: "blog" as const, created_at: b.created_at })),
          ...projects.slice(0, 5).map((p: Project) => ({ item: p, type: "project" as const, created_at: p.created_at })),
        ];

        feedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        // Limit to 10 items
        setFeed(feedItems.slice(0, 10));
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Hero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="text-center mb-10 pt-10 border-t border-gray-200 dark:border-gray-800">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Feed
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400">
            Latest updates, projects, and thoughts.
          </p>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white dark:bg-gray-900 h-64 rounded-xl border border-gray-200 dark:border-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {feed.map((data, index) => (
              <FeedItem
                key={`${data.type}-${data.item.id}`}
                item={data.item}
                type={data.type}
                index={index}
              />
            ))}

            {feed.length === 0 && (
              <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                <p className="text-lg font-medium">Nothing here yet.</p>
                <p className="text-sm">I'm probably touching grass. 🌱</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

