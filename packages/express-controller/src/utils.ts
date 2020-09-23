import { ResolvableString } from './types';

export const sanitizePath = (path: ResolvableString = ''): string => {
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path.endsWith('/')) {
    path = path.slice(0, path.length - 1);
  }
  return path;
} 