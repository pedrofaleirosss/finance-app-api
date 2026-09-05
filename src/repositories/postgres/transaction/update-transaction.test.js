import { faker } from '@faker-js/faker';
import { prisma } from '../../../../prisma/prisma.js';
import { transaction, user } from '../../../tests/index.js';
import { PostgresUpdateTransactionRepository } from './update-transaction.js';
import { TransactionType } from '@prisma/client';
import dayjs from 'dayjs';

describe('Postgres Update Transaction Repository', () => {
  it('should update a transaction on db successfully', async () => {
    await prisma.user.create({ data: user });
    await prisma.transaction.create({
      data: { ...transaction, user_id: user.id },
    });
    const params = {
      id: faker.string.uuid(),
      user_id: user.id,
      name: faker.commerce.productName(),
      date: faker.date.anytime().toISOString(),
      type: TransactionType.EARNING,
      amount: Number(faker.finance.amount()),
    };
    const sut = new PostgresUpdateTransactionRepository();

    const result = await sut.execute(transaction.id, params);

    expect(result.id).toBe(params.id);
    expect(result.name).toBe(params.name);
    expect(result.type).toBe(params.type);
    expect(result.user_id).toBe(params.user_id);
    expect(result.amount.toString()).toBe(params.amount.toString());
    expect(dayjs(result.date).daysInMonth()).toBe(
      dayjs(params.date).daysInMonth(),
    );
    expect(dayjs(result.date).month()).toBe(dayjs(params.date).month());
    expect(dayjs(result.date).year()).toBe(dayjs(params.date).year());
  });
});
