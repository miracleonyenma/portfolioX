---
title: Fix useEffect missing dependencies warning with useCallback in React
description: Here's how you can remove a "missing dependencies" warning in a useEffect hook
tags: [react, javascript]
author: {
  name: "Miracle Onyenma, ChatGPT",
  avatar: "/assets/img/chatgpt.jpg"
}
---

It's common to encounter the following warning when working with `useEffect()` hook in React:

<!-- <img-cont src="/assets/img/snippets/fix-useeffect-missing-dependencies-warning-with-usecallback-in-react/useEffect warning screenshot.png" alt="useEffect warning screenshot" ></img-cont> -->

:img-cont{src="/assets/img/snippets/fix-useeffect-missing-dependencies-warning-with-usecallback-in-react/useEffect warning screenshot.png" alt="useEffect warning screenshot"}

> React Hook useEffect has missing dependencies: 'findSelected', 'list', and 'selected'. Either include them or remove the dependency array.

It's not a big deal since the code still works fine and in this case, I only wanted the code within the useEffect hook to run when the `option` state changes and that's why `option` is the only item in the dependency array.

But in order for both React and I to be happy, I have to add all the state variables and functions used in the hook to the dependency array but that's bound to lead to some errors. So, what do we do?

That's where `useCallback` comes in.

Let's get ChatGPT to show us an example:

Here is an example of how to use the `useCallback` hook to fix a "missing dependencies" warning in a `useEffect` hook:

```javascript
import { useState, useEffect, useCallback } from 'react';

function MyComponent() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // create a callback function that only changes when count changes
  const fetchData = useCallback(() => {
    fetch(`http://my-api/data?count=${count}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [count]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Update</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

In this example, the `useEffect` hook is dependent on the `fetchData` callback function, which is only recreated when the `count` state changes. This means that when the `count` state is updated, the `useEffect` hook will re-run and fetch new data with the updated `count` value.

It's important to note that in the above example, `fetchData` callback will be recreated everytime `count` changes. If you have any other dependency in `fetchData` callback then you need to add them in the dependency array of `useCallback` hook as well.