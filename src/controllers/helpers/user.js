import { badRequest, notFound } from './http.js';
import validator from 'validator';

export const invalidPasswordResponse = () =>
  badRequest({
    message: 'Password must be at least 6 characters long.',
  });

export const invalidEmailResponse = () =>
  badRequest({ message: 'Invalid e-mail format.' });

export const userNotFoundResponse = () =>
  notFound({ message: 'User not found.' });

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfPasswordIsValid = (password) => password.length >= 6;
