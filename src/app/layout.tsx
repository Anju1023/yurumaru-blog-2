// 画面の共通レイアウト。ヘッダー/フッター等をここに置く。
// 子ページは {children} に差し込まれるよ。
import Header from '@/components/layouts/header/Header';
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layouts/footer/Footer';

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
				<Header />
				<main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
