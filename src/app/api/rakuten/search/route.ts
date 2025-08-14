import { NextResponse } from 'next/server';

const ENDPOINT =
	'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const q = (searchParams.get('q') || '').trim();
	const sort = searchParams.get('sort') || '';

	if (!q) return NextResponse.json({ items: [] });

	const applicationId = process.env.RAKUTEN_APPLICATION_ID!;
	const affiliateId = process.env.RAKUTEN_AFFILIATE_ID || '';

	const params = new URLSearchParams({
		applicationId,
		format: 'json',
		// formatVersion はあってもなくてもOKにする（後段で両対応）
		// formatVersion: "2",
		keyword: q,
		hits: '30',
		// imageFlag: "1", // ← ヒット増やしたい間は外しておくと安全
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

	if (sort) params.set('sort', sort);

	if (affiliateId.trim()) params.set('affiliateId', affiliateId.trim());

	const url = `${ENDPOINT}?${params.toString()}`;
	const r = await fetch(url, { next: { revalidate: 0 } });

	if (!r.ok) {
		const raw = await r.text();
		return NextResponse.json(
			{
				items: [],
				error: 'rakuten_api_error',
				status: r.status,
				debug: raw.slice(0, 1000),
				url,
			},
			{ status: 500 }
		);
	}

	const data = await r.json();

	// ── ここがポイント：v2(v2: data.items[]) でも v1(v1: data.Items[{Item?}]) でも拾う ──
	let source: any[] | null = null;

	if (Array.isArray(data.items)) {
		// v2フラット
		source = data.items;
	} else if (Array.isArray(data.Items)) {
		// v1系：{ Item: {...} } の配列 or 直接 {...} の配列 どちらにも対応
		source = data.Items.map((row: any) => (row?.Item ? row.Item : row)).filter(
			Boolean
		);
	}

	const items = Array.isArray(source)
		? source.map((it: any) => ({
				title: it.itemName ?? '',
				url: (it.affiliateUrl || it.itemUrl || '') as string,
				price: Number(it.itemPrice ?? 0) || 0,
				reviewCount: Number(it.reviewCount ?? 0) || 0,
				reviewAverage: Number(it.reviewAverage ?? 0) || 0,
				shopName: it.shopName ?? '',
				image: (() => {
					// v1は mediumImageUrls が「文字列の配列」のこともある
					const arr = it.mediumImageUrls || [];
					const first = (arr[0]?.imageUrl ?? arr[0] ?? '')
						.toString()
						.replace('?_ex=128x128', '');
					return first;
				})(),
		  }))
		: [];

	return NextResponse.json({ items, count: items.length });
}
