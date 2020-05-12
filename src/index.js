// noinspection ES6CheckImport
import { afterRouteEnter, beforeRouteEnter, default as Router, route } from "./Router.svelte";
import ChunkGenerator from "./ChunkGenerator";

export { ChunkGenerator };
export { route, beforeRouteEnter, afterRouteEnter };

export default Router;
