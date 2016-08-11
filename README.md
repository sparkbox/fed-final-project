# Frontend Designer - Final Project

1. Clone this repository
2. `npm install`
3. `npm start`
4. Project will be available at `http://localhost:8000`

## HTML
The HTML is rendered using Handlebars templates, which rely on three areas:
- **Layout:** `src/layout` The layout .hbs files handle the over html, head aread of the HTML document
- **Pages:** `src/pages` The pages .hbs files are the body area of the HTML document
- **Partials:** `src/partials` The partials can be used between the layout and pages .hbs files to breakdown code into more manageable chunks.

## CSS
The CSS is rendered using a mixture of libSass and PostCSS. Use `src/scss` to manage Sass files and partials.

## JavaScript
Place in necessary JavaScript files in `src/js` and they will be pulled over verbatim.

## Public
Place an miscellaneous assets in `src/public` and they will be pulled over verbatim.

## Icons
This project has Grunticon built in, which allows for easy use of SVG icons. Place the SVG files in `src/icons` and Grunticon will take if from there.
