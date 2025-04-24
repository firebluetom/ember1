# Project

An Ember table with controls for a specific structure.

## Prerequisites

You will need the following things properly installed on your computer.

- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)

## Installation

- `npm install`

## Running / Development

- `npm start`
- Visit app at [http://localhost:4200](http://localhost:4200).
- Visit tests at [http://localhost:4200/tests](http://localhost:4200/tests).

## Styles

An unsuccessful attempt was made to add Tailwind, didn't want to spent much time on it so stuck to basic CSS.

## Components

The application has an index route that loads the data async and passes it to the main component.

Components
- table with controls - the main component
- table controls - the select all checkbox, number of items selected counter, and download button
- table row - a row in the table
- checkbox - a checkbox supporting 3 states - checked / unchecked / indeterminate
- download all button - button to download available selected rows

## Tests

Only wrote one test file

### Running Tests and Linters

- `npm run test`
- `npm run test:ember -- --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `npm exec ember build` (development)
- `npm run build` (production)
