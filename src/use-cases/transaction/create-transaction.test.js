import { CreateTransactionUseCase } from './create-transaction.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

describe('Create Transaction Use Case', () => {
  const createTransactionParams = {
    user_id: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.anytime().toISOString(),
    type: 'EXPENSE',
    amount: Number(faker.finance.amount()),
  };

  const user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 6,
    }),
  };

  class CreateTransactionRepositoryStub {
    async execute(transaction) {
      return transaction;
    }
  }

  class GetUserByIdRepositoryStub {
    async execute(userId) {
      return { ...user, id: userId };
    }
  }

  class IdGeneratorAdapterStub {
    async execute() {
      return 'any_id';
    }
  }

  const makeSut = () => {
    const createTransactionRepository = new CreateTransactionRepositoryStub();
    const idGeneratorAdapter = new IdGeneratorAdapterStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new CreateTransactionUseCase(
      createTransactionRepository,
      getUserByIdRepository,
      idGeneratorAdapter,
    );

    return {
      sut,
      createTransactionRepository,
      getUserByIdRepository,
      idGeneratorAdapter,
    };
  };

  it('should create a transaction successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(createTransactionParams);

    expect(result).toEqual({ ...createTransactionParams, id: 'any_id' });
  });

  it('should call GetUserByIdRepository with correct params', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    const getUserByIdRepositorySpy = jest.spyOn(
      getUserByIdRepository,
      'execute',
    );

    await sut.execute(createTransactionParams);

    expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(
      createTransactionParams.user_id,
    );
  });

  it('should call IdGeneratorAdapter', async () => {
    const { sut, idGeneratorAdapter } = makeSut();
    const idGeneratorAdapterSpy = jest.spyOn(idGeneratorAdapter, 'execute');

    await sut.execute(createTransactionParams);

    expect(idGeneratorAdapterSpy).toHaveBeenCalled();
  });
});
