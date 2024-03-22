export async function load({ cookies }) {
	const user = cookies.get('academix-user');
	const pass = cookies.get('academix-pass');

	return { user, pass };
}
