import chalk from 'chalk';
import express, { Router } from 'express';
import { toUpper } from 'lodash';
import { Controller } from './types'

/**
 * @name withControllers
 * @description Express.JS middleware to register all controlled routes under one express.Router
 * @param {Array<Controller>} controllers // array of route controllers
 * @param {boolean} verbose // logs out all registered routes
 * @returns {express.Router} router
 * @example
 * function() {
 *  const app = express();
 *  app.use(withControllers([]));
 * }
 */
export default function withControllers(controllers: Controller[], verbose?: boolean): Router {
  const router = express.Router();
  
  for(const controller of controllers) {
    controller.export(router);
  }

  if(verbose) {
    console.log(chalk`{yellowBright.bold Loading route controllers...}`);
    
    router.stack
      .forEach(
        ({route}) => console.log(chalk`  {whiteBright.bold ${Object.keys(route.methods).map(toUpper)}} {white ${route.path}}`)
      );
  
    console.log(chalk`{green.bold All controllers added to router!}`);
  }

  return router
}

export { createController } from './createController';
export * from './types';