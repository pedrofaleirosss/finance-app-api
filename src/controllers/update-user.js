import { UpdateUserUseCase } from '../use-cases/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
  badRequest,
  ok,
  serverError,
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
} from './helpers/index.js';

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const params = httpRequest.body;

      const allowedFields = ['first_name', 'last_name', 'email', 'password'];

      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({ message: 'Some provided field is not allowed.' });
      }

      for (const field of allowedFields) {
        if (params[field].trim().length === 0) {
          return badRequest({
            message: `The field ${field} is blank. Please provide a value.`,
          });
        }
      }

      if (params.email) {
        const emailIsValid = checkIfEmailIsValid(params.email);

        if (!emailIsValid) {
          return invalidEmailResponse();
        }
      }

      if (params.password) {
        const passwordIsValid = checkIfPasswordIsValid(params.password);

        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();

      const updatedUser = await updateUserUseCase.execute(userId, params);

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.error(error);
      return serverError();
    }
  }
}
