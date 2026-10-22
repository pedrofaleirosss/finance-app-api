import { LoginUserController } from './login-user';
import { user } from '../../tests/index.js';
import { InvalidPasswordError, UserNotFoundError } from '../../errors/user.js';
import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

describe('Login User Controller', () => {
  class LoginUserUseCaseStub {
    async execute() {
      return {
        ...user,
        tokens: {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      };
    }
  }

  const makeSut = () => {
    const loginUserUseCase = new LoginUserUseCaseStub();

    const sut = new LoginUserController(loginUserUseCase);

    return { sut, loginUserUseCase };
  };

  const httpRequest = {
    body: {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    },
  };

  it('should return 200 with user and tokens', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.tokens.accessToken).toBe('access-token');
    expect(response.body.tokens.refreshToken).toBe('refresh-token');
  });

  it('should return 404 if user is not found', async () => {
    const { sut, loginUserUseCase } = makeSut();
    jest
      .spyOn(loginUserUseCase, 'execute')
      .mockRejectedValueOnce(new UserNotFoundError());

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(404);
  });

  it('should return 401 if password is invalid', async () => {
    const { sut, loginUserUseCase } = makeSut();
    jest
      .spyOn(loginUserUseCase, 'execute')
      .mockRejectedValueOnce(new InvalidPasswordError());

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(401);
  });

  it('should return 400 if email is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        email: 'invalid-email',
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if password is less than 6 characters', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        password: '12345',
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
