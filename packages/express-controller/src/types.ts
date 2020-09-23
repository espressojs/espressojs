import { RequestHandler, Router } from 'express'

export type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type ResolvableString = string | undefined;

export type ControlledRoute = {
  /**
   * @param {string} path // route path
   * @example /api/helloworld
   */
  path?: string;
  /**
   * @param {Method} method // http request method
   */
  method?: Method;
  /**
   * @param {Array<RequestHandler>} before // these are middleware handlers that execute prior to your main handler
   */
  before?: RequestHandler[];
  /**
   * @param {RequestHandler} // your main http request handler
   */
  handler: RequestHandler;
};

export type ControllerContext = ControlledRoute[];

export type Controller = {
  /**
   * @name add
   * @description add route(s) to your controller, either individually or in bulk
   * @param route 
   */
  add(...route: ControlledRoute[]): void;
  export(router: Router): void;
};

export type ControllerOptions = {
  /**
   * @param {string} path // your base path for this controller
   */
  path?: ResolvableString;
};