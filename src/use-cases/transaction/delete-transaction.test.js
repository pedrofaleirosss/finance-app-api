import { DeleteTransactionUseCase } from './delete-transaction.js';
import { faker } from '@faker-js/faker';

describe('Delete Transaction Use Case', () => {
  const transaction = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.anytime().toISOString(),
    type: 'EXPENSE',
    amount: Number(faker.finance.amount()),
  };

  class DeleteTransactionRepositoryStub {
    async execute(transactionId) {
      return {
        ...transaction,
        id: transactionId,
      };
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

    expect(result).toEqual({ ...transaction, id });
  });
});
