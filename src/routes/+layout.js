export const ssr = false; // this essentially turns our entire project into true SPA mode. No JS code will execute server side.
import { userIsLoggedIn } from '../utils/auth';

let hasCheckedUserLoggedIn = false; // Add this flag

export async function load() {
	if (!hasCheckedUserLoggedIn) {
		// Check if isLoggedIn has been called before
		await userIsLoggedIn();
		hasCheckedUserLoggedIn = true; // Set the flag to true to prevent further calls
	}
}
