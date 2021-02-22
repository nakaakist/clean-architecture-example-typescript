import { ErrorResponse, Response } from './response';

export type CreateUserResponse =
  | (Response & {
      body: {
        id: string;
      };
    })
  | ErrorResponse;
