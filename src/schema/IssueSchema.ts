import { z } from 'zod';

export const IssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Please provide a valid title')
    .regex(/^\S.*$/, { message: 'Please provide a valid title' }),
  description: z
    .string()
    .min(1, 'Please provide a valid description')
    .regex(/^\S.*$/, { message: 'Please provide a valid description' }),
  status: z
    .string()
    .min(1, 'Please provide a valid status')
    .regex(/^\S.*$/, { message: 'Please provide a valid status' }),
  priority: z
    .string()
    .min(1, 'Please provide a valid priority')
    .regex(/^\S.*$/, { message: 'Please provide a valid priority' }),
  startDate: z
    .string()
    .date()
    .min(1, 'Please provide a valid startDate')
    .regex(/^\S.*$/, { message: 'Please provide a valid startDate' }),
  dueDate: z
    .string()
    .date()
    .min(1, 'Please provide a valid dueDate')
    .regex(/^\S.*$/, { message: 'Please provide a valid dueDate' }),
});
