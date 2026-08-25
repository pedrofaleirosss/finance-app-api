import { DeleteTransactionUseCase } from './delete-transaction.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import { transaction } from '../../tests';

describe('Delete Transaction Use Case', () => {
  class DeleteTransactionRepositoryStub {
    async execute() {
      return transaction;
    }
  }

  const makeSut = () => {
    const deleteTransactionRepository = new DeleteTransactionRepositoryStub();
    const sut = new DeleteTransactionUseCase(deleteTransactionRepository);

    return { sut, deleteTransactionRepository };
  };

  it('should delete a transaction successfully', async () => {
    const { sut } = makeSut();
    const id = faker.string.uuid();

    const result = await sut.execute(id);

    expect(result).toEqual(transaction);
  });

  it('should call DeleteTransactionRepository with correct params', async () => {
    const { sut, deleteTransactionRepository } = makeSut();
    const deleteTransactionRepositorySpy = jest.spyOn(
      deleteTransactionRepository,
      'execute',
    );
    const id = faker.string.uuid();

    await sut.execute(id);

    expect(deleteTransactionRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should throw if DeleteTransactionRepository throws', async () => {
    const { sut, deleteTransactionRepository } = makeSut();
    jest
      .spyOn(deleteTransactionRepository, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = sut.execute(faker.string.uuid());

    await expect(promise).rejects.toThrow();
  });
});
