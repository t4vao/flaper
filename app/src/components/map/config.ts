// Shared by the native (MapLibre React Native) and web (maplibre-gl) maps.

// CARTO Positron: the light, quiet basemap mapcn uses by default.
// Free for development; commercial use needs a CARTO licence or another provider (MapTiler, Stadia).
export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

// Rio de Janeiro, framed on the Zona Sul.
export const RIO_CENTER: [number, number] = [-43.1964, -22.9711];
export const RIO_ZOOM = 12.5;

// Município do Rio — keeps panning inside the launch city.
export const RIO_BOUNDS: [number, number, number, number] = [-43.8, -23.09, -43.09, -22.74];
