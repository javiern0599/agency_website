"use client";

import { Key, ShieldCheck, Lock, Database, FileText, Activity } from "lucide-react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { FadeIn } from "../ui/fade-in";
import { cn } from "@/lib/utils";

const Icons = {
  Key: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center rounded-full bg-background p-3 shadow-sm", className)}>
      <Key className="h-6 w-6 text-teal-500" />
    </div>
  ),
  Shield: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center rounded-full bg-background p-3 shadow-sm", className)}>
      <ShieldCheck className="h-6 w-6 text-teal-500" />
    </div>
  ),
  Lock: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center rounded-full bg-background p-3 shadow-sm", className)}>
      <Lock className="h-6 w-6 text-teal-500" />
    </div>
  ),
  Database: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center rounded-full bg-background p-3 shadow-sm", className)}>
      <Database className="h-6 w-6 text-teal-500" />
    </div>
  ),
  FileText: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center rounded-full bg-background p-3 shadow-sm", className)}>
      <FileText className="h-6 w-6 text-teal-500" />
    </div>
  ),
  Activity: ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center rounded-full bg-background p-3 shadow-sm", className)}>
      <Activity className="h-6 w-6 text-teal-500" />
    </div>
  ),
};

const features = [
  {
    name: "Strict Access Control",
    description:
      "Your infrastructure is locked down. We use bank-grade authentication to ensure only authorized personnel can access your systems.",
    Icon: Icons.Key,
  },
  {
    name: "Private Cloud Environment",
    description:
      "Your workflows run in a private, isolated space—shielded from public internet threats and completely separate from other clients.",
    Icon: Icons.Shield,
  },
  {
    name: "End-to-End Encryption",
    description:
      "Your client data and API keys are encrypted at rest and in transit. We ensure your firm's secrets remain secret.",
    Icon: Icons.Lock,
  },
  {
    name: "Unbreakable Backups",
    description:
      "We perform automated, encrypted backups that are locked against deletion. In a worst-case scenario, your data is safe and recoverable.",
    Icon: Icons.Database,
  },
  {
    name: "Change Tracking & Audits",
    description:
      "Every update to your system is reviewed and recorded. We maintain a complete history of changes for compliance and peace of mind.",
    Icon: Icons.FileText,
  },
  {
    name: "24/7 Health Monitoring",
    description:
      "We monitor your system's health around the clock and proactively detect and resolve potential issues often before you notice them.",
    Icon: Icons.Activity,
  },
];

export default function Security() {
  return (
    <section id="security" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeIn margin="-200px">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your firm's data protection is our top priority. We use industry-leading security measures to keep your information safe, private, and available.
            </p>
          </div>
        </FadeIn>

        <div className="mt-8">
          <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-[14rem] gap-6">
            {features.map((f, idx) => (
              <BentoCard
                key={idx}
                name={f.name}
                description={f.description}
                Icon={f.Icon}
                href="/contact"
                cta="Learn more"
                background={<div className="absolute inset-0" />}
                className="md:col-span-1 rounded-2xl hover:border-teal-500/40"
                delay={0.05 + idx * 0.03}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
