"use client"

import { Zap, GitMerge, Sparkles, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Process() {
    return (
        <section
            id="process"
            className="py-32 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white overflow-hidden relative"
        >
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">Our End-to-End Process</h2>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        We handle everything from infrastructure provisioning and security hardening to custom workflow design and
                        ongoing management, so you can focus on practicing law and generating cashflow.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting line with gradient - Teal → Blue → Violet → Emerald */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[2px] origin-left"
                        style={{
                            background: 'linear-gradient(to right, rgba(20, 184, 166, 0.5) 0%, rgba(59, 130, 246, 0.5) 33%, rgba(139, 92, 246, 0.5) 66%, rgba(16, 185, 129, 0.5) 100%)'
                        }}
                    ></motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 - Discovery (Teal) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 h-full overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Zap className="w-24 h-24 text-teal-500" />
                                </div>

                                <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 text-teal-400">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-semibold mb-3 text-white">Discovery</h4>
                                <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                                    We analyze your current workflows, identify pain points, and map out opportunities for automation
                                    tailored to your practice.
                                </p>
                            </div>

                            {/* Vertical line after step 1 */}
                            {/* Mobile: Teal to Blue | Tablet: Teal to Violet (connects to step 3) */}
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileInView={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="md:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-gradient-to-b from-teal-500/50 to-blue-500/50 origin-top"
                            ></motion.div>
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileInView={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="hidden md:block lg:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-gradient-to-b from-teal-500/50 to-violet-500/50 origin-top"
                            ></motion.div>
                        </motion.div>

                        {/* Step 2 - Development (Blue) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <GitMerge className="w-24 h-24 text-blue-500" />
                                </div>

                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                                    <GitMerge className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-semibold mb-3 text-white">Development</h4>
                                <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                                    Our team builds custom automation infrastructure that seamlessly integrates with your existing tools
                                    and systems.
                                </p>
                            </div>

                            {/* Vertical line after step 2 */}
                            {/* Mobile: Blue to Violet | Tablet: Blue to Emerald (connects to step 4) */}
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileInView={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="md:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-gradient-to-b from-blue-500/50 to-violet-500/50 origin-top"
                            ></motion.div>
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileInView={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="hidden md:block lg:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-gradient-to-b from-blue-500/50 to-emerald-500/50 origin-top"
                            ></motion.div>
                        </motion.div>

                        {/* Step 3 - Delivery (Violet) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 h-full overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Sparkles className="w-24 h-24 text-violet-500" />
                                </div>

                                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 text-violet-400">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-semibold mb-3 text-white">Delivery</h4>
                                <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                                    We deploy your custom workflows, train your team, and ensure everything runs smoothly from day one.
                                </p>
                            </div>

                            {/* Vertical line after step 3 - Violet to Emerald (mobile only) */}
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileInView={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="md:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-gradient-to-b from-violet-500/50 to-emerald-500/50 origin-top"
                            ></motion.div>
                        </motion.div>

                        {/* Step 4 - Support & Scale (Emerald) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <CheckCircle2 className="w-24 h-24 text-emerald-500" />
                                </div>

                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-semibold mb-3 text-white">Support & Scale</h4>
                                <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                                    We provide continuous monitoring, maintenance, and optimization as your firm grows and evolves.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
