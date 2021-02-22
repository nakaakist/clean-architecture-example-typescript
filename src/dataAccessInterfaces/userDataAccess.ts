import { User } from 'src/entities/user';

export interface UserDataAccess {
  saveUser(user: User): Promise<void>;
  listAllUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | void>;
  findUserByName(name: string): Promise<User | void>;
  deleteUser(id: string): Promise<void>;
}
