import { ValidationError } from 'src/errors/validationErrors';
import { Result } from 'src/result';

import { EntityValidator } from './entityValidator';

export interface Entity {
  validate(validator: EntityValidator): Promise<Result<null, ValidationError>>;
}
