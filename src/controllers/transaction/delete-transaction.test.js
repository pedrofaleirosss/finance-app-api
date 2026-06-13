import { faker } from '@faker-js/faker';
import { DeleteTransactionController } from './delete-transaction.js';
import { jest } from '@jest/globals';

describe('Delete Transaction Controller', () => {
  class DeleteTransactionUseCaseStub {
    async execute() {
      return {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
      };
    }
  }

  const makeSut = () => {
    const deleteTransactionUseCase = new DeleteTransactionUseCaseStub();
    const sut = new DeleteTransactionController(deleteTransactionUseCase);

    return { sut, deleteTransactionUseCase };
  };

  it('should return 200 if a transaction is deleted successfully', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      params: { transactionId: faker.string.uuid() },
    });

    expect(response.statusCode).toBe(200);
  });

  it('should return 400 if transactionId is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      params: { transactionId: 'invalid-uuid' },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 404 if transaction is not found', async () => {
    const { sut, deleteTransactionUseCase } = makeSut();
    jest.spyOn(deleteTransactionUseCase, 'execute').mockResolvedValueOnce(null);

    const response = await sut.execute({
      params: { transactionId: faker.string.uuid() },
    });

    expect(response.statusCode).toBe(404);
  });

  it('should return 500 if DeleteTransactionUseCase throws', async () => {
    const { sut, deleteTransactionUseCase } = makeSut();
    jest
      .spyOn(deleteTransactionUseCase, 'execute')
      .mockRejectedValueOnce(new Error());

    const response = await sut.execute({
      params: { transactionId: faker.string.uuid() },
    });

    expect(response.statusCode).toBe(500);
  });
});
