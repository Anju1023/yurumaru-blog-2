// 動的セグメント [slug] に応じて1記事を表示する。
// 見つからなければ 404 を出す（Next.js標準の notFound を使用）。
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

// 事前に静的生成させたいパス一覧（ビルド時）
// 後でMDXやDBに変えても、この仕組みはそのまま活かせる。
export async function generateStaticParams() {
	const paths = getAllPosts().map((p) => ({ slug: p.slug }));
	return paths;
}

export default function PostPage({ params }: Props) {
	const post = getPostBySlug(params.slug);
	if (!post) return notFound();

	return (
		<article className="prose prose-pink max-w-none">
			<p className="text-sm text-neutral-500">
				{post.date} ・ {post.tags.join(', ')}
			</p>
			<h1 className="!mt-1">{post.title}</h1>
			{/* 今は content をそのまま表示（後でMDXに置換予定） */}
			<p>{post.content}</p>
		</article>
	);
}
