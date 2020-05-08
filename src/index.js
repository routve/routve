// original source: https://github.com/hmmhmmhm/svelte-spa-chunk/blob/master/src/index.ts
export const ChunkGenerator = (Component) => {
  return (dynamicImport) => Chunk(dynamicImport, Component);
};

const Chunk = (dynamicImport, Component) => {
  return class SvelteComponentHook {
    constructor(options) {
      options.props = Object.assign(Object.assign({}, options.props), { dynamicImport });
      return new Component(options);
    }
  };
};
