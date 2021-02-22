import { InvalidInputValidationError } from 'src/errors/validationErrors';

export class InvalidInputFormatValidationError extends InvalidInputValidationError {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
