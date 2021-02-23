import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { User } from 'src/entities/user';

export class InMemoryUserDataAccessImpl implements UserDataAccess {
  private users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  public async saveUser(user: User): Promise<void> {
    // before saving, delete existing user with same ID
    this.users = this.users.filter((u) => u.id !== user.id);
    this.users.push(user);
  }

  public async listAllUsers(): Promise<User[]> {
    // to prevent contamination of in-memory data after returning users,
    // return cloned users (same for other methods).
    return this.users.map((u) => new User(u.id, u.name));
  }

  public async findUserById(id: string): Promise<User | void> {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      return new User(user.id, user.name);
    }
  }

  public async findUserByName(name: string): Promise<User | void> {
    const user = this.users.find((u) => u.name === name);
    if (user) {
      return new User(user.id, user.name);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
