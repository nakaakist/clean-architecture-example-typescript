import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { UserNameEmptyValidationError } from 'src/entities/errors';
import { UserValidator } from 'src/entities/interfaces/userValidator';
import { User } from 'src/entities/user';
import { UserWithIdNotFoundValidationError } from 'src/interactors/errors';
import { UserInteractor } from 'src/interactors/interfaces/userInteractor';
import { UserInteractorImpl } from 'src/interactors/userInteractorImpl';

describe('user interactor', () => {
  let dataAccess: UserDataAccess;
  let validator: UserValidator;
  let interactor: UserInteractor;

  beforeEach(() => {
    dataAccess = {
      saveUser: jest.fn(),
      listAllUsers: jest.fn(),
      findUserById: jest.fn(),
      findUserByName: jest.fn(),
      deleteUser: jest.fn(),
    };
    validator = {
      isNameNotEmpty: jest.fn().mockReturnValueOnce(true),
      isNameUnique: jest.fn().mockReturnValueOnce(true),
    };
    interactor = new UserInteractorImpl(dataAccess, validator);
  });

  test('create user', async () => {
    expect.assertions(2);
    const result = await interactor.createUser({ name: 'name' });
    if (result.isSuccess()) {
      expect(result.value.id.length).toBe(36); // length of uuid
    }
    expect(dataAccess.saveUser).toHaveBeenCalled();
  });

  test('returns error when creating invalid user', async () => {
    validator.isNameNotEmpty = jest.fn().mockReturnValueOnce(false);
    const result = await interactor.createUser({ name: '' });
    expect(result.value).toBeInstanceOf(UserNameEmptyValidationError);
    expect(dataAccess.saveUser).not.toHaveBeenCalled();
  });

  describe('operation to pre-existing users', () => {
    beforeEach(() => {
      dataAccess.listAllUsers = jest
        .fn()
        .mockReturnValueOnce([new User('1', 'name')]);
      dataAccess.findUserById = jest
        .fn()
        .mockReturnValueOnce(new User('1', 'name'));
      interactor = new UserInteractorImpl(dataAccess, validator);
    });

    test('list all users', async () => {
      const result = await interactor.listAllUsers();
      expect(result.value).toEqual([{ id: '1', name: 'name' }]);
    });

    test('get user by ID', async () => {
      const result = await interactor.findUserById('1');
      expect(result.value).toEqual({ id: '1', name: 'name' });
    });

    test('returns error when getting user with non-existing ID', async () => {
      dataAccess.findUserById = jest.fn().mockReturnValueOnce(null);
      const result = await interactor.findUserById('2');
      expect(result.value).toBeInstanceOf(UserWithIdNotFoundValidationError);
    });

    test('update user', async () => {
      const result = await interactor.updateUser({
        id: '1',
        name: 'name',
      });
      expect(dataAccess.saveUser).toHaveBeenCalled();
      expect(result.value).toBe(null);
    });

    test('cannot update invalid user', async () => {
      validator.isNameNotEmpty = jest.fn().mockReturnValueOnce(false);
      const result = await interactor.updateUser({ id: '1', name: '' });
      expect(result.value).toBeInstanceOf(UserNameEmptyValidationError);
      expect(dataAccess.saveUser).not.toHaveBeenCalled();
    });

    test('throws error when updating user with non-existing ID', async () => {
      dataAccess.findUserById = jest.fn().mockReturnValueOnce(null);
      const result = await interactor.updateUser({ id: '2', name: 'name' });
      expect(result.value).toBeInstanceOf(UserWithIdNotFoundValidationError);
      expect(dataAccess.saveUser).not.toHaveBeenCalled();
    });

    test('delete user', async () => {
      const result = await interactor.deleteUser('1');
      expect(result.value).toBe(null);
      expect(dataAccess.deleteUser).toHaveBeenCalled();
    });

    test('throws error when deleting user with non-existing ID', async () => {
      dataAccess.findUserById = jest.fn().mockReturnValueOnce(null);
      const result = await interactor.deleteUser('2');
      expect(result.value).toBeInstanceOf(UserWithIdNotFoundValidationError);
      expect(dataAccess.deleteUser).not.toHaveBeenCalled();
    });
  });
});
