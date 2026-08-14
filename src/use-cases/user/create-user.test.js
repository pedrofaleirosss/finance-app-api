import { EmailAlreadyInUseError } from '../../errors/user.js';
import { CreateUserUseCase } from './create-user.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

describe('Create User Use Case', () => {
  class GetUserByEmailRepositoryStub {
    async execute() {
      return null;
    }
  }

  class CreateUserRepositoryStub {
    async execute(user) {
      return user;
    }
  }

  class PasswordHasherAdapterStub {
    async execute() {
      return 'hashed_password';
    }
  }

  class IdGeneratorAdapterStub {
    async execute() {
      return 'generated_id';
    }
  }

  const user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 6,
    }),
  };

  const makeSut = () => {
    const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
    const createUserRepository = new CreateUserRepositoryStub();
    const passwordHasherAdapter = new PasswordHasherAdapterStub();
    const idGeneratorAdapter = new IdGeneratorAdapterStub();

    const sut = new CreateUserUseCase(
      getUserByEmailRepository,
      createUserRepository,
      passwordHasherAdapter,
      idGeneratorAdapter,
    );

    return {
      sut,
      getUserByEmailRepository,
      createUserRepository,
      passwordHasherAdapter,
      idGeneratorAdapter,
    };
  };

  it('should create a user successfully', async () => {
    const { sut } = makeSut();

    const createdUser = await sut.execute(user);

    expect(createdUser).toBeTruthy();
  });

  it('should throw an EmailAlreadyInUseError if GetUserByEmailRepository returns a user', async () => {
    const { sut, getUserByEmailRepository } = makeSut();
    jest.spyOn(getUserByEmailRepository, 'execute').mockReturnValueOnce(user);

    const promise = sut.execute(user);

    await expect(promise).rejects.toThrow(
      new EmailAlreadyInUseError(user.email),
    );
  });

  it('should call IdGeneratorAdapter to generate a random id', async () => {
    const { sut, idGeneratorAdapter, createUserRepository } = makeSut();
    const idGeneratorSpy = jest.spyOn(idGeneratorAdapter, 'execute');
    const createUserRepositorySpy = jest.spyOn(createUserRepository, 'execute');

    await sut.execute(user);

    expect(idGeneratorSpy).toHaveBeenCalled();
    expect(createUserRepositorySpy).toHaveBeenCalledWith({
      ...user,
      id: 'generated_id',
      password: 'hashed_password',
    });
  });
});
