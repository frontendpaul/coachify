import DOMPurify from 'isomorphic-dompurify';
import { Contract } from 'types/supabase';

export const debounce = (func: Function, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['p', 'span', 'strong', 'br', 'ul', 'ol', 'li', 'a'],
    FORBID_ATTR: ['style'],
  });
};

export const toPercent = (total: number, value: number): number => {
  return (value / total || 0) * 100;
};

export const toReadableDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const config = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as const;
  return date.toLocaleDateString('de-DE', config);
};

export const toReadableTime = (totalSeconds: number): string => {
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - hours * 3600) / 60);

  if (hours > 0) return hours + 'h ' + minutes + 'min';
  if (hours === 0 && minutes === 0) return '< 1min';
  return minutes + 'min';
};

export const isCourseOwnedByUser = (
  contracts: Contract[] | undefined,
  courseId: string
) => {
  if (!contracts) return false;
  return contracts.some((contract) => contract.product_id === courseId);
};

export const isProductInUserFavorites = (favorites: any, courseId: string) => {
  if (!favorites) return false;
  return favorites.some((favorite: any) => favorite.product_id === courseId);
};

export const getPagination = (page: number, size: number) => {
  const limit = size ? size : 10;
  const from = page ? (page - 1) * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
