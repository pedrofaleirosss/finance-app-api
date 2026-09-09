import { CreateTransactionController } from '../../controllers';
import { makeCreateTransactionController } from './transaction';

describe('Transaction Controller Factories', () => {
  it('should create a valid CreateTransactionController instance', () => {
    expect(makeCreateTransactionController()).toBeInstanceOf(
      CreateTransactionController,
    );
  });
});
