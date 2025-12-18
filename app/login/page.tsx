"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        setError("");
        setIsLoading(true);

        // Timeout safety: Unlock button after 2 minutes if request hangs
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            setError("Request timed out. Please try again.");
        }, 120000); // 2 minutes

        try {
            const formData = new FormData();
            formData.append("username", "admin");
            formData.append("password", password);

            // Intentionally waiting for fetch
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                body: formData,
            });


            // Clear timeout since we got a response
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await res.json();
            localStorage.setItem("adminToken", data.access_token);
            router.push("/admin");

        } catch (err: any) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 border border-zinc-800 rounded bg-zinc-900 w-full max-w-sm relative">
                <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>

                {error && <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">{error}</p>}

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full p-3 pr-10 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                        disabled={isLoading}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed py-2 rounded font-semibold transition-colors"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Unlock Dashboard"
                    )}
                </button>
            </form>
        </div>
    );
}
