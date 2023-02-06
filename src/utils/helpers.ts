import DOMPurify from 'isomorphic-dompurify';

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

export const toPercentage = (total: number, value: number): number => {
  return (value / total) * 100;
};
