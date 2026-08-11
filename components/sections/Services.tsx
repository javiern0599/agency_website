"use client";
import Image from "next/image";
import {
	Files,
	Users,
	Scale,
	Workflow,
	Shield,
	BarChart,
	Target,
	Inbox,
	Heart,
	Zap,
	Repeat,
	Megaphone,
	Wallet,
} from "lucide-react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { AnimatedBeam } from "../ui/animated-beam";
import { FadeIn } from "../ui/fade-in";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";

const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className,
			)}
		>
			{children}
		</div>
	);
});

Circle.displayName = "Circle";

function AnimatedBeamDemo() {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null);
	const div4Ref = useRef<HTMLDivElement>(null);
	const div5Ref = useRef<HTMLDivElement>(null);
	const div6Ref = useRef<HTMLDivElement>(null);
	const div7Ref = useRef<HTMLDivElement>(null);

	return (
		<div
			className="relative flex h-full w-full items-center justify-center overflow-hidden p-10"
			ref={containerRef}
		>
			<div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
				<div className="flex flex-col justify-center">
					<Circle ref={div7Ref}>
						<Icons.user />
					</Circle>
				</div>
				<div className="flex flex-col justify-center">
					<Circle ref={div6Ref} className="size-16">
						<Icons.n8n />
					</Circle>
				</div>
				<div className="flex flex-col justify-center gap-2">
					<Circle ref={div1Ref}>
						<Icons.googleDrive />
					</Circle>
					<Circle ref={div2Ref}>
						<Icons.notion />
					</Circle>
					<Circle ref={div3Ref}>
						<Icons.outlook />
					</Circle>
					<Circle ref={div4Ref}>
						<Icons.airtable />
					</Circle>
					<Circle ref={div5Ref}>
						<Icons.openai />
					</Circle>
				</div>
			</div>

			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div7Ref}
				toRef={div6Ref}
				gradientStartColor="#0d9488"
				gradientStopColor="#0f172a"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div1Ref}
				gradientStartColor="#0d9488"
				gradientStopColor="#0f172a"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div2Ref}
				gradientStartColor="#0d9488"
				gradientStopColor="#0f172a"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div3Ref}
				gradientStartColor="#0d9488"
				gradientStopColor="#0f172a"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div4Ref}
				gradientStartColor="#0d9488"
				gradientStopColor="#0f172a"
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div5Ref}
				gradientStartColor="#0d9488"
				gradientStopColor="#0f172a"
			/>
		</div>
	);
}

const Icons = {
	googleDrive: () => (
		<Image
			src="/google-drive.svg"
			alt="Google Drive"
			width={40}
			height={40}
			className="h-8 w-8"
		/>
	),
	notion: () => (
		<Image
			src="/notion.svg"
			alt="Notion"
			width={40}
			height={40}
			className="h-8 w-8"
		/>
	),
	n8n: () => (
		<Image
			src="/n8n.svg"
			alt="OpenAI"
			width={60}
			height={60}
			className="h-12 w-12"
		/>
	),
	outlook: () => (
		<Image
			src="/microsoft-outlook.svg"
			alt="Outlook"
			width={40}
			height={40}
			className="h-8 w-8"
		/>
	),
	airtable: () => (
		<Image
			src="/airtable.svg"
			alt="Airtable"
			width={40}
			height={40}
			className="h-8 w-8"
		/>
	),
	openai: () => (
		<Image
			src="/openai.svg"
			alt="OpenAI"
			width={40}
			height={40}
			className="h-8 w-8"
		/>
	),
	user: () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#000000"
			strokeWidth="2"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	),
};

const MarketingIcon = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-lg bg-orange-100",
			className,
		)}
	>
		<Megaphone className="h-6 w-6 text-orange-600" />
	</div>
);

const IntakeIcon = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-lg bg-purple-100",
			className,
		)}
	>
		<Inbox className="h-6 w-6 text-purple-600" />
	</div>
);

const BillingIcon = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-lg bg-emerald-100",
			className,
		)}
	>
		<Wallet className="h-6 w-6 text-emerald-600" />
	</div>
);

const WorkflowIcon = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-lg bg-teal-100",
			className,
		)}
	>
		<Workflow className="h-6 w-6 text-teal-600" />
	</div>
);

const RetentionIcon = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-lg bg-blue-100",
			className,
		)}
	>
		<Heart className="h-6 w-6 text-blue-600" />
	</div>
);

const PostEngagementIcon = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex items-center justify-center rounded-lg bg-amber-100",
			className,
		)}
	>
		<Repeat className="h-6 w-6 text-amber-600" />
	</div>
);

const services = [
	{
		name: "Marketing",
		description:
			"Automate lead capture, nurturing sequences, and ad performance tracking.",
		Icon: MarketingIcon,
		href: "/contact",
		cta: "Learn more",
		background: <div className="absolute inset-0" />,
		className: "md:col-span-1 md:row-span-1 hover:border-orange-500/50",
	},
	{
		name: "Intake & Sales",
		description:
			"AI-based receptionist and automated data collection, appointment setting, and one-click retainer generation.",
		Icon: IntakeIcon,
		href: "/contact",
		cta: "Learn more",
		background: <div className="absolute inset-0" />,
		className: "md:col-span-1 md:row-span-1 hover:border-violet-500/50",
	},
	{
		name: "Client Retention",
		description:
			"Keep clients happy with automated updates, satisfaction surveys, and proactive communication.",
		Icon: RetentionIcon,
		href: "/contact",
		cta: "Learn more",
		background: <div className="absolute inset-0" />,
		className: "md:col-span-1 md:row-span-1 hover:border-blue-500/50",
	},
	{
		name: "Workflow Integration",
		description:
			"Connect your existing tools seamlessly. We integrate with Clio, Airtable, Outlook, and 1000+ platforms.",
		Icon: WorkflowIcon,
		href: "/contact",
		cta: "Learn more",
		background: (
			<div className="absolute top-10 bottom-20 left-10 right-10 hidden md:block">
				<AnimatedBeamDemo />
			</div>
		),
		className: "md:col-span-2 md:row-span-2 hover:border-teal-500/50",
	},
	{
		name: "Billing & Invoicing",
		description:
			"Automate invoice generation, payment tracking, and client billing reminders.",
		Icon: BillingIcon,
		href: "/contact",
		cta: "Learn more",
		background: <div className="absolute inset-0" />,
		className: "md:col-span-1 md:row-span-1 hover:border-emerald-500/50",
	},
	{
		name: "Post Engagement",
		description:
			"Track upsell opportunities and automate follow-ups so past clients never get lost in the cracks.",
		Icon: PostEngagementIcon,
		href: "/contact",
		cta: "Learn more",
		background: <div className="absolute inset-0" />,
		className: "md:col-span-1 md:row-span-1 hover:border-amber-500/50",
	},
];

export default function Services() {
	return (
		<section
			id="services"
			className="py-24 max-w-7xl mx-auto px-6 bg-background"
		>
			<FadeIn margin="-100px">
				<div className="mb-16 md:mb-24">
					<h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
						End-to-End Automation for Law Firms
					</h2>
					<p className="text-muted-foreground max-w-xl text-lg">
						Eliminate the busywork that slows your firm down. We
						connect the tools you already use so routine tasks run
						themselves. Accurately, around the clock, and without
						adding headcount.
					</p>
				</div>
			</FadeIn>
			<BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-[12rem]">
				{services.map((service, idx) => (
					<BentoCard
						key={idx}
						{...service}
						delay={0.1 + idx * 0.05}
					/>
				))}
			</BentoGrid>
		</section>
	);
}
