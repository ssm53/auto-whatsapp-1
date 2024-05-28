<script>
	// point to note - shaun to do logout function

	import { userLoggedIn } from '../stores/store';
	import { userLogOut, getUserTokenFromLocalStorage } from './auth';
	import { goto } from '$app/navigation';
	// import { io } from '../socket/webSocketConnection.js';
	// import { onMount } from 'svelte';
	// import { appointmentsWaiting } from '../stores/store';

	// onMount(() => {
	// 	io.on('connect_error', (error) => {
	// 		console.error('Connection error:', error);
	// 	});

	// 	io.on('connected', (name) => {
	// 		console.log(`socket connected ${name}`);
	// 	});

	// 	io.on('new_patient_appointment', ({ appointment }) => {
	// 		appointmentsWaiting.update((appointments) => [...appointments, appointment]);
	// 	});
	// });

	let logIO;
	userLoggedIn.subscribe((value) => {
		logIO = value;
	});

	async function clickLogin() {
		goto('/sign-in');
	}

	function clickHome() {
		goto('/');
	}
</script>

<main>
	<div class="bg-black text-white">
		<div class="container mx-auto flex justify-between items-center p-4">
			<button
				class="bg-black text-white p-3 rounded-full hover:bg-gray-900 focus:outline-none"
				on:click={clickHome}
			>
				<img
					src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
					alt="Home"
					class="w-8 h-7"
				/>
			</button>
			<div class="flex space-x-4">
				{#if logIO === true}
					<button class="text-white hover:text-indigo-600 focus:outline-none" on:click={userLogOut}>
						Log Out
					</button>
				{:else}
					<button class="text-white hover:text-indigo-600 focus:outline-none" on:click={clickLogin}>
						Log In
					</button>
				{/if}
			</div>
		</div>
	</div>
</main>
