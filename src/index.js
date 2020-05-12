// noinspection ES6CheckImport
import { afterRouteEnter, beforeRouteEnter, default as Router, getPath, route } from "./Router.svelte";
import ChunkGenerator from "./ChunkGenerator";

export { ChunkGenerator };
export { route, beforeRouteEnter, afterRouteEnter, getPath };

export default Router;
