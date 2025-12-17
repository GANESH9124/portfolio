'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Brain, Wrench } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Languages',
      skills: ['Python', 'C', 'C++'],
      color: 'from-lakers-purple to-lakers-gold',
    },
    {
      icon: Brain,
      title: 'AI/ML Frameworks',
      skills: [
        'PyTorch',
        'TensorFlow',
        'Pandas',
        'NumPy',
        'Matplotlib',
        'Airflow',
        'LangChain',
        'HuggingFace',
        'OpenCV',
        'OpenVINO',
      ],
      color: 'from-sports-red to-lakers-gold',
    },
    {
      icon: Code2,
      title: 'Web Frameworks',
      skills: ['FastAPI', 'React', 'DBT'],
      color: 'from-lakers-purple to-sports-red',
    },
    {
      icon: Wrench,
      title: 'Dev Tools',
      skills: ['Git', 'GitHub', 'Docker', 'VSCode'],
      color: 'from-lakers-gold to-sports-red',
    },
    {
      icon: Database,
      title: 'Databases',
      skills: ['FAISS', 'SQL', 'MongoDB', 'BigQuery'],
      color: 'from-lakers-purple to-lakers-gold',
    },
    {
      icon: Brain,
      title: 'Concepts',
      skills: [
        'ML',
        'DL',
        'LLM',
        'RAG',
        'OOPS',
        'DSA',
        'FineTuning',
        'Transfer Learning',
        'Agentic AI',
        'Generative AI',
      ],
      color: 'from-sports-red to-lakers-purple',
    },
    {
      icon: Brain,
      title: 'AI Knowledge',
      skills: [
        'CNN',
        'ANN',
        'RNN',
        'LSTM',
        'Transformers',
        'SVM',
        'Regression',
        'Classification',
        'Probability',
        'Statistics',
        'Calculus',
        'Linear Algebra',
        'Optimization',
        'Traditional AI',
      ],
      color: 'from-lakers-gold to-lakers-purple',
    },
    {
      icon: Code2,
      title: 'APIs',
      skills: ['OpenAI', 'Anthropic', 'Gemini'],
      color: 'from-sports-red to-lakers-gold',
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-lakers-gold via-sports-red to-lakers-purple mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-card rounded-xl p-6 border border-dark-border hover-lift glow-purple hover:glow-gold transition-smooth"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} p-3 mb-4 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-lakers-gold">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-dark-surface rounded-full text-sm text-gray-300 border border-dark-border hover:border-lakers-gold transition-smooth"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

