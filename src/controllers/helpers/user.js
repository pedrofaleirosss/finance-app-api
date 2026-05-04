import { badRequest } from './http.js';
import validator from 'validator';

export const invalidPasswordResponse = () =>
  badRequest({
    message: 'Password must be at least 6 characters long.',
  });

export const invalidEmailResponse = () =>
  badRequest({ message: 'Invalid e-mail format.' });

export const invalidIdResponse = () =>
  badRequest({ message: 'The provided ID is not valid.' });

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfPasswordIsValid = (password) => password.length >= 6;
