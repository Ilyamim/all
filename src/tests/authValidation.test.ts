import { describe, expect, it } from 'vitest';
import { registerStepOneSchema, registerStepTwoSchema } from '../pages/auth/Register';
import { loginSchema as loginFormSchema } from '../pages/auth/Login';

describe('auth form validation', () => {
  it('validates login schema', () => {
    const result = loginFormSchema.safeParse({ email: 'user@example.com', password: 'secret12' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid register step one', () => {
    const result = registerStepOneSchema.safeParse({ email: 'bad', password: '1' });
    expect(result.success).toBe(false);
  });

  it('validates register step two', () => {
    const result = registerStepTwoSchema.safeParse({ name: 'Alex', role: 'volunteer' });
    expect(result.success).toBe(true);
  });
});
