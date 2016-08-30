# Surface Water

![Water detection from NASA Landsat data](http://water.earthgenome.org/hero.png)

The Earth Genome water app provides information on the changes in extent of surface water area between 1999 and 2012. Surface water extent is constructed on the fly for any selected area using Landsat 7 annual composite imagery. The basemap highlights the static extent of any selected water boundary in blue and a time series graph appears below it. Clicking on the arrows or the years in the time series will allow you to view water extent over time. The application has been made to demonstrate the value of easy access and intuitive design for environmental information.

# Requirements

- [nodejs](https://nodejs.org/en/)

# Installation

Start by installing the required nodejs packages using `npm` (already bundled with recent nodejs installations)

```
npm install
npm install file-loader --save
```

Next, start the server by running:

```
node server.js
```

You should be able to access your application at [http://localhost:3000/](http://localhost:3000/)
