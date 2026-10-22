// Tokens taken verbatim from the Figma screens.
export const colors = {
  ink: '#303034',
  paper: '#F2F2F2',
  white: '#FFFFFF',
  lavender: '#DAC9FD',
  sky: '#B0D8FD',
  butter: '#FFEAA6',
  graphite: '#47474D',
  // Dark map behind the photo pins (matches CARTO Dark Matter's land colour).
  night: '#0E0E10',
  muted: '#7A7A82',
} as const;

export const fonts = {
  logo: 'InstrumentSerif_400Regular_Italic',
  label: 'Inter_500Medium',
} as const;

// Figma frame: 13px side padding, 20px bottom padding above the 32px home-indicator bar.
export const layout = {
  gutter: 13,
  bottomPadding: 20,
  homeIndicator: 32,
} as const;
