'use client'; // hover演出など軽いUI。無くても動くけど付けとく。
import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
	return (
		<article className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
			<h3 className="text-lg font-semibold">
				<Link href={`/posts/${post.slug}`} className="hover:underline">
					{post.title}
				</Link>
			</h3>

			<p className="mt-1 text-xs text-neutral-500">
				{post.date} ・ {post.tags.join(', ')}
			</p>

			<p className="mt-2 text-sm text-neutral-700 line-clamp-2">
				{post.excerpt}
			</p>

			<div className="mt-3">
				<Link
					href={`/posts/${post.slug}`}
					className="text-sm underline underline-offset-2"
				>
					続きを読む →
				</Link>
			</div>
		</article>
	);
}
