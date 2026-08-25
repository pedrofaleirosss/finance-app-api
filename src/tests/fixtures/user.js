import { faker } from '@faker-js/faker';

export const user = {
  id: faker.string.uuid(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password({
    length: 6,
  }),
};
