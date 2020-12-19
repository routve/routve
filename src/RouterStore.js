import { writable } from "svelte/store";
import page from "page";

export const isPageLoading = writable(false);
export const isComponentLoading = writable(true);
export const isRouteLoading = writable(true);

export const path = writable(null);
export const basePageInstance = page.create();
