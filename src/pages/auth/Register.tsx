import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { UserProfile } from '../../types/firestore';

export const registerStepOneSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerStepTwoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.enum(['volunteer', 'organizer']),
});

type StepOneValues = z.infer<typeof registerStepOneSchema>;

type StepTwoValues = z.infer<typeof registerStepTwoSchema>;

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState<StepOneValues | null>(null);
  const navigate = useNavigate();

  const stepOneForm = useForm<StepOneValues>({
    resolver: zodResolver(registerStepOneSchema),
    defaultValues: { email: '', password: '' },
  });

  const stepTwoForm = useForm<StepTwoValues>({
    resolver: zodResolver(registerStepTwoSchema),
    defaultValues: { name: '', role: 'volunteer' },
  });

  const handleStepOne = (values: StepOneValues) => {
    setAccount(values);
    setStep(2);
  };

  const handleStepTwo = async (values: StepTwoValues) => {
    if (!account) return;
    const credential = await createUserWithEmailAndPassword(auth, account.email, account.password);
    const profile: UserProfile = {
      uid: credential.user.uid,
      name: values.name,
      email: account.email,
      role: values.role,
      createdAt: new Date().toISOString(),
      totalHours: 0,
      xp: 0,
      badges: [],
    };
    await setDoc(doc(db, 'users', credential.user.uid), profile);
    navigate(values.role === 'organizer' ? '/dashboard/organizer' : '/dashboard/volunteer');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <Card className="w-full max-w-lg">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold font-display">Create your account</h1>
          <p className="text-sm text-muted">Join BrightPath and start making an impact.</p>
        </div>
        {step === 1 ? (
          <form className="mt-6 space-y-4" onSubmit={stepOneForm.handleSubmit(handleStepOne)}>
            <Input
              label="Email"
              type="email"
              {...stepOneForm.register('email')}
              error={stepOneForm.formState.errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              {...stepOneForm.register('password')}
              error={stepOneForm.formState.errors.password?.message}
            />
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={stepTwoForm.handleSubmit(handleStepTwo)}>
            <Input
              label="Full name"
              {...stepTwoForm.register('name')}
              error={stepTwoForm.formState.errors.name?.message}
            />
            <label className="flex flex-col gap-2 text-sm font-medium">
              <span className="text-muted">Role</span>
              <select
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-ink"
                {...stepTwoForm.register('role')}
              >
                <option value="volunteer">Volunteer</option>
                <option value="organizer">Organizer</option>
              </select>
            </label>
            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Create account
              </Button>
            </div>
          </form>
        )}
        <div className="mt-4 text-xs text-muted">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
