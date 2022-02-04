# Travel application

This application will help you find some relevant information about place, where you want to go.
It will provide you with information of weather and show you picture of this place.

Have a look at the [example website](https://travel-planner20.herokuapp.com/). 

The goal of this project was to have practice with:

 * Set up Webpack
 * Use Webpack Loaders and Plugins
 * Sass styles
 * Create layouts and page design
 * Set up service workers
 * Use APIs and create requests to external APIs

## Motivation

The motivation for doing this project was the opportunity to consolidate what I have learned through practice.

## Getting started

Click [here](https://travel-planner20.herokuapp.com/).
You will need to enter the name of the city where you are planning to go and the date of when you will arrive at the destination.
By the time you have entered the information and clicked search, the window with information about your trip will show up. You can save it and it will added onto the website. You can remove the entry if you wish to do so.

You can remove the entry if you wish to do so.

### Installing Dependencies

#### Installing Node and NPM

The project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

After cloning, open your terminal and run:

```bash
npm install
```

>_tip_: **npm i** is shorthand for **npm install**

## Instructions

In order to run this application properly locally you need to signup for a several APIs:
 * [GeoNames](http://www.geonames.org/export/web-services.html)
 * [Weatherbit](https://www.weatherbit.io/account/create)
 * [Pixabay](https://pixabay.com/api/docs/)

Create a new `.env` file in the root of your project. Fill the `.env` file with your keys like this:

```
WEATHER_KEY=********************
GEONAME_USER=***************
PIXABAY_KEY=************************
```

### Run in development mode

Start the webpack dev server
```bash
npm build-dev
```

Start the server
```bash
npm start
```

### Run in production mode

Generate the dist files
```bash
npm build
```

start the server
```bash
npm start
```

This will assemble the templates, static assets, Sass, and JavaScript. You can view the test server at this URL:

`http://localhost:5000`

### Run tests

To run the tests, run
```bash
npm test
```

## Authors

[Diana Mukaliyeva](https://github.com/DianaMukaliyeva)

## Acknowledgments

* [Udacity](https://www.udacity.com/)
* [GeoNames](http://www.geonames.org/export/web-services.html)
* [Weatherbit](https://www.weatherbit.io/account/create)
* [Pixabay](https://pixabay.com/api/docs/)
