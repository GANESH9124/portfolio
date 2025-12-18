"use client";

import { useState } from "react";

type FormField = {
    name: string;
    label: string;
    type: "text" | "textarea" | "url";
    required?: boolean;
};

type FormConfig = {
    endpoint: string;
    fields: FormField[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FORMS: Record<string, FormConfig> = {
    blog: {
        endpoint: `${API_URL}/blogs`,
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "description", label: "Description", type: "text", required: true },
            { name: "content", label: "Markdown Content", type: "textarea", required: true },
            { name: "tags", label: "Tags (comma separated)", type: "text" },
        ],
    },
    project: {
        endpoint: `${API_URL}/projects`,
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "description", label: "Description", type: "text", required: true },
            { name: "link", label: "Project Link", type: "url", required: true },
            { name: "tags", label: "Tags", type: "text", required: true },
        ],
    },
    book: {
        endpoint: `${API_URL}/about/reading`,
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "author", label: "Author", type: "text", required: true },
            { name: "quote", label: "Quote", type: "text" },
            { name: "freelink", label: "Read Link", type: "url" },
        ],
    },
    movie: {
        endpoint: `${API_URL}/about/binge`,
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "studios", label: "Studio", type: "text", required: true },
            { name: "quote", label: "Quote", type: "text" },
            { name: "freelink", label: "Watch Link", type: "url" },
        ],
    },
    travel: {
        endpoint: `${API_URL}/about/travel`,
        fields: [
            { name: "destination", label: "Destination", type: "text", required: true },
            { name: "experience", label: "Experience", type: "textarea" },
        ],
    },
};

export default function AdminForm({
    type,
    apiKey,
}: {
    type: string;
    apiKey: string;
}) {
    const config = FORMS[type];
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
        "idle"
    );
    const [message, setMessage] = useState("");

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length + selectedFiles.length > 4) {
                alert("Maximum 4 images allowed");
                return;
            }
            setSelectedFiles((prev) => [...prev, ...files]);

            // Generate previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            let imageUrls: string[] = [];

            // 1. Upload Images if any
            if (selectedFiles.length > 0) {
                const uploadData = new FormData();
                selectedFiles.forEach((file) => {
                    uploadData.append("files", file);
                });

                const uploadRes = await fetch(`${API_URL}/upload`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: uploadData,
                });

                if (!uploadRes.ok) throw new Error("Image upload failed");
                const uploadJson = await uploadRes.json();
                imageUrls = uploadJson.images;
            }

            // 2. Submit Data
            const finalPayload = {
                ...formData,
                images: imageUrls
            };

            const res = await fetch(config.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify(finalPayload),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            setStatus("success");
            setMessage("Item created successfully!");
            setFormData({}); // Reset form
            setSelectedFiles([]);
            setPreviews([]);
        } catch (err: any) {
            setStatus("error");
            setMessage(err.message);
        }
    };

    if (!config) return <p>Invalid Form Type</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {status === "success" && (
                <div className="p-3 bg-green-900/50 border border-green-800 text-green-200 rounded">
                    {message}
                </div>
            )}
            {status === "error" && (
                <div className="p-3 bg-red-900/50 border border-red-800 text-red-200 rounded">
                    {message}
                </div>
            )}

            {/* Image Uploader */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Images (Max 4)</label>
                <div className="flex flex-wrap gap-4">
                    {previews.map((src, i) => (
                        <div key={i} className="relative w-24 h-24 rounded overflow-hidden border border-gray-700 group">
                            <img src={src} className="w-full h-full object-cover" alt="preview" />
                            <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="absolute top-0 right-0 bg-red-600 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    {previews.length < 4 && (
                        <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-600 rounded cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors">
                            <span className="text-sm">+ Add</span>
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    )}
                </div>
            </div>

            {config.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {!field.required && <span className="text-xs text-gray-400">Optional</span>}
                    </div>
                    {field.type === "textarea" ? (
                        <textarea
                            required={field.required}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-y"
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    ) : (
                        <input
                            type={field.type}
                            required={field.required}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    )}
                </div>
            ))}

            <button
                disabled={status === "loading"}
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
            >
                {status === "loading" ? "Submitting..." : "Create Item"}
            </button>
        </form>
    );
}
