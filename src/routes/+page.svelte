<script>
	import { individual, bulk } from '../stores/store.js';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	// import { getUserTokenFromLocalStorage } from '../../utils/auth';
	// import { writable } from 'svelte/store';
	// import { DateTime } from 'luxon';
	// import { appointmentsWaiting } from '../../stores/store';

	let formErrors = {};
	function clickIndividual() {
		bulk.set(false);
		individual.set(true);
	}

	function clickBulk() {
		individual.set(false);
		bulk.set(true);
	}

	export async function individualWhatsappDetails(evt) {
		const newInidividualWhatsappData = {
			name: evt.target['name'].value,
			number: evt.target['number'].value,
			message: evt.target['message'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/new-individual-sms', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
				// Authorization: getUserTokenFromLocalStorage()
			},
			body: JSON.stringify(newInidividualWhatsappData)
		});

		const res = await resp.json();
		console.log(res);

		if (resp.status == 200) {
			// do spinners and alerts
			postInidividualWhatsapp();
			formErrors = {};
		} else {
			if (res.error) {
				formErrors = res.error;
				console.log(formErrors);
			}
		}
	}

	export async function bulkWhatsappDetails() {
		const fileInput = document.getElementById('file-upload');
		const file = fileInput.files[0];
		const message = evt.target['message'].value;

		if (file) {
			const formData = new FormData();
			formData.append('file-upload', file);
			formData.append('message', message);
			evt.target.value = null;
			try {
				const newBulkWhatsapp = await fetch(PUBLIC_BACKEND_BASE_URL + '/new-bulk-whatsapp', {
					method: 'POST',
					body: formData
				});
			} catch (error) {
				console.error(error);
			}
		}
	}

	export function postInidividualWhatsapp() {
		goto('/');
	}
</script>

<div
	class=" top-container flex flex-col justify-center items-center border-b-2 border-black bg-white h-44"
>
	<div>
		<span class="font-bold text-3xl text-pink-700">Auto-Whatsapp</span>
	</div>
	<div class="flex flex-row justify-between mt-5">
		<button
			on:click={clickIndividual}
			class="border-r-2 border-r-black border-b-2 border-b-white text-xl px-4 hover:border-b-2 hover:border-indigo-600"
			>Individual</button
		>
		<button
			on:click={clickBulk}
			class="border-r-2 border-r-black border-b-2 border-b-white text-xl px-4 hover:border-b-2 hover:border-indigo-600"
			>Bulk</button
		>
	</div>
</div>

<div>
	{#if $individual}
		<div class="flex justify-center items-center new-patient">
			<form
				on:submit|preventDefault={individualWhatsappDetails}
				class="w-1/2 bg-white shadow-md rounded-lg p-8"
			>
				<div class="mb-6">
					<label for="name" class="block text-gray-700 text-sm font-bold mb-2"> Name * </label>
					<input
						type="text"
						name="name"
						placeholder="Enter name"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					<!-- {#if 'name' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors.name}</p>
					{/if} -->
				</div>

				<div class="mb-6">
					<label for="number" class="block text-gray-700 text-sm font-bold mb-2"> Number * </label>
					<input
						type="text"
						name="number"
						placeholder="Enter mobile number"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					<!-- {#if 'number' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors.number}</p>
					{/if} -->
				</div>

				<div class="mb-6">
					<label for="message" class="block text-gray-700 text-sm font-bold mb-2">
						Message *
					</label>
					<input
						type="text"
						name="message"
						placeholder="Enter whatsapp message. By default, there already is 'Hi,', so you start after this"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					<!-- {#if 'message' in formErrors}
						<p class="text-red-500 text-xs mt-1">{formErrors.message}</p>
					{/if} -->
				</div>
				<div class="flex justify-end">
					<button
						class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Send Individual Whatsapp
					</button>
				</div>
			</form>
		</div>
	{:else}
		<div class="flex justify-center items-center new-patient">
			<form
				on:submit|preventDefault={bulkWhatsappDetails}
				class="w-1/2 bg-white shadow-md rounded-lg p-8"
			>
				<div class="mb-6">
					<label for="file-upload" class="block text-gray-700 text-sm font-bold mb-2">
						Upload a file *:
					</label>
					<input
						type="file"
						id="file-upload"
						name="file-upload"
						accept="*"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
				</div>

				<div class="mb-6">
					<label for="message" class="block text-gray-700 text-sm font-bold mb-2">
						Message *
					</label>
					<input
						type="text"
						name="message"
						placeholder="Enter message"
						class="block w-full rounded-md py-2 px-3 border border-gray-300"
						required
					/>
					<!-- {#if 'number' in formErrors}
      <p class="text-red-500 text-xs mt-1">{formErrors.number}</p>
    {/if} -->
				</div>

				<div class="flex justify-end">
					<button
						class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
						type="submit"
					>
						Send Bulk Whatsapp
					</button>
				</div>
			</form>
		</div>
		<!-- <div class="addDocsForm">
    <form on:submit|preventDefault={addDocuments}>
      <label for="file-upload">Select a file:</label>
      <input type="file" id="file-upload" name="file-upload" accept="*" required />
      <button
        class="bg-green-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        type="submit">Upload</button
      >
    </form>
  </div> -->
	{/if}
</div>
