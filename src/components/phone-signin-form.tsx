'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const phoneFormSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number with country code.'),
});

const otpFormSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits.'),
});

export default function PhoneSignInForm() {
  const { sendOtp, confirmOtp, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const phoneForm = useForm<{ phone: string }>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phone: '' },
  });

  const otpForm = useForm<{ otp: string }>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: '' },
  });

  const setupRecaptcha = () => {
    // This will be cleaned up by Firebase automatically
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
  };

  async function onPhoneSubmit(data: { phone: string }) {
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const result = await sendOtp(data.phone, appVerifier);
      setConfirmationResult(result);
      setShowOtpForm(true);
      toast({ title: 'OTP sent successfully!' });
    } catch (err: any) {
      toast({
        title: 'Failed to send OTP',
        description: err.message,
        variant: 'destructive',
      });
    }
  }

  async function onOtpSubmit(data: { otp: string }) {
    if (!confirmationResult) {
      toast({ title: 'Something went wrong. Please try again.', variant: 'destructive' });
      return;
    }
    try {
      await confirmOtp(confirmationResult, data.otp);
      toast({ title: 'Login successful!' });
      router.push('/dashboard');
    } catch (err: any) {
      toast({
        title: 'Login Failed',
        description: err.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="space-y-4">
      <div id="recaptcha-container"></div>
      {!showOtpForm ? (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
            <FormField
              control={phoneForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 123 456 7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify OTP & Sign In
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
