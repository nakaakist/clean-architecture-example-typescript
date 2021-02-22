import { InMemoryUserDataAccessImpl } from 'src/dataAccess/inMemoryUserDataAccessImpl';
import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { User } from 'src/entities/user';

describe('in-memory user dataAccess', () => {
  let dataAccess: UserDataAccess;

  beforeEach(() => {
    dataAccess = new InMemoryUserDataAccessImpl([
      new User('1', 'name1'),
      new User('2', 'name2'),
    ]);
  });

  test('list all users', async () => {
    const users = await dataAccess.listAllUsers();
    expect(users.map((user) => user.id).sort()).toEqual(['1', '2'].sort());
  });

  test('find user by ID', async () => {
    expect.assertions(1);
    const user = await dataAccess.findUserById('1');
    if (user) {
      expect(user.id).toBe('1');
    }
  });

  test('no return when finding user with non-existing ID', async () => {
    const user = await dataAccess.findUserById('3');
    expect(user).not.toBe(expect.anything());
  });

  test('find user by name', async () => {
    expect.assertions(1);
    const user = await dataAccess.findUserByName('name1');
    if (user) {
      expect(user.name).toBe('name1');
    }
  });

  test('no return when finding user with non-existing name', async () => {
    const user = await dataAccess.findUserByName('name3');
    expect(user).not.toBe(expect.anything());
  });

  test('save new user', async () => {
    expect.assertions(1);
    const user = new User('3', 'name3');
    await dataAccess.saveUser(user);
    const createdUser = await dataAccess.findUserById('3');
    if (createdUser) {
      expect(createdUser.id).toBe('3');
    }
  });

  test('overwrite existing user', async () => {
    expect.assertions(1);
    const user = new User('2', 'name22');
    await dataAccess.saveUser(user);
    const createdUser = await dataAccess.findUserById('2');
    if (createdUser) {
      expect(createdUser.name).toBe('name22');
    }
  });

  test('delete user', async () => {
    await dataAccess.deleteUser('2');
    const users = await dataAccess.listAllUsers();
    expect(users.length).toBe(1);
    expect(users[0].id).toBe('1');
  });

  test('throws no error when deleting user with non-existing ID', () => {
    expect.assertions(1);
    expect(dataAccess.deleteUser('3')).resolves.not.toThrowError();
  });
});
