import { prisma } from '../../../../prisma/prisma.js';
import { PostgresDeleteTransactionRepository } from './delete-transaction.js';
import { transaction, user } from '../../../tests/index.js';
import dayjs from 'dayjs';

describe('Postgres Delete Transaction Repository', () => {
  it('should delete a transaction on db successfully', async () => {
    await prisma.user.create({ data: user });
    await prisma.transaction.create({
      data: { ...transaction, user_id: user.id },
    });
    const sut = new PostgresDeleteTransactionRepository();

    const result = await sut.execute(transaction.id);

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
