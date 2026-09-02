import { PostgresCreateTransactionRepository } from './create-transaction.js';
import { transaction, user as fakeUser } from '../../../tests/index.js';
import { prisma } from '../../../../prisma/prisma.js';
import dayjs from 'dayjs';

describe('Postgres Create Transaction Repository', () => {
  it('should create a transaction successfully', async () => {
    const user = await prisma.user.create({ data: fakeUser });
    const sut = new PostgresCreateTransactionRepository();

    const result = await sut.execute({ ...transaction, user_id: user.id });

    expect(result.name).toBe(transaction.name);
    expect(result.type).toBe(transaction.type);
    expect(result.user_id).toBe(user.id);
    expect(result.amount.toString()).toBe(transaction.amount.toString());
    expect(dayjs(result.date).daysInMonth()).toBe(
      dayjs(transaction.date).daysInMonth(),
    );
    expect(dayjs(result.date).month()).toBe(dayjs(transaction.date).month());
    expect(dayjs(result.date).year()).toBe(dayjs(transaction.date).year());
  });
});
