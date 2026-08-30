import { prisma } from '../../../../prisma/prisma.js';
import { user as fakeUser } from '../../../tests/index.js';
import { PostgresGetUserBalanceRepository } from './get-user-balance.js';
import { faker } from '@faker-js/faker';

describe('Postgres Get User Balance Repository', () => {
  it('should get user balance on db successfully', async () => {
    const user = await prisma.user.create({ data: fakeUser });

    await prisma.transaction.createMany({
      data: [
        {
          name: faker.string.sample(),
          amount: 5000,
          date: faker.date.recent(),
          type: 'EARNING',
          user_id: user.id,
        },
        {
          name: faker.string.sample(),
          amount: 5000,
          date: faker.date.recent(),
          type: 'EARNING',
          user_id: user.id,
        },
        {
          name: faker.string.sample(),
          amount: 1000,
          date: faker.date.recent(),
          type: 'EXPENSE',
          user_id: user.id,
        },
        {
          name: faker.string.sample(),
          amount: 1000,
          date: faker.date.recent(),
          type: 'EXPENSE',
          user_id: user.id,
        },
        {
          name: faker.string.sample(),
          amount: 3000,
          date: faker.date.recent(),
          type: 'INVESTMENT',
          user_id: user.id,
        },
        {
          name: faker.string.sample(),
          amount: 3000,
          date: faker.date.recent(),
          type: 'INVESTMENT',
          user_id: user.id,
        },
      ],
    });

    const sut = new PostgresGetUserBalanceRepository();

    const result = await sut.execute(user.id);

    expect(result.earnings.toString()).toBe('10000');
    expect(result.expenses.toString()).toBe('2000');
    expect(result.investments.toString()).toBe('6000');
    expect(result.balance.toString()).toBe('2000');
  });
});
