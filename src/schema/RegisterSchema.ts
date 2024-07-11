import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, 'Please provide a valid name')
    .regex(/^\S.*$/, { message: 'Please provide a valid name' }),
  email: z
    .string()
    .email()
    .min(6, 'Please provide a valid email')
    .regex(/^\S.*$/, { message: 'Please provide a valid email' }),
  password: z
    .string()
    .min(6, 'Please provide a valid password')
    .regex(/^\S.*$/, { message: 'Please provide a valid password' }),
  company: z
    .string()
    .min(6, 'Please provide a valid company')
    .regex(/^\S.*$/, { message: 'Please provide a valid company' }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .min(6, 'Please provide a valid email')
    .regex(/^\S.*$/, { message: 'Please provide a valid email' }),
  password: z
    .string()
    .min(6, 'Please provide a valid password')
    .regex(/^\S.*$/, { message: 'Please provide a valid password' }),
});
