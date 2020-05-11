<script>
  import Router, {route} from "../../src/index"
</script>

<h3>Navigator</h3>

<a href="/">Home Page</a> <br>
<a href="/test-page">Test Page</a> <br>
<a href="/test-page-async">Test Page Dynamic Load</a> <br>
<a href="/nested-route-page">Test Nested Route Page</a> <br>
<a href="/nested-route-page/example">Example Nested Route Page</a> <br>
<a href="/nested-route-params-page">Example Nested Route With Params Default Page</a> <br>
<a href="/nested-route-params-page/example/10">Example Nested Route With Params Page</a> <br>
<a href="/nested-route-params-page/53">Example Nested Route With Page Params Test</a> <br>
<a href="javascript:void(0);" on:click="{() => route('/programmatically-routed')}">The Page Programmatically Routed</a> <br>
<a href="/error404">Test Error Page</a>