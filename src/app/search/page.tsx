import SearchBox from '@/components/rakuten/SearchBox';

export default function SearchPage() {
	return (
		<div className="space-y-6">
			<header>
				<h1 className="text-2xl font-bold">楽天で商品を探す</h1>
				<p className="text-neutral-600 text-sm">
					キーワードを入れて検索してね🍼
				</p>
			</header>
			<SearchBox />
		</div>
	);
}
