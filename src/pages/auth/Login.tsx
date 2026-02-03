import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginValues) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    const destination = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/';
    navigate(destination);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <Card className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold font-display">Welcome back</h1>
          <p className="text-sm text-muted">Log in to manage your volunteer journey.</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...form.register('email')} error={form.formState.errors.email?.message} />
          <Input
            label="Password"
            type="password"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 flex justify-between text-xs text-muted">
          <Link to="/reset-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
