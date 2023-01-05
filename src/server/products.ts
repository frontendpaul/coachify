import { nanoid } from 'nanoid';

export type Product = {
  id: string;
  name: string;
  creator: string;
  free: boolean;
  price?: number;
  rating: number;
  participants: number;
  duration: string;
  coverImage: string;
};

export const products: Product[] = [
  {
    id: 'UJV8zBbfNsSYscnIK7fJ_',
    name: 'How to create stunning motion Scenes',
    creator: 'John Smith',
    free: false,
    price: 14.99,
    rating: 4.9,
    participants: 320,
    duration: '4h30min',
    coverImage: '/courses/filmmaking.webp',
  },
  {
    id: 'dsiXfimpcH9MMMYNLyVh6',
    name: 'Create native mobile Apps add more text for testing',
    creator: 'Sara Doe',
    free: false,
    price: 114.99,
    rating: 4.7,
    participants: 120,
    duration: '30min',
    coverImage: '/courses/mobile-app.webp',
  },
  {
    id: 'PbyyCZFTzlhEW6Un83LcC',
    name: 'Cooking 101',
    creator: 'Sara Doe',
    free: true,
    rating: 5.0,
    participants: 17,
    duration: '1h27min',
    coverImage: '/courses/cooking.webp',
  },
  {
    id: 'F3SzYuhyZ4jS-paCf8SYm',
    name: 'Learn JavaScript',
    creator: 'Poul Sparrow',
    free: false,
    price: 99.99,
    rating: 4.8,
    participants: 78,
    duration: '7h12min',
    coverImage: '/courses/coding.webp',
  },
  {
    id: 'REuq4PB-2OU1NGKvfoSNI',
    name: 'Knitting',
    creator: 'Sara Doe',
    free: false,
    price: 69.99,
    rating: 4.8,
    participants: 3,
    duration: '7h12min',
    coverImage: '/courses/knitting.webp',
  },
  {
    id: 'cKSDVDId2kbIsGoZcKqrr',
    name: 'Oil Painting',
    creator: 'Sara Doe',
    free: false,
    price: 39.99,
    rating: 4.8,
    participants: 33,
    duration: '2h42min',
    coverImage: '/courses/painting.webp',
  },
];

export function getTopRankedProducts() {
  const filteredProducts = products.filter((product) => product.rating > 4.5);
  const topRankedProducts = filteredProducts.sort(
    (a, b) => b.rating * b.participants - a.rating * a.participants
  );
  return topRankedProducts;
}
