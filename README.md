Dynamically attach [redux](https://redux.js.org/) reducers when component mounts, instead of loading them when application starts. This reduces the burden of maintaining long global list of reducers. 

## Getting Started
```bash
npm install dynamic-reducer # (or yarn add dynamic-reducer)
```

### Setting up the redux store
The redux store should be enhanced to allow package to work properly.
```js
import { createStore } from "redux";
import { dynamicReducerEnhancer } from "dynamic-reducer";

const store = createStore(
    staticReducer,
    initialState,
    dynamicReducerEnhancer()
);

```

Note the `dynamicReducerEnhancer` function takes two options. `createDynamicReducer` is a high order reducer which decides how to combine dynamically attached reducers with each other. It's passed the attached reducers as an object of key-reducer pairs. `reduceReducers` is also a high order reducer the purpose of which is to combine static reducer and the dynamic reducer returned from `createDynamicReducer` call.

```js
    const store = createStore(
    staticReducer,
    initialState,
    dynamicReducerEnhancer({
        createDynamicReducer,
        reduceReducers
    })
    );
```


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
After setting up the store, you can start attaching reducers using high order component `withReducer`.
```js
import withReducer from "dynamic-reducer";

class YourComponent extends React.Component {
 render() {
   return null;
 }
}

export default withReducer({"path.to.store.key": reducer})(YourComponent)

```

Or, using object as the first HOC parameter:
```js
import withReducer from "dynamic-reducer";

class YourComponent extends React.Component {
 render() {
   return null;
 }
}

export default withReducer({path: { to: { store: { key: reducer }} })(YourComponent)

```

## Documentation