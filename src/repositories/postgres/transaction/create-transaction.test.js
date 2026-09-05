import { PostgresCreateTransactionRepository } from './create-transaction.js';
import { transaction, user } from '../../../tests/index.js';
import { prisma } from '../../../../prisma/prisma.js';
import dayjs from 'dayjs';
import { jest } from '@jest/globals';

describe('Postgres Create Transaction Repository', () => {
  it('should create a transaction successfully', async () => {
    await prisma.user.create({ data: user });
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

  it('should call Prisma with correct params', async () => {
    await prisma.user.create({ data: user });
    const sut = new PostgresCreateTransactionRepository();
    const prismaSpy = jest.spyOn(prisma.transaction, 'create');

    await sut.execute({ ...transaction, user_id: user.id });

    expect(prismaSpy).toHaveBeenCalledWith({
      data: { ...transaction, user_id: user.id },
    });
  });
});
