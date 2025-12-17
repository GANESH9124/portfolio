import Hero from '@/components/Hero'
import RecentBlogs from '@/components/RecentBlogs'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Hero />
      <RecentBlogs />
    </main>
  )
}
