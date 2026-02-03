import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

const resetSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

type ResetValues = z.infer<typeof resetSchema>;

const ResetPassword: React.FC = () => {
  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ResetValues) => {
    await sendPasswordResetEmail(auth, values.email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <Card className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold font-display">Reset password</h1>
          <p className="text-sm text-muted">We will email you a secure reset link.</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
          />
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
