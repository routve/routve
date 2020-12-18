<p align="center"><img width="200" src="https://i.ibb.co/gRSQL1G/routve.png" alt="Routve logo"></p>
<p align="center">
  An advanced <a href="https://svelte.dev">Svelte 3</a> router.
</p>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2020?style=for-the-badge" alt="Maintained">
  <a href="https://travis-ci.com/github/routve/routve" target="_blank"><img src="https://img.shields.io/travis/com/routve/routve/dev?style=for-the-badge" alt="Travis CI Build Status"></a>
  <a href="https://www.npmjs.com/package/routve"><img src="https://img.shields.io/npm/v/routve.svg?sanitize=true&style=for-the-badge" alt="Version"></a>
  <a href="https://github.com/routve/routve/blob/dev/LICENSE"><img src="https://img.shields.io/npm/l/routve.svg?sanitize=true&style=for-the-badge" alt="License"></a>
  <a href="https://discord.gg/XdVvr2"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true&style=for-the-badge" alt="Chat"></a>
</p>

---

# About

#### Introduction:

Routve is an advanced non-official <a href="https://svelte.dev">Svelte 3</a> router like `vue-router`. Under the hood it uses <a href="https://github.com/visionmedia/page.js">page.js</a>.

#### Why Routve?

Alright there are so many router libraries and components for Svelte. So why would you use Routve? Simply, Routve is always updated, maintained, stable and advanced. It has already used in production, and some development projects. Routve supports advanced and complex features such as route managing, navigation guards, page load handling, automatic links, hashbang, nested routing, and most importantly code splitting (aka. dynamic component import).

When we first created Routve, there was no properly enough advanced router library which especially supports code splitting and nested routing. We believed we can create <strong>only one truly advanced enough router library</strong>. Now, we are introducing you: <strong>Routve</strong> with further features.

#### Features:

Routve supports these features for now:

- Nested route/view mapping
- Customizable router config per router
- Route params, wildcards - thanks to `page.js`
- HTML5 history mode - thanks to `page.js`
- Navigation guards (by router events)
- Chunks and dynamic component import
- Automatic links on `<a href="">` attribute - thanks to `page.js`
- Query Strings (/some-route?example=123, /some-route?example, etc...) - thanks to `page.js`

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
