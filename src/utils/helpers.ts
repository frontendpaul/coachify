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

export const toHumanReadableTime = (totalSeconds: number): string => {
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - hours * 3600) / 60);

  if (hours > 0) return hours + 'h ' + minutes + 'min';
  if (hours === 0 && minutes === 0) return '< 1min';
  return minutes + 'min';
};
