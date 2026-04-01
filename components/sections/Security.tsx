"use client"

import { Key, Shield, Lock, Database, GitBranch, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function Security() {
  const securityFeatures = [
    {
      icon: Key,
      title: "Strict Access Control",
      description:
        "Your infrastructure is locked down. We use bank-grade authentication to ensure only authorized personnel can access your systems.",
    },
    {
      icon: Shield,
      title: "Private Cloud Environment",
      description:
        "Your workflows run in a private, isolated space—shielded from public internet threats and completely separate from other clients.",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description:
        "Your client data and API keys are encrypted at rest and in transit. We ensure your firm's secrets remain secret.",
    },
    {
      icon: Database,
      title: "Unbreakable Backups",
      description:
        "We perform automated, encrypted backups that are locked against deletion. Even in a worst-case scenario, your data is safe and recoverable.",
    },
    {
      icon: GitBranch,
      title: "Change Tracking & Audits",
      description:
        "Every update to your system is reviewed and recorded. We maintain a complete history of changes for compliance and peace of mind.",
    },
    {
      icon: Activity,
      title: "24/7 Health Monitoring",
      description:
        "We monitor your system's health around the clock. We proactively detect and resolve potential issues often before you even notice them.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your firm's data protection is our top priority. We use industry-leading security measures to keep your information safe, private, and available.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 h-full overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="w-24 h-24 text-teal-500" />
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
