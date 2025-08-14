'use client';

import { noSSR } from 'next/dynamic';

// 5つ星のレーティングを表示する軽量コンポーネント
// - rating: 0.0~5.0(小数OK)
// - count: レビュー件数(任意)
// - size: 星のサイズ(px)
// - showCount: 件数を右側に表示するか(デフォルトtrue)

// 実装メモ:
// 星アイコンを「下地(グレー)」と「塗り(ピンク)」の２枚重ねにして、
// 塗り側だけwidthを割合で切り取って"部分塗り"を実現

import React from 'react';

export function StarRating({
	rating,
	count,
	size = 16,
	showCount = true,
}: {
	rating: number;
	count?: number;
	size?: number;
	showCount?: boolean;
}) {
	// 0~5の範囲にクリップ
	const r = Math.max(0, Math.min(5, rating ?? 0));

	// 星を5個分つくる
	const stars = Array.from({ length: 5 }, (_, i) => {
		// i番目の星がどれくらい塗られるか(0~1)
		// 例: rating=3.6 → [1,1,1,0.6,0]
		const fillRatio = Math.max(0, Math.min(1, r - i));
		return (
			<span
				key={i}
				className="relative inline-block"
				style={{ width: size, height: size }}
			>
				{/* 下地(グレー) */}
				<StarIcon size={size} className="text-neutral-300" />
				{/* 塗り(ピンク) ... width を割合で切る */}
				<span
					className="absolute left-0 top-0 overflow-hidden"
					style={{ width: `${fillRatio * 100}%`, height: size }}
				>
					<StarIcon size={size} className="text-pink-500" />
				</span>
			</span>
		);
	});

	return (
		<span className="inline-flex items-center gap-1 align-middle">
			<span className="inline-flex">{stars}</span>
			<span className="text-xs text-neutral-600">
				{r.toFixed(1)}
				{showCount && typeof count === 'number' ? `(${count})` : null}
			</span>
		</span>
	);
}

// シンプルな星のSVG(currentColorで色を変えられる)
function StarIcon({ size, className }: { size: number; className?: string }) {
	return (
		<svg
			viewBox="0 0 20 20"
			width={size}
			height={size}
			className={className}
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M10 1.5l2.53 5.12 5.65.82-4.09 3.99.97 5.64L10 14.9l-5.06 2.67.97-5.64L1.82 7.44l5.65-.82L10 1.5z"
			/>
		</svg>
	);
}
