---
title: Quick note on Array map
description: Here's a quick, basic explanation and use of the array.prototype.map() function
tags: [Array methods, Javascript, Notes, web]
createdAt: 7-19-2021
updatedAt: 7-20-2022
---

The `Array.prototype.map()` runs a function for each element in an array and returns the value of the function into a new array.

It's just like a loop that creates a new array based on the function passed to it.

Let's say we have an array of _weebs_ which is basically an array of objects. Each having the following property names:  `name`, `honorific`, `likes` and `dislikes`.

```javascript
let weebs = [
    {
        name: "Uchechukwu",
        honorific : "Kun",
        likes: "Woman",
        dislikes: "School"
    },
    {
        name: "Fredrick",
        honorific : "Kun",
        likes: {"Mobile Legends","Yn@sh"},
        dislikes: {"Milk power","DENSE MC"}
    },
    {
        name: "Shori",
        honorific : "San",
        likes: "Devil may cry",
        dislikes: "Small money"
    },
];

```

We can create a new array called `weeb_names` from our current `weeb` array which will contain the names of our _weebs_ and their honorifics.

```javascript
let weeb_names = weebs.map(weeb => {
    return `${weeb.name} ${weeb.honoriffic}`
})
```

Here, we map through our `weebs` array using `weebs.map()` where we pass an arrow function as an argument to our `map()` method and `weeb` as an argument to our arrow function.

`weeb` now represents each item in our array. Since each item in our array are objects, we can access their properties.

We then return a string of our weeb name and honorific using template literals to our new `weeb_names` array.

We access the `name` and `honorific` of each object in our original `weebs` array through the function argument  `weeb` which now holds the value of each object in our original array

Let's look at our new array of weebs

:img-cont{src="https://miracleio.me/_nuxt/img/quick-note-on-array-map-output-1.ca5832c.png" alt="Inline output of new array"}
