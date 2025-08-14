// まずはDBやMDXを使わず「配列」で練習。
// 後でMDXファイルやSupabaseに「差し替え」できるように型を決めておく。

export type Post = {
	slug: string; // URLの一部 /posts/[slug]
	title: string; // 記事タイトル
	date: string; // 公開日 (YYYY-MM-DD)
	tags: string[]; // タグ
	excerpt: string; // 一覧に出す短い説明
	content: string; // 仮の本文（実運用はMDXやDBにする）
};

const posts: Post[] = [
	{
		slug: 'hello-next',
		title: 'Next.jsを触ってみたメモ',
		date: '2025-08-10',
		tags: ['Next.js', '学習ログ'],
		excerpt: 'create-next-appで箱を作って、ルーティングを確認したよ。',
		content: `はじめてのNext.js！App Routerはファイル=URLでわかりやすい。`,
	},
	{
		slug: 'tailwind-first-look',
		title: 'Tailwind CSSでデザインをサッと整える',
		date: '2025-08-11',
		tags: ['Tailwind', 'CSS'],
		excerpt: 'class名を積み木みたいに積んでいく感じ。すぐ形になるのが良き。',
		content: `ボタンやレイアウトの雛形が一瞬でできて気持ちいい。`,
	},
	{
		slug: 'rakuten-affi-plan',
		title: '楽天アフィ導線の設計メモ（下準備）',
		date: '2025-08-12',
		tags: ['楽天', 'アフィリエイト', '設計'],
		excerpt:
			'まずは商品検索を別ページに。あとで記事本文にカードを差し込む予定。',
		content: `安全のためサーバールートを経由してAPIを呼ぶ設計にする。`,
	},
];

// 一覧取得（新しい日付が先）
export function getAllPosts(): Post[] {
	return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 先頭からn件（トップ用）
export function getLatestPosts(n: number): Post[] {
	return getAllPosts().slice(0, n);
}

// slugで1件取得（見つからなければundefined）
export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}
