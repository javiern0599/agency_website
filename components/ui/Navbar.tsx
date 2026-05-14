"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="fixed w-full z-50 top-0 bg-background/80 backdrop-blur-md border-b border-border">
			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				{/* Logo */}
				<Link href="/">
					<Image
						src="/PraxisFlow-Logotipo-Base.svg"
						alt="PraxisFlow Logo"
						width={128}
						height={128}
						className="h-8 w-auto"
					/>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
					<Link
						href="/about"
						className="hover:text-foreground transition-colors"
					>
						About
					</Link>
					<Link
						href="/blog"
						className="hover:text-foreground transition-colors"
					>
						Blog
					</Link>
					<Link
						href="/case-studies"
						className="hover:text-foreground transition-colors"
					>
						Case Studies
					</Link>
					<Link
						href="/integrations"
						className="hover:text-foreground transition-colors"
					>
						Integrations
					</Link>
					<Link
						href="/pricing"
						className="hover:text-foreground transition-colors"
					>
						Pricing
					</Link>
				</div>

				{/* Desktop CTA Buttons */}
				<div className="hidden lg:flex items-center gap-4">
					<Link
						href="/contact"
						className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-2xl hover:bg-primary/90 transition-colors shadow-sm"
					>
						Contact Us
					</Link>
				</div>

				{/* Mobile Hamburger Button */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
					aria-label="Toggle menu"
				>
					{isMenuOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="lg:hidden bg-background border-b border-border">
					<div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
						<Link
							href="/about"
							className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							About
						</Link>
						<Link
							href="/case-studies"
							className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Case Studies
						</Link>
						<Link
							href="/integrations"
							className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Integrations
						</Link>
						<Link
							href="/pricing"
							className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Pricing
						</Link>
						<div className="pt-4 border-t border-border space-y-3">
							<Link
								href="/contact"
								className="block w-full bg-primary text-primary-foreground text-sm font-medium px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-center"
								onClick={() => setIsMenuOpen(false)}
							>
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
