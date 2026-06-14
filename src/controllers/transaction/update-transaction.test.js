import { UpdateTransactionController } from './update-transaction.js';
import { faker } from '@faker-js/faker';

describe('Update Transaction Controller', () => {
  class UpdateTransactionUseCaseStub {
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
    const updateTransactionUseCase = new UpdateTransactionUseCaseStub();
    const sut = new UpdateTransactionController(updateTransactionUseCase);

    return { sut, updateTransactionUseCase };
  };

  const baseHttpRequest = {
    params: { transactionId: faker.string.uuid() },
    body: {
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: 'EXPENSE',
      amount: Number(faker.finance.amount()),
    },
  };

  it('should return 200 when updating a transaction successfully', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(200);
  });

  it('should return 400 when transactionId is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      params: { transactionId: 'invalid-uuid' },
      body: baseHttpRequest.body,
    });

    expect(response.statusCode).toBe(400);
  });
});
