import {
    UserNameEmptyValidationError, UserNameNotUniqueValidationError
} from 'src/entities/errors';
import { UserValidator } from 'src/entities/interfaces/userValidator';
import { User } from 'src/entities/user';
import { Failure, Success } from 'src/result';

describe('User entity', () => {
  let validator: UserValidator;

  test('validation pass', async () => {
    validator = {
      isNameNotEmpty: jest.fn().mockReturnValueOnce(true),
      isNameUnique: jest.fn().mockResolvedValueOnce(true),
    };
    const user = new User('1', 'name');
    const result = await user.validate(validator);
    expect(result).toEqual(new Success(null));
  });

  test('validation error if name is empty', async () => {
    validator = {
      isNameNotEmpty: jest.fn().mockReturnValueOnce(false),
      isNameUnique: jest.fn().mockResolvedValueOnce(true),
    };
    const user = new User('1', '');
    const result = await user.validate(validator);
    expect(result).toEqual(new Failure(new UserNameEmptyValidationError()));
  });

  test('validation error if name is not unique', async () => {
    expect.assertions(1);
    validator = {
      isNameNotEmpty: jest.fn().mockReturnValueOnce(true),
      isNameUnique: jest.fn().mockResolvedValueOnce(false),
    };
    const user = new User('1', 'name');
    const result = await user.validate(validator);
    expect(result).toEqual(
      new Failure(new UserNameNotUniqueValidationError('name'))
    );
  });
});
