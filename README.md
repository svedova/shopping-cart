## Shopping Cart
Simple shopping cart example with react & redux. [Live demo here](http://svedova.github.io/shopping-cart/) (production build). Read further to install it locally and run development mode.

## Instructions

The following will install the project locally and will start
a development version. 

```
git clone git@github.com:svedova/shopping-cart.git
cd shopping-cart
yarn install
yarn start
```

Once installed you can visit [here](http://localhost:3000).

## How it works

This project uses firebase to fetch items from a backend service. Later on, the cart
is stored to localStorage. When the checkout is completed localStorage is emptied.

## Unit Tests
This project includes two example unit tests. These unit tests can be found
under: 

* `src/views/List/actions/list.test.js`
* `src/views/Cart/components/Summary`.

Run `yarn test` to run the test suite.

### Notes
* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
* The folder structured was inspired [by this article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).
