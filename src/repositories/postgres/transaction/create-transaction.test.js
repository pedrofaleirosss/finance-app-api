import { PostgresCreateTransactionRepository } from './create-transaction.js';
import { transaction, user } from '../../../tests/index.js';
import { prisma } from '../../../../prisma/prisma.js';
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
    expect(result.date.toISOString().slice(0, 10)).toBe(
      new Date(transaction.date).toISOString().slice(0, 10),
    );
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

  it('should throw if Prisma throws', async () => {
    const sut = new PostgresCreateTransactionRepository();
    jest.spyOn(prisma.transaction, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(transaction);

    await expect(promise).rejects.toThrow();
  });
});
