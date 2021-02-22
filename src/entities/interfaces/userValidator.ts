export interface UserValidator {
  isNameNotEmpty(name: string): boolean;
  isNameUnique(name: string): Promise<boolean>;
}
