import React from 'react';

const Footer = () => {
	return (
		<footer className="mt-16 border-t">
			<div className="mx-auto max-w-5xl px-4 py-6 text-xs text-neutral-500">
				&copy; {new Date().getFullYear()} ゆるまる暮らしの学びログ
			</div>
		</footer>
	);
};

export default Footer;
