import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { UserValidator } from 'src/entities/interfaces/userValidator';
import { User } from 'src/entities/user';
import { UserValidatorImpl } from 'src/entityValidators/userValidatorImpl';

describe('user validator', () => {
  let dataAccess: UserDataAccess;
  let validator: UserValidator;

  beforeEach(() => {
    dataAccess = {
      saveUser: jest.fn(),
      listAllUsers: jest.fn(),
      findUserById: jest.fn(),
      findUserByName: jest.fn(),
      deleteUser: jest.fn(),
    };
    validator = new UserValidatorImpl(dataAccess);
  });

  test('name length check for empty name', () => {
    expect(validator.isNameNotEmpty('')).toBe(false);
  });

  test('name length check for non-empty name', () => {
    expect(validator.isNameNotEmpty('name')).toBe(true);
  });

  test('name uniqueness check for unique name (user does not exist with same name)', async () => {
    dataAccess.findUserByName = jest.fn().mockReturnValueOnce(null);
    const result = await validator.isNameUnique('1', 'name');
    expect(result).toBe(true);
  });

  test('name uniqueness check for unique name ("other" user does not exist with same name)', async () => {
    dataAccess.findUserByName = jest
      .fn()
      .mockReturnValueOnce(new User('1', 'name'));
    const result = await validator.isNameUnique('1', 'name');
    expect(result).toBe(true);
  });

  test('name uniqueness check for non-unique name', async () => {
    dataAccess.findUserByName = jest
      .fn()
      .mockReturnValueOnce(new User('1', 'name'));
    validator = new UserValidatorImpl(dataAccess);
    const result = await validator.isNameUnique('2', 'name');
    expect(result).toBe(false);
  });
});
