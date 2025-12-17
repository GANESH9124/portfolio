'use client'
import { DbtIcon, AirflowIcon } from '@/components/icons'
import { motion } from 'framer-motion'
import {
  FaPython, FaReact, FaJava, FaJs, FaDocker, FaGitAlt, FaGithub, FaAws, FaLinux, FaDownload, FaCode
} from 'react-icons/fa'
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiCplusplus, SiC, SiPytorch, SiTensorflow, SiPandas, SiNumpy, SiMysql, SiGraphql, SiMongodb, SiPostgresql, SiScikitlearn, SiOpencv, SiHuggingface, SiLangchain
} from 'react-icons/si'
// import { TbBrandFramerMotion } from 'react-icons/tb' 
import { TbBrandFramerMotion } from 'react-icons/tb'
import Link from 'next/link'

// Define the structure for skills
interface Skill {
  name: string
  icon: React.ElementType
  color: string // Tailwind text color class or hex
}

interface SkillCategory {
  title: string
  description: string
  skills: Skill[]
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      description: 'The core languages I speak fluently.',
      skills: [
        { name: 'Python', icon: FaPython, color: 'text-yellow-400' },
        { name: 'C', icon: SiC, color: 'text-blue-500' },
        { name: 'C++', icon: SiCplusplus, color: 'text-blue-600' },
        { name: 'SQL', icon: SiMysql, color: 'text-blue-300' }, // Using MySQL icon for generic SQL representation or Postgres
      ],
    },
    {
      title: 'Frameworks & Libraries',
      description: 'Tools for building robust applications and AI models.',
      skills: [
        { name: 'PyTorch', icon: SiPytorch, color: 'text-orange-500' },
        { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-400' },
        { name: 'Pandas', icon: SiPandas, color: 'text-purple-400' },
        { name: 'NumPy', icon: SiNumpy, color: 'text-blue-300' },
        { name: 'Scikit-Learn', icon: SiScikitlearn, color: 'text-orange-300' },
        { name: 'OpenCV', icon: SiOpencv, color: 'text-green-500' },
        { name: 'React', icon: FaReact, color: 'text-cyan-400' },
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
        { name: 'HuggingFace', icon: SiHuggingface, color: 'text-yellow-400' },
        { name: 'LangChain', icon: SiLangchain, color: 'text-green-600' },
      ],
    },
    {
      title: 'Tools & Platforms',
      description: 'The ecosystem that supports my development workflow.',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
        { name: 'GitHub', icon: FaGithub, color: 'text-gray-200' },
        { name: 'Docker', icon: FaDocker, color: 'text-blue-500' },
        { name: 'Linux', icon: FaLinux, color: 'text-yellow-200' },
        { name: "DBT", icon: DbtIcon, color: 'text-orange-600' },
        { name: 'VS Code', icon: FaCode, color: 'text-blue-400' },
        { name: 'Airflow', icon: AirflowIcon, color: 'text-blue-400' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-300' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Skill Stack <span className="text-4xl">🧰</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            This page lists the languages, libraries, and tools Ganesh uses in his day-to-day work <span className="text-xl">🧠</span>. Nothing fancy — just the tech that helps him build, learn, and improve over time.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 pl-2 border-l-4 border-purple-500">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-500 mb-8 pl-3 text-sm">
                {category.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors duration-300 group cursor-default hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className={`text-4xl ${skill.color} filter drop-shadow-lg transition-transform duration-300 group-hover:rotate-12`}>
                        <Icon />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-300 group"
          >
            <FaDownload className="text-xl group-hover:translate-y-1 transition-transform" />
            Download Resume
          </Link>
          <p className="text-gray-500 dark:text-gray-600 text-sm mt-4">
            (Link coming soon)
          </p>
        </motion.div>

      </div>
    </div>
  )
}
