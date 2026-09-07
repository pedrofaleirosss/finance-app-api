import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../../../../prisma/prisma.js';
import { user } from '../../../tests/index.js';
import { PostgresDeleteUserRepository } from './delete-user.js';
import { jest } from '@jest/globals';
import { UserNotFoundError } from '../../../errors/user.js';

describe('Postgres Delete User Repository', () => {
  it('should delete a user on db successfully', async () => {
    await prisma.user.create({
      data: user,
    });

    const sut = new PostgresDeleteUserRepository();

    const result = await sut.execute(user.id);

    expect(result).toStrictEqual(user);
  });

  it('should call Prisma with correct params', async () => {
    await prisma.user.create({ data: user });
    const sut = new PostgresDeleteUserRepository();
    const prismaSpy = jest.spyOn(prisma.user, 'delete');

    await sut.execute(user.id);

    expect(prismaSpy).toHaveBeenCalledWith({ where: { id: user.id } });
  });

  it('should throw generic error if Prisma throws generic error', async () => {
    const sut = new PostgresDeleteUserRepository();
    jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(new Error());

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundError if user is not found', async () => {
    const sut = new PostgresDeleteUserRepository();
    jest
      .spyOn(prisma.user, 'delete')
      .mockRejectedValueOnce(
        new PrismaClientKnownRequestError('', { code: 'P2025' }),
      );

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow(new UserNotFoundError(user.id));
  });
});
