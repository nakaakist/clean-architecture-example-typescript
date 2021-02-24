import { User } from 'src/entities/user';

import { App } from './app';
import { ControllerFactory } from './controllerFactory';

// initial user of server
const initialUser = new User(
  '931378e7-976b-4e36-87e9-cdfe9a5b85ce',
  'initial-user'
);

// make controller with in-memory database and initial user
const factory = new ControllerFactory();
const controller = factory.makeInMemoryUserController([initialUser]);

// server start
new App(controller).listen(8000, () => {
  console.log('server started');
});
