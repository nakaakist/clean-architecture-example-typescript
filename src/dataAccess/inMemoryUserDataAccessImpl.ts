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
    return this.users;
  }

  public async findUserById(id: string): Promise<User | void> {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  public async findUserByName(name: string): Promise<User | void> {
    const user = this.users.find((u) => u.name === name);
    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
