'use server';

/**
 * @fileOverview Sends a welcome email to a new user.
 *
 * This flow is designed to be triggered when a new user signs up.
 * It uses a simple prompt to generate a personalized welcome email.
 *
 * - sendWelcomeEmail: The main function to trigger the email sending process.
 * - WelcomeEmailInput: The Zod schema for the input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// In a real application, you would use a service to send emails.
// For this example, we'll just log the email content to the console.
const emailService = {
  send: async (to: string, subject: string, body: string) => {
    console.log('--- Sending Email ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('Body:');
    console.log(body);
    console.log('--- Email Sent ---');
    return Promise.resolve();
  },
};


const WelcomeEmailInputSchema = z.object({
  email: z.string().email().describe('The email address of the new user.'),
  displayName: z.string().describe('The display name of the new user.'),
});
export type WelcomeEmailInput = z.infer<typeof WelcomeEmailInputSchema>;


const welcomeEmailPrompt = ai.definePrompt({
    name: 'welcomeEmailPrompt',
    input: { schema: WelcomeEmailInputSchema },
    prompt: `
        You are the friendly voice of DishaDesk, an AI-powered career navigator.
        A new user named {{{displayName}}} has just signed up.
        Write a brief, warm, and welcoming email to them.
        
        The email should:
        1. Greet them by their display name.
        2. Briefly introduce DishaDesk and its purpose (helping them find their dream career).
        3. Encourage them to start by filling out their profile on the dashboard.
        4. Maintain a positive and encouraging tone.

        Sign off as "The DishaDesk Team".
    `,
});


const sendWelcomeEmailFlow = ai.defineFlow(
  {
    name: 'sendWelcomeEmailFlow',
    inputSchema: WelcomeEmailInputSchema,
  },
  async (input) => {
    const { output: emailBody } = await welcomeEmailPrompt(input);

    if(!emailBody) {
        throw new Error("Could not generate welcome email body.");
    }
    
    await emailService.send(
      input.email,
      `Welcome to DishaDesk, ${input.displayName}!`,
      emailBody
    );
  }
);


export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<void> {
    await sendWelcomeEmailFlow(input);
}
