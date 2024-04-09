export async function load({ cookies }) {
	const token = cookies.get('jwt');

	return { token };
}
