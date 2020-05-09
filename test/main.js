import App from "./App.svelte";
import router from "./router";

const app = new App({
  target: document.body,
  props: {
    router
  }
});

export default app;
