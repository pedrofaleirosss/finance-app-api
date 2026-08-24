import { UpdateTransactionUseCase } from './update-transaction.js';
import { faker } from '@faker-js/faker';

describe('Update Transaction Use Case', () => {
  const transaction = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.anytime().toISOString(),
    type: 'EXPENSE',
    amount: Number(faker.finance.amount()),
  };

  class UpdateTransactionRepositoryStub {
    async execute(transactionId) {
      return {
        id: transactionId,
        ...transaction,
      };
    }
  }

  const makeSut = () => {
    const updateTransactionRepository = new UpdateTransactionRepositoryStub();
    const sut = new UpdateTransactionUseCase(updateTransactionRepository);

    return { sut, updateTransactionRepository };
  };

  it('should update a transaction successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(transaction.id, {
      amount: Number(faker.finance.amount()),
    });

    expect(result).toEqual(transaction);
  });
});
