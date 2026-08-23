import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id.js';
import { faker } from '@faker-js/faker';

describe('Get Transactions By User Id Use Case', () => {
  const user = {
    id: faker.string.uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 6,
    }),
  };

  class GetTransactionsByUserIdRepositoryStub {
    async execute() {
      return [];
    }
  }

  class GetUserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getTransactionsByUserIdRepository =
      new GetTransactionsByUserIdRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new GetTransactionsByUserIdUseCase(
      getTransactionsByUserIdRepository,
      getUserByIdRepository,
    );

    return { sut, getTransactionsByUserIdRepository, getUserByIdRepository };
  };

  it('should get transactions by user id successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(faker.string.uuid());

    expect(result).toEqual([]);
  });
});
