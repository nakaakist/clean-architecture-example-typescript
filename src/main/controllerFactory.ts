import { UserController } from 'src/controllers/interfaces/userController';
import { UserControllerImpl } from 'src/controllers/userControllerImpl';
import { InMemoryUserDataAccessImpl } from 'src/dataAccess/inMemoryUserDataAccessImpl';
import { User } from 'src/entities/user';
import { UserValidatorImpl } from 'src/entityValidators/userValidatorImpl';
import { UserInteractorImpl } from 'src/interactors/userInteractorImpl';

export class ControllerFactory {
  public makeInMemoryUserController(initialUsers: User[]): UserController {
    const dataAccess = new InMemoryUserDataAccessImpl(initialUsers);
    const validator = new UserValidatorImpl(dataAccess);
    const interactor = new UserInteractorImpl(dataAccess, validator);
    const controller = new UserControllerImpl(interactor);
    return controller;
  }
}
