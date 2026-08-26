import { CreateTransactionUseCase } from './create-transaction.js';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../errors/user.js';
import { transaction, user } from '../../tests';

describe('Create Transaction Use Case', () => {
  const createTransactionParams = {
    ...transaction,
    id: undefined,
  };

  class CreateTransactionRepositoryStub {
    async execute() {
      return transaction;
    }
  }

  class GetUserByIdRepositoryStub {
    async execute() {
      return user;
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

    expect(result).toEqual(transaction);
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

  it('should call CreateTransactionRepository with correct params', async () => {
    const { sut, createTransactionRepository } = makeSut();
    const createTransactionRepositorySpy = jest.spyOn(
      createTransactionRepository,
      'execute',
    );

    await sut.execute(createTransactionParams);

    expect(createTransactionRepositorySpy).toHaveBeenCalledWith({
      ...createTransactionParams,
      id: 'any_id',
    });
  });

  it('should throw UserNotFoundError if user does not exist', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(null);

    const promise = sut.execute(createTransactionParams);

    await expect(promise).rejects.toThrow(
      new UserNotFoundError(createTransactionParams.user_id),
    );
  });

  it('should throw if GetUserByIdRepository throws', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    jest
      .spyOn(getUserByIdRepository, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = sut.execute(createTransactionParams);

    await expect(promise).rejects.toThrow();
  });

  it('should throw if IdGeneratorAdapter throws', async () => {
    const { sut, idGeneratorAdapter } = makeSut();
    jest
      .spyOn(idGeneratorAdapter, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = sut.execute(createTransactionParams);

    await expect(promise).rejects.toThrow();
  });

  it('should throw if CreateTransactionRepository throws', async () => {
    const { sut, createTransactionRepository } = makeSut();
    jest
      .spyOn(createTransactionRepository, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = sut.execute(createTransactionParams);

    await expect(promise).rejects.toThrow();
  });
});
