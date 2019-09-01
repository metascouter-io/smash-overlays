# Metascouter SFV Stats Overlays

React front-end to the Metascouter stats API. It will poll the endpoint for updates regularly, and then display those data points on the overlay.

## Technologies used

- React
  - `styled-components` for all the styling in the project.
  - `react-router-dom` For the initial routing of the overlays to the correct wrappers.
- Babel 7
- Webpack 4
- `xjs-framework` for deeper Xsplit integration.

## Developing

`yarn install` to install node dependencies.
`yarn run start` to start the development server.
`yarn run build` to build production bundle.


## Usage with Xsplit

Xsplit is unique in that it has a separate system for managing a html sources properties. This can be see in `src/xsplit/XsplitWrap`. The caveat to this is the config page needs to be rendered into its own html file, or the properties window will not render. Hence why there are two outputs with webpack, index.html and config.html.

`<domain>/xsplit/matchup`
`<domain>/xsplit/analysis`

## Usage in iframe

The overlay can be rendered in an iframe, and passed down config parameters. The only caveat is the overlay must on the same domain as the iframe. The urls for the this default overlay are:

`<domain>/matchup`
`<domain>/analysis`

## Usage with OBS 

`<domain>/obs/matchup`
`<domain>/obs/analysis`


## Xsplit Dev Console
The source windows console can be found by opening [localhost:9222](http://localhost:9222/) in Google Chrome. This will not work in any other browsers.
