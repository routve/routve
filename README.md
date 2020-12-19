<p align="center"><img width="200" src="https://i.ibb.co/gRSQL1G/routve.png" alt="Routve logo"></p>
<p align="center">
  An advanced <a href="https://svelte.dev">Svelte 3</a> router.
</p>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2020?style=for-the-badge" alt="Maintained">
  <a href="https://travis-ci.com/github/routve/routve" target="_blank"><img src="https://img.shields.io/travis/com/routve/routve/dev?style=for-the-badge" alt="Travis CI Build Status"></a>
  <a href="https://www.npmjs.com/package/routve"><img src="https://img.shields.io/npm/v/routve.svg?sanitize=true&style=for-the-badge" alt="Version"></a>
  <a href="https://github.com/routve/routve/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/routve.svg?sanitize=true&style=for-the-badge" alt="License"></a>
  <a href="https://discord.gg/rwCNpZw74S"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true&style=for-the-badge" alt="Chat"></a>
</p>

---

# About

#### Introduction:

Routve is an advanced non-official <a href="https://svelte.dev">Svelte 3</a> router like `vue-router`. Under the hood it uses <a href="https://github.com/visionmedia/page.js">page.js</a>.

#### Why Routve?

Alright there are so many router libraries and components for Svelte. So why would you use Routve?

Simply, Routve is super simple - easy to use, always up-to-date, maintained, stable and advanced. It has already used in production, and some development projects. Routve supports advanced and complex features such as route managing, navigation guards, page load handling, automatic links, hashbang, nested routing, and most importantly code splitting (aka. dynamic component import).

When we first created Routve, there was no properly enough advanced router library which especially supports code splitting and nested routing. We believed we can create <strong>only one truly advanced enough router library</strong> for Svelte. Now, we are introducing you: <strong>Routve</strong> with further features.

#### Features:

Routve supports these features for now:

- <strong>Very tiny</strong> ~ only few light dependencies
- <strong>Path routing</strong> (aka. URI) ~ like `/login` `/register`, without hash - ideal for SPA and SSR - `default`
- <strong>Hashbang</strong> ~ like `index.html#!/login` `index.html#!/register`, ideal for static SPA
- <strong>Nested routing</strong> ~ add children routes/pages and just add router like `<Router>`
- <strong>Base path</strong> ~ you can define base path like; `/panel` then routing is gonna be like `/panel/login`
- <strong>Customizable config per router</strong> ~ customize your each router component
- <strong>Automatic links on `<a href="">` attribute</strong> ~ thanks to `page.js` (no more need for extra component import, for example: `<Link>`)
- <strong>Regex support</strong> ~ thanks to `page.js`
- <strong>Router events</strong> ~ such as `beforeEnterRoute`, `afterRouteEnter` - useful for navigation guards
- <strong>isPageLoading event</strong> ~ a boolean reactive variable - which allows you to determine is the page still loading?
- <strong>Custom chunk support</strong> ~ Routve uses chunk component for each route to ensure stable, safe and providing additional advanced features - you can either give by each route or generally to all routes
- <strong>Import component as you want</strong> ~ Routve supports many component import styles! - such as `() => import("/TestPage.svelte")` (aka. dynamic importing, lazy loading), `import("/TestPage.svelte")` static promise importing or `component: TestPageComponent` static/preloaded component passing
- <strong>Named params</strong> ~ give your route which param would you like to, such as `pageType: "trash"`
- <strong>Route params</strong> ~ get param by the path, for example; `/post/:postID` - `postID` is now our route param, Routve will add this param to page component (`export let postID;`)
- <strong>Wildcards</strong> ~ thanks to `page.js`
- <strong>Query strings</strong> ~ query strings like; `/some-route?example=123` - thanks to `page.js`
- <strong>HTML5 history mode</strong> ~ which is typically `path routing`, ideal for SPA and SSR - thanks to `page.js`
- <strong>Error 404 handling</strong> ~ Routve can handle all 404 error page requests if there is no matching route and if `*` is given as path
- <strong>Programmatic navigation</strong> ~ just import `route` method and call it `route("/login")`

#### There are also upcoming features:

- <strong>`Route names`</strong>
- <strong>`SSR support`</strong>
- <strong>`Sapper support`</strong>

# Install

```bash
npm install routve
```

# Development

Always use <a href="https://yarnpkg.com/">yarn</a> to avoid conflicting .lock file issues.

Firstly, install all packages with `yarn`:

```bash
yarn
```

Secondly, run which example would you like to run: (`yarn dev:<example>` see `yarn run` or [`package.json`](package.json) #scripts)

```bash
yarn dev
```

# Contributing

Merge requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
