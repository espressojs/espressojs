import { asFunction, createContainer } from 'awilix';
import { RequestHandler } from 'express';
import { noop } from 'lodash';


export type Hooks = {
  useState;
  useContext;
}


const container = createContainer();

export default function withHooks(initialContext: () => any = noop): RequestHandler {
  container.register({
    context: asFunction(initialContext).scoped()
  });
  return (req, res, next) => {
    res.locals.scope = container.createScope();
    next();
  }
}


function hooks() {
  //
}

