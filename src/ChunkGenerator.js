// original source: https://github.com/hmmhmmhm/svelte-spa-chunk/blob/master/src/index.ts
import ChunkLoadable from "./Chunk.svelte";

const ChunkGenerator = (dynamicImport, chunk = ChunkLoadable) => {
  return { chunk: Chunk(dynamicImport, chunk) };
};

export const Chunk = (dynamicImport, Component) => {
  return function (options) {
    options.props = {
      ...options.props,
      component: dynamicImport,
    };

    return new Component(options);
  };
};

export default ChunkGenerator;
