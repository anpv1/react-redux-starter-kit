# react-redux-starter-kit
A webpack React starter kit using with react-router, redux, redux-saga and Bulma CSS.
I already add authentication (username/password: test@test.com / 112233) and network status checking as an example of using redux-saga.
If you are not familar with redux-saga, I suggest you shoud read carefully about Generator in JavaScript before study redux-saga.
Redux-saga could help your life much easier than redux-thunk.

I also use Bulma instead of Bootstrap. Bulma is a very easy to use CSS-only framework.
There is no Javascript included so you have freedom in Javascript usage. The menu in the kit is an example of Bulma usage.
Give it a try, it's awesome.

Other pieces included are font-awesome v4.7.0 and react-router v4.

### Installation
```shell
git clone https://github.com/anpv1/react-redux-starter-kit
cd react-redux-starter-kit
npm install
# dev server
npm run dev
# production build
npm run build
```

### Source code structure
* webpack/
  * base.js
  * webpack.dev.js  --> mock http server for login put here
  * webpack.production.js
* src/
  * actions/ --> redux, redux-saga actions
  * reducers/  --> redux state
  * routes/ --> routes config
  * views/ --> layouts, views, and common elements
    * elements/ --> common elements
    * images/
    * layouts/ -- different layouts for different pages
    * page1.js
    * page2.js
    * ...
  * app.js --> for production use, with workbox-webpack-plugin for offline first
  * store.js --> for development use, no workbox-webpack-plugin for offline first
