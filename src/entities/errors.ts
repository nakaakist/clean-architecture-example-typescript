import {
    InvalidInputValidationError, ResourceConflictValidationError
} from 'src/errors/validationErrors';

export class UserNameEmptyValidationError extends InvalidInputValidationError {
  constructor() {
    super('User name cannot be empty');
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UserNameNotUniqueValidationError extends ResourceConflictValidationError {
  constructor(name: string) {
    super(`User name ${name} already exists`);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
