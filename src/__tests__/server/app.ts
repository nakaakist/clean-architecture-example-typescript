import express from 'express';
import { User } from 'src/entities/user';
import { App } from 'src/server/app';
import { ControllerFactory } from 'src/server/controllerFactory';
import request from 'supertest';

describe('e2e test for express app', () => {
  let app: express.Application;
  // initial user of server
  const initialUser = new User(
    '931378e7-976b-4e36-87e9-cdfe9a5b85ce',
    'initial-user'
  );
  type userParams = { id: string; name: string };

  beforeEach(() => {
    // make controller with in-memory database and initial user
    const factory = new ControllerFactory();
    const controller = factory.makeInMemoryUserController([initialUser]);

    // server start
    app = new App(controller).app;
  });

  describe('create user', () => {
    it('create user', async () => {
      const createRes = await request(app)
        .post('/users')
        .send({ name: 'name' });
      const listRes = await request(app).get('/users');
      expect(createRes.status).toBe(201);
      expect((listRes.body as userParams[]).length).toBe(2);
    });

    it('cannot create user with non-unique name', async () => {
      const createRes = await request(app)
        .post('/users')
        .send({ name: initialUser.name });
      const listRes = await request(app).get('/users');
      expect(createRes.status).toBe(409);
      expect((listRes.body as userParams[]).length).toBe(1);
    });

    it('cannot create user with empty name', async () => {
      const createRes = await request(app).post('/users').send({ name: '' });
      const listRes = await request(app).get('/users');
      expect(createRes.status).toBe(400);
      expect((listRes.body as userParams[]).length).toBe(1);
    });
  });

  describe('list all users', () => {
    it('list all users', async () => {
      const res = await request(app).get('/users');
      const users = res.body as userParams[];
      expect(res.status).toBe(200);
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(initialUser.id);
      expect(users[0].name).toBe(initialUser.name);
    });
  });

  describe('find user by ID', () => {
    it('find user by ID', async () => {
      const res = await request(app).get(`/users/${initialUser.id}`);
      const user = res.body as userParams;
      expect(res.status).toBe(200);
      expect(user.name).toBe(initialUser.name);
      expect(user.id).toBe(initialUser.id);
    });

    it('cannot find user by non-existing ID', async () => {
      const res = await request(app).get(`/users/non-existing`);
      expect(res.status).toBe(404);
    });
  });

  describe('update user', () => {
    it('update user', async () => {
      const updateRes = await request(app)
        .put(`/users/${initialUser.id}`)
        .send({ name: 'updated-name' });
      const listRes = await request(app).get('/users');
      const users = listRes.body as userParams[];
      expect(updateRes.status).toBe(204);
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(initialUser.id);
      expect(users[0].name).toBe('updated-name');
    });

    it('update user with same name', async () => {
      const updateRes = await request(app)
        .put(`/users/${initialUser.id}`)
        .send({ name: initialUser.name });
      const listRes = await request(app).get('/users');
      const users = listRes.body as userParams[];
      expect(updateRes.status).toBe(204);
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(initialUser.id);
      expect(users[0].name).toBe(initialUser.name);
    });

    it('cannot update user with non-existing ID', async () => {
      const res = await request(app).get(`/users/non-existing`);
      expect(res.status).toBe(404);
    });

    it('cannot update user with empty name', async () => {
      const updateRes = await request(app)
        .put(`/users/${initialUser.id}`)
        .send({ name: '' });
      const listRes = await request(app).get('/users');
      const users = listRes.body as userParams[];
      expect(updateRes.status).toBe(400);
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(initialUser.id);
      expect(users[0].name).toBe(initialUser.name);
    });
  });

  describe('delete user', () => {
    it('delete', async () => {
      const deleteRes = await request(app).delete(`/users/${initialUser.id}`);
      const listRes = await request(app).get('/users');
      const users = listRes.body as userParams[];
      expect(deleteRes.status).toBe(204);
      expect(users.length).toBe(0);
    });

    it('cannot delete user with non-existing ID', async () => {
      const deleteRes = await request(app).delete('/users/non-existing');
      const listRes = await request(app).get('/users');
      const users = listRes.body as userParams[];
      expect(deleteRes.status).toBe(404);
      expect(users.length).toBe(1);
    });
  });
});
