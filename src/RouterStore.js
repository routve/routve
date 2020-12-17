import { writable } from "svelte/store";
import page from "page";

export const isPageLoading = writable(true);
export const isComponentLoading = writable(true);
export const isRouteLoading = writable(true);

export const path = writable("");
export const basePageInstance = page.create();
