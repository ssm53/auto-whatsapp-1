import { writable } from 'svelte/store';

export const individual = writable(true);

export const bulk = writable(false);

export const userLoggedIn = writable(false);
