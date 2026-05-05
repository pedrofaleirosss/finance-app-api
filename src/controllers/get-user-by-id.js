import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
  notFound,
  ok,
  serverError,
  checkIfIdIsValid,
  invalidIdResponse,
} from './helpers/index.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

      if (!user) {
        return notFound({ message: 'User not found' });
      }

      return ok(user);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return serverError();
    }
  }
}
