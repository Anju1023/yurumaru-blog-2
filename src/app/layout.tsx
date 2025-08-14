// 画面の共通レイアウト。ヘッダー/フッター等をここに置く。
// 子ページは {children} に差し込まれるよ。
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'ゆるまる暮らしの学びログ',
	description: 'プログラミング初心者の備忘録と暮らしの便利アイテムレビュー',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body className="min-h-dvh bg-white text-neutral-900">
				<header className="border-b">
					<nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
						{/* 左上ロゴ＝ホームへ */}
						<Link href="/" className="text-lg font-bold">
							ゆるまる暮らしの学びログ
						</Link>
						{/* 右側のメニュー */}
						<div className="flex gap-4 text-sm">
							<Link href="/posts" className="hover:underline">
								記事一覧
							</Link>
							{/* あとで /about や /search など増やせる */}
						</div>
					</nav>
				</header>

				<main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

				<footer className="mt-16 border-t">
					<div className="mx-auto max-w-5xl px-4 py-6 text-xs text-neutral-500">
						© {new Date().getFullYear()} ゆるまる暮らしの学びログ
					</div>
				</footer>
			</body>
		</html>
	);
}
