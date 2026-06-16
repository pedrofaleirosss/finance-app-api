import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from './get-user-balance.js';
import { jest } from '@jest/globals';

describe('Get User Balance Controller', () => {
  class GetUserBalanceUseCaseStub {
    async execute() {
      return {
        earnings: faker.number.int({ min: 0, max: 1000 }),
        expenses: faker.number.int({ min: 0, max: 1000 }),
        investments: faker.number.int({ min: 0, max: 1000 }),
        balance: faker.number.int({ min: -1000, max: 1000 }),
      };
    }
  }

  const makeSut = () => {
    const getUserBalanceUseCase = new GetUserBalanceUseCaseStub();
    const sut = new GetUserBalanceController(getUserBalanceUseCase);

    return { sut, getUserBalanceUseCase };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it('should return 200 when getting user balance successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(200);
  });

  it('should return 400 if userId is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ params: { userId: 'invalid-uuid' } });

    expect(result.statusCode).toBe(400);
  });

  it('should return 500 if GetUserBalanceUseCase throws', async () => {
    const { sut, getUserBalanceUseCase } = makeSut();
    jest
      .spyOn(getUserBalanceUseCase, 'execute')
      .mockRejectedValueOnce(new Error());

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(500);
  });

  it('should call GetUserBalanceUseCase with correct params', async () => {
    const { sut, getUserBalanceUseCase } = makeSut();
    const executeSpy = jest.spyOn(getUserBalanceUseCase, 'execute');

    await sut.execute(httpRequest);

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId);
  });
});
