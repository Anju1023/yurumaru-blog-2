import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function PostsPage() {
	const posts = getAllPosts();

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">記事一覧</h1>
			<div className="grid gap-4 sm:grid-cols-2">
				{posts.map((p) => (
					<PostCard key={p.slug} post={p} />
				))}
			</div>
		</div>
	);
}
