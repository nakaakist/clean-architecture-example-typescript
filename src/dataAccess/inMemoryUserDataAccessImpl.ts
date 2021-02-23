import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { User } from 'src/entities/user';

export class InMemoryUserDataAccessImpl implements UserDataAccess {
  private users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  public async saveUser(user: User): Promise<void> {
    await this.wait();

    // before saving, delete existing user with same ID
    this.users = this.users.filter((u) => u.id !== user.id);
    this.users.push(user);
  }

  public async listAllUsers(): Promise<User[]> {
    await this.wait();

    // to prevent contamination of in-memory data after returning users,
    // return cloned users (same for other methods).
    return this.users.map((u) => new User(u.id, u.name));
  }

  public async findUserById(id: string): Promise<User | void> {
    await this.wait();

    const user = this.users.find((u) => u.id === id);
    if (user) {
      return new User(user.id, user.name);
    }
  }

  public async findUserByName(name: string): Promise<User | void> {
    await this.wait();

    const user = this.users.find((u) => u.name === name);
    if (user) {
      return new User(user.id, user.name);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    await this.wait();

    this.users = this.users.filter((u) => u.id !== id);
  }

  // wait for some time to emulate actual DB
  private async wait(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
