import { faker } from '@faker-js/faker';
import { UpdateUserController } from './update-user.js';
import { jest } from '@jest/globals';
import { EmailAlreadyInUseError } from '../../errors/user.js';

describe('Update User Controller', () => {
  class UpdateUserUseCaseStub {
    async execute(user) {
      return user;
    }
  }

  const makeSut = () => {
    const updateUserUseCase = new UpdateUserUseCaseStub();
    const sut = new UpdateUserController(updateUserUseCase);

    return { sut, updateUserUseCase };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
    body: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    },
  };

  it('should return 200 if user is updated successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(200);
  });

  it('should return 400 if an invalid email is provided', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        email: 'invalid-email',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if the provided password is less than 6 characters', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        password: '12345',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if an invalid userId is provided', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: {
        userId: 'invalid-uuid',
      },
      body: httpRequest.body,
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if an unallowed field is provided', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        unallowed_field: 'some value',
      },
    });

    expect(result.statusCode).toBe(400);
  });

  it('should return 500 if UpdateUserUseCase throws a generic error', async () => {
    const { sut, updateUserUseCase } = makeSut();
    jest.spyOn(updateUserUseCase, 'execute').mockRejectedValueOnce(new Error());

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(500);
  });

  it('should return 400 if UpdateUserUseCase throws EmailAlreadyInUseError', async () => {
    const { sut, updateUserUseCase } = makeSut();
    jest
      .spyOn(updateUserUseCase, 'execute')
      .mockRejectedValueOnce(
        new EmailAlreadyInUseError(faker.internet.email()),
      );

    const result = await sut.execute(httpRequest);

    expect(result.statusCode).toBe(400);
  });

  it('should call UpdateUserUseCase with correct params', async () => {
    const { sut, updateUserUseCase } = makeSut();
    const executeSpy = jest.spyOn(updateUserUseCase, 'execute');

    await sut.execute(httpRequest);

    expect(executeSpy).toHaveBeenCalledWith(
      httpRequest.params.userId,
      httpRequest.body,
    );
  });
});
