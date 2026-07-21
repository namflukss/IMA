import soupImage from '../assets/images/soup.jpg';
import mainsImage from '../assets/images/mains.jpg';
import cakesImage from '../assets/images/cake.jpg';
import saladsImage from '../assets/images/salad.jpg';
import meatImage from '../assets/images/meat.jpg';
import vegImage from '../assets/images/veg.jpg';

// Every top-level category has hue set explicitly; descendants inherit it
// (via withHue below) so recipe cards/tiles anywhere in a branch share the
// same color family. Only top-level nodes carry a photo.
const RAW_CATEGORIES = [
  {
    id: 'soups', name: 'מרקים', hue: 25, image: soupImage,
    children: [
      { id: 'soups-chicken', name: 'מרקי עוף' },
      { id: 'soups-veg', name: 'מרקי ירקות' },
    ],
  },
  {
    id: 'mains', name: 'עיקריות', hue: 260, image: mainsImage,
    children: [
      { id: 'mains-pasta-cat', name: 'פסטות' },
      { id: 'mains-poultry', name: 'מנות עוף' },
      { id: 'mains-grains', name: 'דגנים ותבשילים' },
    ],
  },
  {
    id: 'pastries', name: 'פשטידות', hue: 95,
    children: [
      { id: 'pastries-veg', name: 'פשטידות ירק' },
      { id: 'pastries-cheese', name: 'פשטידות גבינה' },
    ],
  },
  {
    id: 'desserts', name: 'קינוחים', hue: 330, image: cakesImage,
    children: [
      {
        id: 'desserts-cakes', name: 'עוגות',
        children: [
          { id: 'desserts-cakes-chocolate', name: 'עוגות שוקולד' },
          { id: 'desserts-cakes-cheese', name: 'עוגות גבינה' },
          { id: 'desserts-cakes-sponge', name: 'עוגות בחושות' },
        ],
      },
      { id: 'desserts-cookies', name: 'עוגיות ומאפים קטנים' },
    ],
  },
  {
    id: 'salads', name: 'סלטים', hue: 145, image: saladsImage,
    children: [
      { id: 'salads-veg', name: 'סלטי ירקות' },
      { id: 'salads-grain', name: 'סלטי דגנים' },
    ],
  },
  {
    id: 'chicken', name: 'עוף', hue: 60,
    children: [
      { id: 'chicken-oven-cat', name: 'עוף בתנור' },
      { id: 'chicken-sauce', name: 'עוף ברוטב' },
    ],
  },
  {
    id: 'meat', name: 'בשר', hue: 10, image: meatImage,
    children: [
      { id: 'meat-patties', name: 'קציצות ותבשילים' },
      { id: 'meat-roast-cat', name: 'צלי ובשר איטי' },
    ],
  },
  {
    id: 'veg', name: 'צמחוני', hue: 175, image: vegImage,
    children: [
      { id: 'veg-stew-cat', name: 'תבשילי ירקות' },
      { id: 'veg-eggs', name: 'ביצים וירקות' },
    ],
  },
  {
    id: 'kids', name: 'ילדים', hue: 300,
    children: [
      { id: 'kids-sweet', name: 'ארוחות מתוקות' },
      { id: 'kids-pasta-cat', name: 'פסטה לילדים' },
    ],
  },
];

function withHue(nodes, inheritedHue) {
  return nodes.map((n) => {
    const hue = n.hue ?? inheritedHue;
    return {
      ...n,
      hue,
      children: n.children ? withHue(n.children, hue) : undefined,
    };
  });
}

export const CATEGORIES = withHue(RAW_CATEGORIES, 0);
