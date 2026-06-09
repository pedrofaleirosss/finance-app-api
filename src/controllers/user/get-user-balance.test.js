import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from './get-user-balance.js';

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

  it('should return 400 when userId is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ params: { userId: 'invalid-uuid' } });

    expect(result.statusCode).toBe(400);
  });
});
