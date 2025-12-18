"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminForm from "@/components/admin/AdminForms";

export default function AdminPage() {
    const [token, setToken] = useState("");
    const [activeTab, setActiveTab] = useState("blog");
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (!storedToken) {
            router.push("/login"); // Redirect to login if no token
        } else {
            setToken(storedToken);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/login");
    };

    if (!token) {
        return <div className="h-screen bg-zinc-950 text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Control Center</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your portfolio content from one place.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-800 w-fit shadow-sm">
                    {["blog", "project", "book", "movie", "travel"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md transform scale-105"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">Add New {activeTab}</h2>
                    </div>
                    <AdminForm type={activeTab} apiKey={token} />
                </div>
            </div>
        </div>
    );
}
