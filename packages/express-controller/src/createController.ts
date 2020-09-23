import { Router } from 'express';
import { isArray, each } from 'lodash';
import { ControlledRoute, ControllerOptions, Controller, ControllerContext } from './types';
import { sanitizePath } from './utils';

const defaultOptions: ControllerOptions = {
  path: '/'
};

export function createController(routes?: ControlledRoute[], options?: ControllerOptions): Controller;
export function createController(options?: ControllerOptions): Controller;
export function createController(a?: any, b?: any): Controller {
  const routes: ControlledRoute[] = isArray(a) ? a : [];
  let options: ControllerOptions = isArray(a) ? b : a;

  options = options
    ? { ...defaultOptions, ...options }
    : defaultOptions

  options.path = `${sanitizePath(options.path)}`;

  const context: ControllerContext = [...routes];

  return {
    add: (...routes: ControlledRoute[]) => {
      for (const route of routes) {
        if(!route.path) {
          route.path = options.path;
        } else {
          route.path = `${options.path}${sanitizePath(route.path)}`;
        }
        
        context.push(route);
      }
    },
    export: (router: Router): void => {
      each(context, route => {
        const handlers: any[] = [ ];
        if (route.before && route.before.length > 0) {
          handlers.push(route.before);
        }
        handlers.push(route.handler);
  
        if (!route.method) {
          route.method = 'get';
        }
  
        if (!route.path) route.path = '';
  
        if (router[route.method]) {
          router[route.method](route.path, handlers)
        }
      });
    }
  };
}