import express from 'express';
import { User } from 'src/entities/user';

import { ControllerFactory } from './controllerFactory';

// make controller with in-memory database and initial user
const factory = new ControllerFactory();
const controller = factory.makeInMemoryUserController([
  new User('931378e7-976b-4e36-87e9-cdfe9a5b85ce', 'initial-user'),
]);

// prepare express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define routings
app.post('/users', async (req: express.Request, res: express.Response) => {
  const response = await controller.createUser(req);
  res.status(response.status).json(response.body);
});

app.get('/users', async (req: express.Request, res: express.Response) => {
  const response = await controller.listAllUsers(req);
  res.status(response.status).json(response.body);
});

app.get('/users/:id', async (req: express.Request, res: express.Response) => {
  const response = await controller.findUserById(req);
  res.status(response.status).json(response.body);
});

app.put('/users/:id', async (req: express.Request, res: express.Response) => {
  const response = await controller.updateUser(req);
  res.status(response.status).json(response.body);
});

app.delete(
  '/users/:id',
  async (req: express.Request, res: express.Response) => {
    const response = await controller.deleteUser(req);
    res.status(response.status).json(response.body);
  }
);

// server start
app.listen(8000, () => {
  console.log('server started');
});
