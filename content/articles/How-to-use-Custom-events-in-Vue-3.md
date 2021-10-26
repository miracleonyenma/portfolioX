---
title: How to use Custom events in Vue 3
description: Here, I'll show you how you can work with custom events with the composition API in Vue 3
tags: [custom events, Composition API, Vue 3, frontend]
---

As someone who has been using Vue 2 for a while now, switching over to Vue 3 with its new composition API and other cool features is exciting but comes with its little hiccups.

One of the hiccups or issues I faced while writing Vue 3 applications was using **custom events** in the new Composition API instead of the good ol' Options API.

I tried checking out the [Vue docs](https://v3.vuejs.org/guide/component-custom-events.html#defining-custom-events), but I wasn't getting exactly what I wanted. Then I set out on a googling spree, desperate to find a way to use custom events with the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api) in my project. 

And I finally found the way(s) 😋. 

So here, I'll discuss how to emit custom events from our components using the Composition API.

## Define Custom events Inline

Before I dive right into how to use Custom events with the Composition API in Vue 3, here's how we normally use custom events inline. To emit custom events inline, maybe in an input field or button, we can define events using the `v-on` or `@` drective:

```html
<button @click="$emit('btn-click')">Click me</button>
```

Then, in our parent component, we can listen for the event like so:

```html
<child @btn-click="doSomething()" />
```

## Custom events using the Options API

With the Options API to emit custom events  we also use the `$emit` method. We can access this method within our `<script>` with `this`. We'll set up the event emit from the `doSomething` method of the component.

```html
<script>
export default {
	// define your emits via the emits option
	emits: ['btn-click'],
	...
	methods: {
        doSomething(){
          this.$emit('btn-click')  
        },
	}

};
</script>
```

We still listen to this event from the parent component the same way we did when the emit was defined inline previously.

## Custom events using Composition API

Unlike the Options API, the [`setup` Component option](https://v3.vuejs.org/guide/composition-api-introduction.html#setup-component-option) is executed **before** the component is created, so we basically do not have to `this`.

The `setup` function accepts two arguments: `props` and `context`. We can access the component `emit ` method from `context`. 

We can create a function where we call the `emit` method and run the function when the button is clicked. 

```html
<script>
export default {
	// define your emits via the emits option
	emits: ['btn-click'],
    
	...
    setup(props, context){
		const doSomething => (){
			context.emit('btn-click')
		}
	},
    
    // OR
    
	// here we're getting the emit method by destructuring the context argument
	setup(props, { emit }){
		const doSomething => (){
			emit('btn-click')
		}
	}
};
</script>
```

And there you have it! That's how we can use custom events in the Composition API. 

Thanks for reading 💖.  Let me know if you have any questions or suggestions ✨