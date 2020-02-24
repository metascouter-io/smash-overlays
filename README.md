# Metascouter Stats Overlays

React overlays for the Metascouter stats API.


## Developing

`yarn install` to install node dependencies.
`yarn run start` to start the development server.
`yarn run build` to build production bundle.


## Usage 

`<domain>/matchup/<username>`
`<domain>/analysis/<username>`

Upon loading the page, the APIs are hit and the overlays will be populated with
data.

If the active resources are changed, the overlays need to be reloaded in order
to see the new data.
