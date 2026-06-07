import { DeleteUserController } from './delete-user.js';
import { faker } from '@faker-js/faker';

describe('Delete User Controller', () => {
  class DeleteUserUseCaseStub {
    execute() {
      return {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 6 }),
      };
    }
  }

  const makeSut = () => {
    const deleteUserUseCase = new DeleteUserUseCaseStub();
    const sut = new DeleteUserController(deleteUserUseCase);

    return { sut, deleteUserUseCase };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it('should return 200 if user is deleted successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(200);
  });
});
