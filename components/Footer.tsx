import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/GANESH9124',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/ganesh-kumbhar-958bab240/',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:kumbharganesh9124@gmail.com',
      label: 'Email',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/_ganesh9124/',
      label: 'Instagram',
    }
  ]

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Ganesh Kumbhar - Chennai, India
            </p>
            <p className="text-gray-500 text-xs mt-1">
              All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
