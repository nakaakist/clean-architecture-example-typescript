import { NotFoundValidationError } from 'src/errors/validationErrors';

export class UserWithIdNotFoundValidationError extends NotFoundValidationError {
  constructor(id: string) {
    super(`User with ID ${id} not found`);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UserWithNameNotFoundValidationError extends NotFoundValidationError {
  constructor(name: string) {
    super(`User with name ${name} not found`);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
