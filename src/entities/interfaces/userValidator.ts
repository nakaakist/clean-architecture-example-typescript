export interface UserValidator {
  isNameNotEmpty(name: string): boolean;
  isNameUnique(id: string, name: string): Promise<boolean>;
}
