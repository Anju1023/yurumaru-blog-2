import { NextResponse } from 'next/server';

// 楽天市場アイテム検索API(20220601版)
const ENDPOINT =
	'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

// GET /api/rakuten/search?q=キーワード
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const q = (searchParams.get('q') || '').trim();

	if (!q) {
		return NextResponse.json({ items: [] });
	}

	// .env.localから安全に読む(サーバー側のみ)
	const applicationId = process.env.RAKUTEN_APPLICATION_ID!;
	const affiliateId = process.env.RAKUTEN_AFFILIATE_ID!;

	// formatVersion=2 でフラット配列。必要な要素だけ返すよう絞る
	const params = new URLSearchParams({
		applicationId,
		affiliateId,
		format: 'json',
		formatVersion: '2',
		keyword: q,
		hits: '12',
		imageFlag: '1',
		// 並び替えしたいときは↓みたいに追加(人気順の場合)
		// sort: "-reviewCount",
		elements: [
			'itemName',
			'itemUrl',
			'affiliateUrl',
			'itemPrice',
			'reviewCount',
			'reviewAverage',
			'shopName',
			'mediumImageUrls',
		].join(','),
	});

	const url = `${ENDPOINT}?${params.toString()}`;
	const r = await fetch(url, { next: { revalidate: 60 } }); // 60秒ごとに再検証
	if (!r.ok) {
		return NextResponse.json(
			{ items: [], error: 'rakuten_api_error' },
			{ status: 500 }
		);
	}

	const data = await r.json();

	// 画面で扱いやすい形に整形(affiliateUrlが来たら優先)
	const items = Array.isArray(data.items)
		? data.items.map((it: any) => ({
				title: it.itemName as string,
				url: (it.affiliateUrl || it.itemUrl) as string,
				price: Number(it.itemPrice) || 0,
				reviewCount: Number(it.reviewCount) || 0,
				rating: Number(it.reviewAverage) || 0,
				shopName: it.shopName || '',
				image:
					it.mediunImageUrls?.[0]?.imageUrl?.replace('?_ex=128x128', '') || '',
		  }))
		: [];

	return NextResponse.json({ items });
}
