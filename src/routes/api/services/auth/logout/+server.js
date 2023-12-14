import { getCookieSettings } from '$lib';
import { json } from '@sveltejs/kit';

export async function DELETE({ cookies }) {
	cookies.set('academix-user', 'null', getCookieSettings({ maxAge: 0 }));
	cookies.set('academix-pass', 'null', getCookieSettings({ maxAge: 0 }));

	return json(null, { status: 200 });
}
