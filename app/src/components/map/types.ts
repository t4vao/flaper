import type { Place } from '@/data/places';

export type RioMapProps = {
  places: readonly Place[];
  selectedId: string | null;
  onSelectPlace: (id: string) => void;
  // A tap on the map itself, outside any pin.
  onPressMap: () => void;
  // The person started panning or zooming.
  onUserGesture: () => void;
};
