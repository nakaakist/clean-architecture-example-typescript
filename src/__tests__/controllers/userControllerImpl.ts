import { Request } from 'src/controllers/types/request';
import { UserControllerImpl } from 'src/controllers/userControllerImpl';
import { UserNameNotUniqueValidationError } from 'src/entities/errors';
import { UserInteractor } from 'src/interactors/interfaces/userInteractor';
import { Failure, Success } from 'src/result';

describe('user controller', () => {
  let interactor: UserInteractor;

  beforeEach(() => {
    interactor = {
      createUser: jest.fn(),
      listAllUsers: jest.fn(),
      findUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
  });

  test('create user', async () => {
    const req = {
      body: { name: 'name' },
      headers: {},
      params: {},
      query: {},
    };
    interactor.createUser = jest
      .fn()
      .mockReturnValueOnce(new Success({ id: '1' }));
    const controller = new UserControllerImpl(interactor);
    const res = await controller.createUser(req);
    expect(res).toEqual({
      body: { id: '1' },
      status: 201,
    });
  });

  test('cannot create invalid user', async () => {
    const req: Request = {
      body: {},
      headers: {},
      params: {},
      query: {},
    };
    const controller = new UserControllerImpl(interactor);
    const res = await controller.createUser(req);
    expect(res.status).toEqual(400);
  });

  test('cannot create user with non-unique user name', async () => {
    const req: Request = {
      body: { name: 'name' },
      headers: {},
      params: {},
      query: {},
    };
    interactor.createUser = jest
      .fn()
      .mockReturnValueOnce(
        new Failure(new UserNameNotUniqueValidationError('name'))
      );
    const controller = new UserControllerImpl(interactor);
    const res = await controller.createUser(req);
    expect(res.status).toEqual(409);
  });

  test('list all users', async () => {
    const req = {
      body: {},
      headers: {},
      params: {},
      query: {},
    };
    interactor.listAllUsers = jest
      .fn()
      .mockReturnValueOnce(new Success([{ id: '1', name: 'name' }]));
    const controller = new UserControllerImpl(interactor);
    const res = await controller.listAllUsers(req);
    expect(res).toEqual({
      body: [{ id: '1', name: 'name' }],
      status: 200,
    });
  });

  test('find user by ID', async () => {
    const req = {
      body: {},
      headers: {},
      params: { id: '1' },
      query: {},
    };
    interactor.findUserById = jest
      .fn()
      .mockReturnValueOnce(new Success({ id: '1', name: 'name' }));
    const controller = new UserControllerImpl(interactor);
    const res = await controller.findUserById(req);
    expect(res).toEqual({
      body: { id: '1', name: 'name' },
      status: 200,
    });
  });

  test('update user', async () => {
    const req = {
      body: { name: 'name2' },
      headers: {},
      params: { id: '1' },
      query: {},
    };
    interactor.updateUser = jest.fn().mockReturnValueOnce(new Success(null));
    const controller = new UserControllerImpl(interactor);
    const res = await controller.updateUser(req);
    expect(res).toEqual({
      body: {},
      status: 204,
    });
  });

  test('delete user', async () => {
    const req = {
      body: {},
      headers: {},
      params: { id: '1' },
      query: {},
    };
    interactor.deleteUser = jest.fn().mockReturnValueOnce(new Success(null));
    const controller = new UserControllerImpl(interactor);
    const res = await controller.deleteUser(req);
    expect(res).toEqual({
      body: {},
      status: 204,
    });
  });
});
