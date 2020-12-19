// noinspection ES6CheckImport
import {
  default as Router,
  beforeRouteEnter,
  afterRouteEnter,
  getPath,
  getRouteName,
  pathReadable as path,
  routeNameReadable as routeName,
  isPageLoadingReadable as isPageLoading,
  route,
} from "./Router.svelte";
import ChunkGenerator from "./ChunkGenerator";

export {
  ChunkGenerator,
  beforeRouteEnter,
  afterRouteEnter,
  getPath,
  getRouteName,
  path,
  routeName,
  isPageLoading,
  route,
};

export default Router;
