import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { UserValidator } from 'src/entities/interfaces/userValidator';

export class UserValidatorImpl implements UserValidator {
  private readonly dataAccess: UserDataAccess;

  constructor(dataAccess: UserDataAccess) {
    this.dataAccess = dataAccess;
  }

  public isNameNotEmpty(name: string): boolean {
    if (name.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  public async isNameUnique(id: string, name: string): Promise<boolean> {
    const user = await this.dataAccess.findUserByName(name);
    if (!user) {
      return true;
    } else if (user.id === id) {
      return true; // user with same name exists, but it is the user to validate here
    } else {
      return false;
    }
  }
}
