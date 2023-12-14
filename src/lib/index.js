export const getCookieSettings = (opts) => ({
	httpOnly: true,
	path: '/',
	sameSite: true,
	secure: true,
	maxAge: 60 * 60 * 24,
	...opts
});
