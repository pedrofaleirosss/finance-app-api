import { DeleteUserController } from './delete-user.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { user } from '../../tests';

describe('Delete User Controller', () => {
  class DeleteUserUseCaseStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const deleteUserUseCase = new DeleteUserUseCaseStub();
    const sut = new DeleteUserController(deleteUserUseCase);

    return { sut, deleteUserUseCase };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it('should return 200 if user is deleted successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(200);
  });

  it('should return 400 if userId is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ params: { userId: 'invalid-uuid' } });

    expect(result.statusCode).toBe(400);
  });

  it('should return 404 if user is not found', async () => {
    const { sut, deleteUserUseCase } = makeSut();
    jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValueOnce(null);

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(404);
  });

  it('should return 500 if DeleteUserUseCase throws', async () => {
    const { sut, deleteUserUseCase } = makeSut();
    jest.spyOn(deleteUserUseCase, 'execute').mockRejectedValueOnce(new Error());

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(500);
  });

  it('should call DeleteUserUseCase with correct params', async () => {
    const { sut, deleteUserUseCase } = makeSut();
    const executeSpy = jest.spyOn(deleteUserUseCase, 'execute');

    await sut.execute(httpRequest);

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId);
  });
});
