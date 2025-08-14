// サーバーコンポーネント（デフォルト）。データ取得に最適。
import { getLatestPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import ProductCard from '@/components/ui/ProductCard';

export default function HomePage() {
	const latest = getLatestPosts(3); // 先頭3件

	return (
		<div className="space-y-8">
			<section>
				<h1 className="text-2xl font-bold">ようこそ🫶</h1>
				<p className="text-neutral-600 mt-1">
					学習ログと暮らしのレビューをゆるっと書いていくサイトだよ。
				</p>
			</section>

			<section>
				<h2 className="text-xl font-semibold mb-3">新着記事</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{latest.map((p) => (
						<PostCard key={p.slug} post={p} />
					))}
				</div>
			</section>

			<h1 className="text-2xl font-bold mb-4">カードのベース確認</h1>

			{/* 横並び → 画面幅で自動レスポンシブに */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<ProductCard
					title="モバイルバッテリー 10000mAh"
					price={2980}
					imageUrl="https://picsum.photos/seed/a/600/600"
					shopName="楽天ショップ A"
					href="https://example.com/affiliate-url-a"
					badge="送料無料"
				>
					{/* childrenには自由に差し込める(なくてもOK) */}
					<span className="text-xs text-neutral-500">高速充電・軽量タイプ</span>
				</ProductCard>

				<ProductCard
					title="USB-C ケーブル 1.5m"
					price={780}
					shopName="楽天ショップ B"
					imageUrl="https://picsum.photos/seed/b/600/600"
					href="https://example.com/affiliate-url-b"
				/>

				<ProductCard
					title="画像なしの例(壊れないかテスト)"
					price={1200}
					shopName="楽天ショップ C"
					// imageUrlをあえて渡さない
				/>
			</div>
		</div>
	);
}
