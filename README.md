# Tallies.app

A PWA using firebase hosting, auth, and firestore to keep count of stuff.


## Deploy

All the firebase configuration comes from the environment (see sample.env). You'll need to build the project prior to deploying.

``` bash
npm run build
npx firebase deploy
```


## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```
