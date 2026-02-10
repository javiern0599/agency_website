"use client"

import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function FAQsHomepage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "How long does a typical automation take to build?",
            answer:
                "Implementation timelines vary based on complexity, but most projects take 4-12 weeks from discovery to full deployment. Simple integrations might take 2-3 weeks, while comprehensive firm-wide automation could take 3 months. We provide a detailed project timeline during discovery and keep you updated throughout each phase.",
        },
        {
            question: "Who owns the data and workflows?",
            answer:
                "You do. 100%. Unlike closed platforms, we build on your own private infrastructure. You own the workflows, the data, and the n8n instance. We simply manage and maintain it for you.",
        },
        {
            question: "Do I need to pay for n8n?",
            answer:
                "n8n is free and open-source software. While n8n offers a paid cloud version, we deploy the self-hosted edition on your own private infrastructure. This ensures you have no limits on workflow complexity, complete data isolation, and full ownership—qualities that often cost significantly more or aren't possible with standard cloud plans. Your fee covers this dedicated infrastructure and our expert management, not a software license.",
        },
        {
            question: "Do we need to switch from our current legal software?",
            answer:
                "No. We integrate with your existing tools—Clio, MyCase, LawLion, and 1,000+ other applications. Our workflows layer on top of your current infrastructure, so there's minimal disruption. In fact, we often reduce friction by automating the manual data transfers between your existing systems.",
        },
        {
            question: "How do you handle sensitive client data and security?",
            answer:
                "Security is foundational. We build your automations using n8n, which allows us to provide a service unrestricted by the heavy over-usage charges typically imposed by platforms like Zapier or Make. Instead of your data sitting on a third-party cloud, your n8n instance runs within a dedicated, private environment. This ensures your sensitive business information stays within your control. Never shared, never co-mingled, and with no data passing through our servers. We implement end-to-end encryption for sensitive data, maintain detailed audit logs for compliance, and follow legal industry standards. All API credentials are stored securely in encrypted vaults, and we conduct quarterly security reviews.",
        },
    ]

    return (
        <section className="py-24 bg-secondary/50">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] tracking-tight mb-4">Understanding Our Partnership</h2>
                    <p className="text-slate-500 text-lg">
                        Answers to what firms typically ask about our process, security, and approach.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-teal-500/30 transition-shadow transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50/50 transition-colors text-left"
                            >
                                <span className="font-medium text-slate-900">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-teal-600 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-6 bg-slate-50/50 border-t border-slate-100"
                                    >
                                        <div className="pb-6 pt-2">
                                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
