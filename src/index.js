// original source: https://github.com/hmmhmmhm/svelte-spa-chunk/blob/master/src/index.ts
import ChunkLoadable from './Chunk.svelte';

export const ChunkGenerator = (dynamicImport) => {
  return Chunk(dynamicImport, ChunkLoadable);
};

export const Chunk = (dynamicImport, Component) => {
  return class SvelteComponentHook {
    constructor(options) {
      options.props = {
        ...options.props,
        dynamicImport
      };
      return new Component(options);
    }
  };
};

export { default as Router } from "./Router.svelte";
