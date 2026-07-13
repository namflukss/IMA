import soupImage from '../assets/images/soup.jpg';
import mainsImage from '../assets/images/mains.jpg';
import cakesImage from '../assets/images/cake.jpg';
import saladsImage from '../assets/images/salad.jpg';
import meatImage from '../assets/images/meat.jpg';
import vegImage from '../assets/images/veg.jpg';

export const CATEGORIES = [
  { id: 'soups', name: 'מרקים', hue: 25, image: soupImage },
  { id: 'mains', name: 'עיקריות', hue: 260, image: mainsImage },
  { id: 'pastries', name: 'פשטידות', hue: 95 },
  { id: 'cakes', name: 'עוגות', hue: 330, image: cakesImage },
  { id: 'salads', name: 'סלטים', hue: 145, image: saladsImage },
  { id: 'chicken', name: 'עוף', hue: 60 },
  { id: 'meat', name: 'בשר', hue: 10, image: meatImage },
  { id: 'veg', name: 'צמחוני', hue: 175, image: vegImage },
  { id: 'kids', name: 'ילדים', hue: 300 },
];
