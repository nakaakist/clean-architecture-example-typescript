import { Request } from '../types/request';
import { Response } from '../types/response';

export interface UserController {
  createUser(request: Request): Promise<Response>;
  listAllUsers(request: Request): Promise<Response>;
  findUserById(request: Request): Promise<Response>;
  updateUser(request: Request): Promise<Response>;
  deleteUser(request: Request): Promise<Response>;
}
