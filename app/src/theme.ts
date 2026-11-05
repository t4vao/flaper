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
  // Filled navigation glyphs: a soft neutral pair inspired by the supplied reference.
  navIconPrimary: '#68686F',
  navIconSecondary: '#A8A8AE',
  navIconSelected: '#9C86DE',
  navGlass: 'rgba(255, 255, 255, 0.82)',
  navGlassBorder: 'rgba(255, 255, 255, 0.6)',
  navShadow: 'rgba(48, 48, 52, 0.14)',
  navActionShadow: 'rgba(48, 48, 52, 0.06)',
  navHighlight: 'rgba(255, 255, 255, 0.7)',
  navInsetShadow: 'rgba(48, 48, 52, 0.05)',
  // Profile: unfilled part of the completion ring, and card/row rules on white.
  ringTrack: '#ECECEE',
  hairline: 'rgba(48, 48, 52, 0.09)',
} as const;

export const fonts = {
  logo: 'InstrumentSerif_400Regular_Italic',
  // Upright cut of the same family: section titles and place names on light screens.
  display: 'InstrumentSerif_400Regular',
  label: 'Inter_500Medium',
} as const;

// Figma frame: 13px side padding, 20px bottom padding above the 32px home-indicator bar.
export const layout = {
  gutter: 13,
  bottomPadding: 20,
  homeIndicator: 32,
} as const;
