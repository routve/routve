// noinspection ES6CheckImport
import {
  afterRouteEnter,
  beforeRouteEnter,
  default as Router,
  getPath,
  isPageLoadingReadable as isPageLoading,
  pathReadable as path,
  route,
} from "./Router.svelte";
import ChunkGenerator from "./ChunkGenerator";

export { ChunkGenerator };
export {
  route,
  beforeRouteEnter,
  afterRouteEnter,
  getPath,
  path,
  isPageLoading,
};

export default Router;
