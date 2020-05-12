<script>
  import Router from "../src/index";
  import RouterConfig from "./router.config";

  import Navigator from "./components/Navigator.svelte";

  //TODO @Berk
  // beforeRouteEnter((context, next) => {
  //   console.log("BeforeRouteEnter" + context.pathname)
  //
  //   next();
  // })
  //
  // afterRouteEnter((context, next) => {
  //   console.log("afterRouteEnter" + context.pathname)
  //
  //   next();
  // })
</script>

<h1>Welcome to Routve!</h1>

<br />

<Navigator />

<br />
<br />

<Router routerConfig="{RouterConfig}" />
