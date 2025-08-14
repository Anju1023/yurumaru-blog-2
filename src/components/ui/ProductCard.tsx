'use client';
// この部品は「ボタンを押す」などブラウザ側の動きがある前提なので付ける

import React from 'react';

// カードに渡すデータの型(最低限)
// まずは楽天に限らず「商品」を表す共通型にしておくと後で差し替えが楽
export type ProductCardProps = {
	title: string; // 商品名
	price?: number; // 価格
	imageUrl?: string; // 画像URL
	shopName?: string; // ショッピングサイト名
	href?: string; // 商品ページのURL
	badge?: string; // バッジ(例: 送料無料/クーポン etc.)
	children?: React.ReactNode; // 後で★評価や説明文を入れたいときに使える
};

export default function ProductCard({
	title,
	price,
	imageUrl,
	shopName,
	href,
	badge,
	children,
}: ProductCardProps) {
	const Wrapper: any = href ? 'a' : 'div';

	return (
		<Wrapper
			href={href}
			target={href ? '_blank' : undefined}
			rel={href ? 'sponsored nofollow noopener' : undefined}
			className="
        block rounded-2xl border bg-white p-4
        shadow-sm hover:shadow-md transition
        focus:outline-none focus:ring-2 focus:ring-pink-300
      "
			// 角丸/枠線/影、hoverでちょい影、フォーカス枠(アクセシブル)
			aria-label={href ? `${title}を開く` : undefined}
		>
			<div className="relative mb-3 overflow-hidden rounded-xl bg-neutral-100 aspect-square">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={title}
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
						画像なし
					</div>
				)}
				{badge && (
					<span
						className="
            absolute ring-2 top-2 rounded-full 
            bg-pink-600/90 px-2 py-0.5 text-[11px] 
            font-medium text-white shadow-sm
          "
					>
						{badge}
					</span>
				)}
			</div>

			{/* タイトル(2行で省略) */}
			<h3 className="line-clamp-2 text-sm font-semibold">{title}</h3>

			{/* 価格・ショップ名 */}
			<div className="mt-1 text-sm">
				{typeof price === 'number' && (
					<p className="font-bold">￥{price.toLocaleString()}</p>
				)}
				{shopName && (
					<p className="text-xs text-neutral-500 mt-0.5">{shopName}</p>
				)}
			</div>

			{/* 任意の追加コンテンツ */}
			{children && (
				<div className="mt-2 text-sm text-neutral-700">{children}</div>
			)}

			{/* ボタン風リンク(hrefがある時だけ見せる) */}
			{href && (
				<span
					className="
          mt-3 inline-block select-none 
          rounded-full bg-pink-600 px-3 py-1.5 
          text-xs font-medium text-white 
          hover:bg-pink-700
        "
				>
					楽天で見る
				</span>
			)}
		</Wrapper>
	);
}
