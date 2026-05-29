"use client";

import React, { useEffect, useState } from "react";

export interface CommentAuthor {
	id: string;
	name?: string;
	email?: string;
}

export interface CommentShape {
	id?: string | number;
	_id?: string | number;
	documentId?: string; // 👈 ADDED: Required for Strapi 5 relations
	content: string;
	text?: string;
	author?: CommentAuthor;
	author_name?: string;
	createdAt?: string;
	children?: CommentShape[];
	replies?: CommentShape[];
	approvalStatus?: "APPROVED" | "REJECTED" | "PENDING" | null; // 👈 ADDED: Moderation tracking
}

type Comment = CommentShape;

interface Props {
	documentId: string | number;
}

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function formatDate(dateStr?: string) {
	if (!dateStr) return "";
	try {
		return new Date(dateStr).toLocaleString();
	} catch {
		return dateStr;
	}
}

function CommentItem({
	comment,
	depth = 0,
	documentId,
	onReplySubmitted,
}: {
	comment: Comment;
	depth?: number;
	documentId: string | number;
	onReplySubmitted?: () => Promise<void> | void;
}) {
	const authorName =
		comment?.author?.name || comment?.author_name || "Anonymous";
	const content = comment?.content || comment?.text || "";
	const createdAt = formatDate(comment?.createdAt);

	// 👇 UPDATED: Filter out rejected or pending nested replies
	const children = (comment?.children || comment?.replies || []).filter(
		(c: Comment) => !c.approvalStatus || c.approvalStatus === "APPROVED",
	);

	const [replyOpen, setReplyOpen] = useState(false);
	const [rName, setRName] = useState("");
	const [rEmail, setREmail] = useState("");
	const [rContent, setRContent] = useState("");
	const [rSubmitting, setRSubmitting] = useState(false);
	const [rError, setRError] = useState<string | null>(null);
	const [rSuccess, setRSuccess] = useState<string | null>(null);

	// 👇 UPDATED: Prioritize documentId for Strapi 5 relationships
	const parentId = comment.documentId || comment.id || comment._id;

	async function submitReply(e: React.FormEvent) {
		e.preventDefault();
		if (!parentId) {
			setRError("Parent comment id missing");
			return;
		}
		setRSubmitting(true);
		setRError(null);
		setRSuccess(null);

		const payload: any = {
			content: rContent,
			threadOf: parentId, // Now correctly passing the alphanumeric documentId
			author: {
				id: "anonymous",
				name: rName,
				email: rEmail,
			},
		};

		try {
			const res = await fetch(
				`${BASE}/api/comments/api::post.post:${documentId}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				},
			);

			if (!res.ok) {
				const text = await res.text();
				throw new Error(
					text || `Failed to submit reply: ${res.status}`,
				);
			}

			setRName("");
			setREmail("");
			setRContent("");
			setRSuccess("Reply submitted! It may be pending moderation.");
			setReplyOpen(false);
			if (onReplySubmitted) await onReplySubmitted();
		} catch (err: any) {
			setRError(err?.message || "Failed to submit reply");
		} finally {
			setRSubmitting(false);
		}
	}

	function cancelReply() {
		setReplyOpen(false);
		setRName("");
		setREmail("");
		setRContent("");
		setRError(null);
		setRSuccess(null);
	}

	return (
		<div
			style={{ borderColor: "hsl(var(--border))" }}
			className="mt-4 pl-2"
		>
			<div
				className="rounded-md p-3 border"
				style={{
					background: "hsl(var(--card))",
					color: "hsl(var(--card-foreground))",
				}}
			>
				<div className="flex items-center justify-between text-sm">
					<div className="font-medium">{authorName}</div>
					<div className="flex items-center gap-3">
						<div className="text-xs opacity-70">{createdAt}</div>
						<button
							type="button"
							onClick={() => setReplyOpen((s) => !s)}
							className="text-xs text-accent hover:underline"
						>
							Reply
						</button>
					</div>
				</div>

				<div className="mt-2 text-sm whitespace-pre-wrap">
					{content}
				</div>
			</div>

			{replyOpen && (
				<div className="ml-4 mt-3">
					<div
						className="rounded-md p-3 border"
						style={{
							background: "hsl(var(--card))",
							borderColor: "hsl(var(--border))",
						}}
					>
						<form onSubmit={submitReply} className="space-y-2">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								<input
									placeholder="Name"
									value={rName}
									onChange={(e) => setRName(e.target.value)}
									required
									className="w-full rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
									style={{
										background: "transparent",
										borderColor: "hsl(var(--input))",
										color: "hsl(var(--foreground))",
									}}
								/>
								<input
									placeholder="Email"
									value={rEmail}
									onChange={(e) => setREmail(e.target.value)}
									type="email"
									required
									className="w-full rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
									style={{
										background: "transparent",
										borderColor: "hsl(var(--input))",
										color: "hsl(var(--foreground))",
									}}
								/>
							</div>
							<div>
								<textarea
									placeholder="Reply..."
									value={rContent}
									onChange={(e) =>
										setRContent(e.target.value)
									}
									required
									rows={3}
									className="w-full rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
									style={{
										background: "transparent",
										borderColor: "hsl(var(--input))",
										color: "hsl(var(--foreground))",
									}}
								/>
							</div>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={cancelReply}
									className="bg-transparent border border-input inline-flex items-center px-3 py-1 rounded-md text-sm text-foreground hover:bg-muted/90 transition-colors"
								>
									Cancel
								</button>

								<button
									type="submit"
									disabled={rSubmitting}
									className="bg-primary text-white inline-flex items-center px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:bg-primary/70 disabled:cursor-not-allowed"
								>
									{rSubmitting ? "Submitting..." : "Reply"}
								</button>

								{rSuccess && (
									<div className="text-sm text-green-600">
										{rSuccess}
									</div>
								)}
								{rError && (
									<div className="text-sm text-red-600">
										{rError}
									</div>
								)}
							</div>
						</form>
					</div>
				</div>
			)}

			{children && children.length > 0 && (
				<div
					className="ml-4 border-l pl-4 mt-3"
					style={{ borderColor: "hsl(var(--border))" }}
				>
					{children.map((c: Comment) => (
						<CommentItem
							key={c.id || c._id || Math.random()}
							comment={c}
							depth={depth + 1}
							documentId={documentId}
							onReplySubmitted={onReplySubmitted}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default function CommentsSection({ documentId }: Props) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(false);

	const [submitError, setSubmitError] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [content, setContent] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	const endpoint = `${BASE}/api/comments/api::post.post:${documentId}`;

	async function fetchComments() {
		setLoading(true);
		try {
			const res = await fetch(endpoint);
			if (!res.ok)
				throw new Error(`Failed to fetch comments: ${res.status}`);
			const data = await res.json();
			setComments(Array.isArray(data) ? data : data?.data || []);
		} catch (err: any) {
			console.error(
				"[Comments Engine Debug] Silent Fetch Fallback Active:",
				err?.message || err,
			);
			setComments([]);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [documentId]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		setSubmitError(null);
		setSuccessMsg(null);

		const payload = {
			content: content,
			author: {
				id: "anonymous",
				name: name,
				email: email,
			},
		};

		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const text = await res.text();
				throw new Error(
					text || `Failed to submit comment: ${res.status}`,
				);
			}

			setName("");
			setEmail("");
			setContent("");
			setSuccessMsg("Comment submitted!");
			await fetchComments();
		} catch (err: any) {
			setSubmitError(
				err?.message || "Failed to submit comment. Please try again.",
			);
		} finally {
			setSubmitting(false);
		}
	}

	// 👇 UPDATED: Pre-calculate the approved comments so the counter is accurate
	const approvedComments = comments.filter(
		(c: Comment) => !c.approvalStatus || c.approvalStatus === "APPROVED",
	);

	return (
		<section aria-labelledby="comments-heading" className="w-full mt-8">
			<h3
				id="comments-heading"
				className="text-lg font-semibold mb-4"
				style={{ color: "hsl(var(--foreground))" }}
			>
				Comments
			</h3>

			<div className="grid gap-6">
				<div
					className="rounded-lg p-4 border"
					style={{
						background: "hsl(var(--card))",
						borderColor: "hsl(var(--border))",
					}}
				>
					<form onSubmit={handleSubmit} className="space-y-3">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<input
								aria-label="Name"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
								style={{
									background: "transparent",
									borderColor: "hsl(var(--input))",
									color: "hsl(var(--foreground))",
								}}
							/>
							<input
								aria-label="Email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								required
								className="w-full rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
								style={{
									background: "transparent",
									borderColor: "hsl(var(--input))",
									color: "hsl(var(--foreground))",
								}}
							/>
						</div>

						<div>
							<textarea
								aria-label="Comment"
								placeholder="Write your comment..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
								rows={4}
								className="w-full rounded-md p-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
								style={{
									background: "transparent",
									borderColor: "hsl(var(--input))",
									color: "hsl(var(--foreground))",
								}}
							/>
						</div>

						<div className="flex items-center gap-3">
							<button
								type="submit"
								disabled={submitting}
								className="bg-primary text-white inline-flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:bg-primary/70 disabled:cursor-not-allowed"
							>
								{submitting ? "Submitting..." : "Post comment"}
							</button>
							{successMsg && (
								<div className="text-sm text-green-600">
									{successMsg}
								</div>
							)}
							{submitError && (
								<div className="text-sm text-red-600">
									{submitError}
								</div>
							)}
						</div>
					</form>
				</div>

				<div>
					<h4
						className="text-md font-medium mb-2"
						style={{ color: "hsl(var(--foreground))" }}
					>
						{loading
							? "Loading comments…"
							: `${approvedComments.length} comment${approvedComments.length !== 1 ? "s" : ""}`}
					</h4>

					<div>
						{approvedComments.length > 0 ? (
							approvedComments.map((c: Comment) => (
								<CommentItem
									key={
										c.documentId ||
										c.id ||
										c._id ||
										Math.random()
									}
									comment={c}
									documentId={documentId}
									onReplySubmitted={fetchComments}
								/>
							))
						) : (
							<div className="text-sm opacity-80 mt-2">
								No comments yet. Be the first to comment!
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
