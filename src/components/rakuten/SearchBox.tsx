'use client';

import { useState } from 'react';
import ProductCard from '../ui/ProductCard';

type APIItem = {
	title: string;
	url: string;
	price: number;
	reviewCount: number;
	reviewAverage: number;
	shopName: string;
	image: string;
};

export default function SearchBox() {
	const [q, setQ] = useState('モバイルバッテリー');
	const [items, setItems] = useState<APIItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState('');

	async function onSearch(e?: React.FormEvent) {
		e?.preventDefault();
		if (!q.trim()) return;
		setLoading(true);
		setErr('');
		try {
			const res = await fetch(`/api/rakuten/search?q=${encodeURIComponent(q)}`);
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || 'API Error');
			setItems(data.items || []);
		} catch (e) {
			setErr('検索に失敗したみたい、、、、少し待って再実行してね；；');
			setItems([]);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-4">
			<form onSubmit={onSearch} className="flex gap-2">
				<input
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder="楽天で探す (例：iPhone 充電ケーブル)"
					className="w-full rounded-xl border px-3 py-2"
				/>
				<button
					type="submit"
					className="rounded-xl bg-black px-4 py-2 text-white"
				>
					検索
				</button>
			</form>

			{loading && <p>検索中...( Ꙭ)ᐝ</p>}
			{err && <p className="text-sm text-red-600">{err}</p>}

			{!loading && items.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((it) => (
						<ProductCard
							key={`${it.url}-${it.title}`}
							title={it.title}
							price={it.price}
							imageUrl={it.image}
							shopName={it.shopName}
							href={it.url} // アフィURL(affiliateId入り)
							rating={it.reviewAverage} // さっきの★にマップ
							reviewCount={it.reviewCount}
						/>
					))}
				</div>
			)}
		</div>
	);
}
