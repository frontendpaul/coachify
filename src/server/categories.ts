export type Category = {
  id: string;
  name: string;
  coverImage: string;
};

const categories: Category[] = [
  {
    id: 'UJV8zBbfNsSYscnIK7fJ_',
    name: 'Development',
    coverImage: '/categories/development.jpg',
  },
  {
    id: 'dsiXfimpcH9MMMYNLyVh6',
    name: 'Business',
    coverImage: '/categories/business.jpg',
  },
  {
    id: 'PbyyCZFTzlhEW6Un83LcC',
    name: 'Finance & Accounting',
    coverImage: '/categories/finance.jpg',
  },
  {
    id: 'F3SzYuhyZ4jS-paCf8SYm',
    name: 'IT & Software',
    coverImage: '/categories/it.jpg',
  },
  {
    id: 'REuq4PB-2OU1NGKvfoS',
    name: 'Personal Development',
    coverImage: '/categories/personal-development.jpg',
  },
  {
    id: 'F3SzYuhyZ4jS-paCf8S',
    name: 'Design',
    coverImage: '/categories/design.jpg',
  },
  {
    id: 'PbyyCZFTzlhEW6Un83L',
    name: 'Marketing',
    coverImage: '/categories/marketing.jpg',
  },
  {
    id: 'dsiXfimpcH9MMMYNLyV',
    name: 'Health & Fitness',
    coverImage: '/categories/fitness.jpg',
  },
  {
    id: 'UJV8zBbfNsSYscnIK7f',
    name: 'Music',
    coverImage: '/categories/music.jpg',
  },
];

export function getCategories() {
  return categories;
}
