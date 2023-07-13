Dynamically attach [redux](https://redux.js.org/) reducers when component mounts, instead of loading them when application starts. This eliminates the burden of maintaining long global list of reducers. 

## Getting Started
```bash
npm install redux-attachable-reducer # (or yarn add redux-attachable-reducer)
```

### Setting up the redux store
The redux store should be enhanced to allow library to work properly.
```js
import { createStore } from "redux";
import { attachableReducerEnhancer } from "redux-attachable-reducer";

const store = createStore(
  staticReducer,
  initialState,
  attachableReducerEnhancer()
);

```

Note the `attachableReducerEnhancer` function takes options object as a parameter:

```js
const store = createStore(
  staticReducer,
  initialState,
  attachableReducerEnhancer({
      combineAttachedReducers,
      combineAll
  })
);
```

* `combineAttachedReducers` option is a high order reducer which decides how to combine dynamically attached reducers with each other. It's passed the attached reducers as an object of key-reducer pairs.

By default `combineAttachedReducers` high order reducer works the following way.
Imagine we have several dynamically attached reducers as key-reducer pairs.

```js
{"one": r1, "one.two": r2, "one.three": r3}
```
Internally library generates tree structure similar to the one below.

![alt text](https://github.com/dorzhevsky/dynamicReducer/blob/master/img/sample.png)

This tree data structure is then traversed to create reducer.

```js
const reducer = combineReducers(
{
  one: reduceReducers(
    r1,
    combineReducers(
      {
        two: r2,
        three: r3
      }
    )
  )
})
```

* `combineAll` option is also a high order reducer with the purpose of combining static reducer (the one you passed as the first option to `createStore` function) and the dynamic reducer returned from `combineAttachedReducers` call.

By default `combineAll` high order reducer uses `reduceReducers` function from [reduce-reducers](https://www.npmjs.com/package/reduce-reducers) package.

### Redux DevTools
If you're using redux devtools, it's **important to set `shouldHotReload` to false**.  This is because otherwise, redux devtools will re-dispatch previous actions when reducers are attached.


```js
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  shouldHotReload: false
});

const store = createStore(reducer, composeEnhancers(
  ...
));
```

### Attaching your reducer
After setting up the store, you can start attaching reducers using high order component `attachReducer`.
```js
import { attachReducer } from "redux-attachable-reducer";

class YourComponent extends React.Component {
 render() {
   return null;
 }
}

export default attachReducer({"path.to.store.key": reducer})(YourComponent)

```

Or, using object as the first HOC parameter:
```js
import { attachReducer } from "redux-attachable-reducer";

class YourComponent extends React.Component {
 render() {
   return null;
 }
}

export default attachReducer({path: { to: { store: { key: reducer }} })(YourComponent)

```

## Documentation

![Documentation](https://github.com/dorzhevsky/redux-attachable-reducer/blob/master/README.md)
