import { PostgresCreateUserRepository } from './create-user.js';
import { user } from '../../../tests/index.js';

describe('Create User Repository', () => {
  it('should create a user on db successfully', async () => {
    const sut = new PostgresCreateUserRepository();

    const result = await sut.execute(user);

    expect(result).toBeTruthy();
  });
});
