import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
  badRequest({ message: 'The provided ID is not valid.' });

export const requiredFieldIsMissingResponse = (field) => {
  return badRequest({
    message: `The field ${field} is required.`,
  });
};
