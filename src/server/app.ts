// to enable async handler in express, partially disable eslint
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Server } from 'http';

import express from 'express';
import { UserController } from 'src/controllers/interfaces/userController';
import { Request } from 'src/controllers/types/request';

export class App {
  private readonly _app: express.Application;

  public get app(): express.Application {
    return this._app;
  }

  constructor(controller: UserController) {
    this._app = this.buildApp(controller);
  }

  public listen(port: number, callback: (() => void) | undefined): Server {
    return this._app.listen(port, callback);
  }

  private buildApp(controller: UserController): express.Application {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // define routings
    app.post('/users', async (req: express.Request, res: express.Response) => {
      const response = await controller.createUser(req as Request);
      res.status(response.status).json(response.body);
    });

    app.get('/users', async (req: express.Request, res: express.Response) => {
      const response = await controller.listAllUsers(req as Request);
      res.status(response.status).json(response.body);
    });

    app.get(
      '/users/:id',
      async (req: express.Request, res: express.Response) => {
        const response = await controller.findUserById(req as Request);
        res.status(response.status).json(response.body);
      }
    );

    app.put(
      '/users/:id',
      async (req: express.Request, res: express.Response) => {
        const response = await controller.updateUser(req as Request);
        res.status(response.status).json(response.body);
      }
    );

    app.delete(
      '/users/:id',
      async (req: express.Request, res: express.Response) => {
        const response = await controller.deleteUser(req as Request);
        res.status(response.status).json(response.body);
      }
    );

    return app;
  }
}
