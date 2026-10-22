// Shared by the native (MapLibre React Native) and web (maplibre-gl) maps.

// CARTO Dark Matter: a dark, quiet basemap so the photo pins carry the colour.
// Free for development; commercial use needs a CARTO licence or another provider (MapTiler, Stadia).
export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// Rio de Janeiro, framed on the Zona Sul.
export const RIO_CENTER: [number, number] = [-43.1964, -22.9711];
export const RIO_ZOOM = 12.5;

// Município do Rio — keeps panning inside the launch city.
export const RIO_BOUNDS: [number, number, number, number] = [-43.8, -23.09, -43.09, -22.74];

// From this zoom the pins grow and show their category sticker.
export const DETAIL_ZOOM = 13.6;

// Selecting a pin eases the map so the pin sits at this fraction of the screen height,
// leaving room above it for the card that opens out of the pin.
export const PIN_FOCUS_RATIO = 0.7;
export const FOCUS_ZOOM = 14.6;
export const FOCUS_DURATION = 420;
