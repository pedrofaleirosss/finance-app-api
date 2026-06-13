import { faker } from '@faker-js/faker';
import { DeleteTransactionController } from './delete-transaction.js';

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
});
