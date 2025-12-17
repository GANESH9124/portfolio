export default function HobbyDetail({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 capitalize">
                {params.slug}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                This is a placeholder page for the <strong>{params.slug}</strong> section.
                Detailed content including API integrations and galleries will come here soon.
            </p>
        </main>
    )
}
