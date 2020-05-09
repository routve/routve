import {writable} from "svelte/store";
import page from "page";

export const isPageLoading = writable(true);

export const path = writable("");
export const subRouterRoutesByBasePath = writable([]);
export const basePageInstance = page.create();
