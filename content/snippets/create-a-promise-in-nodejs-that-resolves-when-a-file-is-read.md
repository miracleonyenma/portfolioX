---
title: Create a promise in NodeJS that resolves when a file is read
description: Here's a short snippet by ChatGPT on "Create Promise for Reading File"
tags: [chatgpt, nodejs, javascript]
createdAt: 12-27-2022
updatedAt: 12-27-2022
author: {
  name: "Miracle Onyenma, ChatGPT",
  avatar: "/assets/img/chatgpt.jpg"
}
---

In this snippet post, I'll quickly show you a conversation I had with ChatGPT on how to _"Create a promise in NodeJS that resolves when a file is read"_.

Me: "create a promise that resolves when the file is read"

ChatGPT: Here is an example of a promise that resolves when a file is read:

```javascript
const fs = require('fs');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
```

This function uses the `fs.readFile` method, which is a built-in Node.js module for reading files. It takes a file path and a callback function as arguments. The callback function is called with an error object and the contents of the file as arguments. If there is an error reading the file, the `readFile` function will reject the promise with the error. Otherwise, it will resolve the promise with the contents of the file.

You can use this function like this:

```javascript
readFile('path/to/file.txt')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```

This will print the contents of the file to the console if the file is successfully read, or log an error if there is a problem reading the file.

Alright. That's it. I hope you found this useful! Happy coding!

Thanks for reading ❤
