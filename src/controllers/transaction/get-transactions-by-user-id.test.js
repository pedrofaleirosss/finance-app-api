import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../errors/user.js';
import { transaction } from '../../tests';

describe('Get Transactions By User Id Controller', () => {
  class GetTransactionsByUserIdUseCaseStub {
    async execute() {
      return [transaction];
    }
  }

  const makeSut = () => {
    const getTransactionsByUserIdUseCase =
      new GetTransactionsByUserIdUseCaseStub();
    const sut = new GetTransactionsByUserIdController(
      getTransactionsByUserIdUseCase,
    );

    return { sut, getTransactionsByUserIdUseCase };
  };

  it('should return 200 when finding transactions by user id successfully', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      query: { userId: faker.string.uuid() },
    });

    expect(response.statusCode).toBe(200);
  });

  it('should return 400 when missing userId in query', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      query: { userId: undefined },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 when userId is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      query: { userId: 'invalid-uuid' },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 404 when GetTransactionsByUserIdUseCase throws UserNotFoundError', async () => {
    const { sut, getTransactionsByUserIdUseCase } = makeSut();
    jest
      .spyOn(getTransactionsByUserIdUseCase, 'execute')
      .mockRejectedValueOnce(new UserNotFoundError());

    const response = await sut.execute({
      query: { userId: faker.string.uuid() },
    });

    expect(response.statusCode).toBe(404);
  });

  it('should return 500 when GetTransactionsByUserIdUseCase throws generic error', async () => {
    const { sut, getTransactionsByUserIdUseCase } = makeSut();
    jest
      .spyOn(getTransactionsByUserIdUseCase, 'execute')
      .mockRejectedValueOnce(new Error());

    const response = await sut.execute({
      query: { userId: faker.string.uuid() },
    });

    expect(response.statusCode).toBe(500);
  });

  it('should call GetTransactionsByUserIdUseCase with correct params', async () => {
    const { sut, getTransactionsByUserIdUseCase } = makeSut();
    const userId = faker.string.uuid();
    const executeSpy = jest.spyOn(getTransactionsByUserIdUseCase, 'execute');

    await sut.execute({
      query: { userId },
    });

    expect(executeSpy).toHaveBeenCalledWith(userId);
  });
});
