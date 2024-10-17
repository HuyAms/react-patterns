# React Patterns

A small project to play around with some React patterns - learned from [Kent C. Dodds](https://twitter.com/kentcdodds) 🙏

To run the project:

```
npm install
npm run dev
```

The UI doesn't tell much. Read the code under the `components` folder.

## Composition

The Composition and Layout Components Pattern helps to avoid the prop drilling problem and enhances the reusability of your components.

## Lastest Ref

The Latest Ref Pattern allows you to have a reference to the latest value of a prop, state, or callback without needing to list it in a dependency array when accessing it in a useEffect.

## Compound Component

The Compound Components Pattern enables you to provide a set of components that implicitly share state for a simple yet powerful declarative API for reusable components.

## Props Collection and Getter

The Prop Collections and Getters Pattern allows your hook to support common use cases for UI elements people build with your hook.

👉 Example: [Conform - getFormProps](https://conform.guide/api/react/getFormProps)

## State Initializer

The state initializer pattern is a way to initialize (and reset) the state of a component in a predictable way.

## State Reducer

The State Reducer Pattern inverts control over the state management of your hook and/or component to the developer using it so they can control the state changes that happen when dispatching events.

## Controlled Props

The Control Props pattern allows users to completely control state values within your component. This differs from the state reducer pattern in the fact that you can not only change the state changes based on actions dispatched but you also can trigger state changes from outside the component or hook as well.
