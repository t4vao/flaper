// Demonstration content for the home until the backend exists. Every value here is synthetic.
import { PLACES, type Place } from '@/data/places';

export const ME = { name: 'Gustavo', handle: '@gustavo' } as const;

// The person's own profile. Counts are synthetic until the backend exists.
export const MY_PROFILE = {
  visits: 12,
  wantToGo: 7,
  lists: 3,
  following: 5,
  // Approved suggestions; `newApproval` marks one the person has not opened yet.
  contributions: 2,
  newApproval: true,
  neighborhoods: 8,
  cities: 2,
  // Profile completion is the share of these steps already done.
  steps: [
    { id: 'foto', done: false },
    { id: 'bio', done: false },
    { id: 'primeira-visita', done: true },
    { id: 'seguir', done: true },
    { id: 'indicar', done: false },
  ],
} as const;

export const profileCompletion = () =>
  Math.round((MY_PROFILE.steps.filter((s) => s.done).length / MY_PROFILE.steps.length) * 100);

export type HomeTile = {
  place: Place;
  // One short line under the name: neighbourhood, or recent activity for Em alta.
  meta: string;
};

export type HomeSection = {
  id: string;
  title: string;
  tiles: HomeTile[];
};

// Events are not a category in the approved scope, so the prototype's festas stay off the home.
const VENUES = PLACES.filter((place) => place.category !== 'festa');

// Em alta counts different people with public visits in the last seven days, never the rating.
const recentVisitors = (place: Place) => Math.max(2, Math.round(place.reviewCount / 5));

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: 'em-alta',
    title: 'Em alta no Rio',
    tiles: [...VENUES]
      .sort((a, b) => recentVisitors(b) - recentVisitors(a))
      .slice(0, 6)
      .map((place) => ({ place, meta: `${recentVisitors(place)} pessoas · 7 dias` })),
  },
  {
    id: 'gastronomia',
    title: 'Gastronomia',
    tiles: VENUES.filter((p) => p.category === 'restaurante' || p.category === 'cafe').map((place) => ({
      place,
      meta: place.neighborhood,
    })),
  },
  {
    id: 'vida-noturna',
    title: 'Vida noturna',
    tiles: VENUES.filter((p) => p.category === 'bar').map((place) => ({ place, meta: place.neighborhood })),
  },
];

export type FriendVisit = {
  id: string;
  author: string;
  place: Place;
  // Visit date the person entered, not the publishing date.
  date: Date;
  rating?: number;
  text?: string;
  photo?: string;
};

const DAY = 24 * 60 * 60 * 1000;
const today = new Date();
today.setHours(12, 0, 0, 0);

// The newest review of each venue becomes a friend's visit, one or two days apart.
export const FRIEND_VISITS: FriendVisit[] = VENUES.slice(0, 9).map((place, i) => {
  const review = place.reviews[0];
  return {
    id: `${place.id}-${review.author}`,
    author: review.author,
    place,
    date: new Date(today.getTime() - Math.floor(i * 1.4) * DAY),
    // Some visits are kept without a rating, text or photo: all three are optional.
    rating: i % 4 === 3 ? undefined : review.rating - (i % 3 === 1 ? 0.5 : 0),
    text: i % 5 === 4 ? undefined : review.text,
    photo: i % 3 === 2 ? undefined : review.photo,
  };
});

export function visitDateLabel(date: Date) {
  const days = Math.round((today.getTime() - date.getTime()) / DAY);
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  const sameYear = date.getFullYear() === today.getFullYear();
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric' });
}
