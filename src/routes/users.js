import { Router } from 'express';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from '../factories/controllers/user.js';

export const usersRouter = Router();

usersRouter.get('/:userId', async (request, response) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(request);

  return response.status(statusCode).send(body);
});

usersRouter.get('/:userId/balance', async (request, response) => {
  const getUserBalanceController = makeGetUserBalanceController();

  const { statusCode, body } = await getUserBalanceController.execute(request);

  return response.status(statusCode).send(body);
});

usersRouter.post('/', async (request, response) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(request);

  return response.status(statusCode).send(body);
});

usersRouter.patch('/:userId', async (request, response) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(request);

  return response.status(statusCode).send(body);
});

usersRouter.delete('/:userId', async (request, response) => {
  const deleteUserController = makeDeleteUserController();

  const { statusCode, body } = await deleteUserController.execute(request);

  return response.status(statusCode).send(body);
});
