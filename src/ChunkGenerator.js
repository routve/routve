// original source: https://github.com/hmmhmmhm/svelte-spa-chunk/blob/master/src/index.ts
import ChunkLoadable from "./Chunk.svelte";

const isClass = (func) => {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}

const ChunkGenerator = (dynamicImport, chunk = ChunkLoadable) => {
  return Chunk(dynamicImport, chunk);
};

export const Chunk = (dynamicImport, Component) => {
  return function(options) {
    options.props = {
      ...options.props,
      dynamicImport
    };

    if (isClass(dynamicImport)) {
      options.props = {};
      return new dynamicImport(options);
    } else {
      return new Component(options);
    }
  };
};

export default ChunkGenerator;
