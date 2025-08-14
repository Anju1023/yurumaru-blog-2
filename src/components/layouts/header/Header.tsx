import Link from 'next/link';
import React from 'react';

const Header = () => {
	return (
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
	);
};

export default Header;
