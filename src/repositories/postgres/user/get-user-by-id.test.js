import { prisma } from '../../../../prisma/prisma.js';
import { user as fakeUser } from '../../../tests/index.js';
import { PostgresGetUserByIdRepository } from './get-user-by-id.js';

describe('Postgres Get User By Id Repository', () => {
  it('should get user by id on db successfully', async () => {
    const user = await prisma.user.create({ data: fakeUser });

    const sut = new PostgresGetUserByIdRepository();

    const result = await sut.execute(user.id);

    expect(result).toStrictEqual(user);
  });
});
