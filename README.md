# Introduction

Lantis needs to be able to interact with its plugins.  It does so using lantis-store which is essentially a redux store and a helper function to dynamically add reducers.

# API

`lantis-store` exports `store` and `reducerRegistry`.

`reducerRegistry` takes parameters `name` and `reducer`; and returns `undefined`.
  - `name` is the key for the reducer
  - `reducer` is the redux reducer to be associated with the key `name`

`store` has the same API as a redux store.
