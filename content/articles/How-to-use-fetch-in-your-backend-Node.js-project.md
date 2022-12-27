---
title: How to use `fetch()` in your backend Node.js project
description: Here's a quick one on using the Fetch API in Node.js with the `node-fetch` package.
tags: [Fetch, Node, JavaScript]
createdAt: 10-10-2022
updatedAt: 10-10-2022
---

`fetch()` is a global method provided by the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to send HTTP requests and fetch resources asynchronously.

You can use `fetch()` in your client-side JavaScript which runs on the browser as it's implemented in the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) and [WorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope) interfaces.

That's great and all, but in order to use the Fetch API in Node.js we need to install the node-fetch package. You can check it out [here on npm](<https://www.npmjs.com/package/node-fetch>).

## Installing the package

To install the package in your project, run

```bash
npm install node-fetch
```

This will install the latest stable version of `node-fetch`, which at the time of writing this is v3.x.x.

## Using and configuring node-fetch

This version ( v3.x.x ) is an ESM-only module and to use it, you'll have to import it.

```javascript
import fetch from 'node-fetch';
```

You may run into issues importing and using `node-fetch` using this method. This is probably because you need to use v2 of `node-fetch` which is built with CommonJS.

To do that, uninstall the current version

```bash
npm uninstall node-fetch

#install v2 of node-fetch
npm install node-fetch@2
```

Great!

Now, you can add it to your project with the classic `require` statement.

```javascript
const fetch = require('node-fetch')
```

Alternatively, according to the [docs](https://www.npmjs.com/package/node-fetch?activeTab=readme), you can load `node-fetch` into your app  asynchronously without downgrading it by using the `import()` function from CommonJS.

```javascript
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
```

## Using the package

Once you've successfully added the package to your project, you can start using it the same way you've been using fetch in your frontend projects.

Here's an example of a simple GET request

```javascript
import fetch from 'node-fetch';
// if you're using v2
// const fetch = require('node-fetch')

const response = await fetch('https://api.github.com/users/github');
const data = await response.json();

console.log(data);
```

## Further reading and resources

- Node Fetch docs: [node-fetch - npm (npmjs.com)](https://www.npmjs.com/package/node-fetch)
  - v3 - <https://github.com/node-fetch/node-fetch>
  - v2 - <https://github.com/node-fetch/node-fetch/tree/2.x#readme>
- [Using Fetch - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
