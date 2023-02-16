import { useEffect, useState } from 'react';
import Button from '@components/ui/Button';
import { FiX } from 'react-icons/fi';
import InputWithLabel from '@components/ui/InputWithLabel';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { BiLoaderAlt } from 'react-icons/bi';
import * as Dialog from '@radix-ui/react-dialog';
import DialogContent from '@components/ui/Dialog/DialogContent';
import { atom, useAtom } from 'jotai';
import Footer from './Footer';
import { isLoginDialogOpenAtom } from './Login';

export const isSignupDialogOpenAtom = atom<boolean>(false);

// TODO: handle auth errors and form validation
const Signup = () => {
  const supabaseClient = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useAtom(
    isSignupDialogOpenAtom
  );
  const [_, setIsLoginDialogOpen] = useAtom(isLoginDialogOpenAtom);

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
    role: 'student' | 'creator'
  ) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            role: role,
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const user = useUser();
  useEffect(() => {
    if (user) setIsSignupDialogOpen(false);
  }, [user, setIsSignupDialogOpen]);

  return (
    <Dialog.Root open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className="hidden lg:flex">Sign Up</Button>
      </Dialog.Trigger>
      <DialogContent>
        <div className="transition-200-out-quart relative w-[min(90vw,24rem)] overflow-hidden rounded-lg bg-coachify-teal-1100 p-4 text-white shadow-xl sm:my-8 sm:p-6">
          <Dialog.Close asChild>
            <Button
              fill="ghost"
              icon="icon-only"
              className="absolute top-2 right-2 sm:top-4 sm:right-4"
              aria-label="Close"
            >
              <FiX />
            </Button>
          </Dialog.Close>
          <div className="grid gap-6">
            <Dialog.Title className="text-xl font-medium">
              We’re glad you’re here!
            </Dialog.Title>
            <Dialog.Description className="text-coachify-gray-200">
              {isCreator
                ? 'Create a free account and start teaching today!'
                : 'Create a free account and start learning today from world-class teachers!'}
            </Dialog.Description>

            {/* Form */}
            <SignUpForm
              isCreator={isCreator}
              signUpWithEmail={signUpWithEmail}
              isLoading={isLoading}
            />

            {/* Intent changing links */}
            <div className="grid gap-2">
              <p className="text-sm text-white/75">
                Aleady have an account?{' '}
                <button
                  className="transition-200-out-quart text-coachify-teal-500 underline hover:text-coachify-teal-400"
                  onClick={() => {
                    setIsLoginDialogOpen(true);
                    setIsSignupDialogOpen(false);
                  }}
                >
                  Log In
                </button>
              </p>
              {!isCreator && (
                <p className="text-sm text-white/75">
                  Are you a teacher?{' '}
                  <button
                    className="transition-200-out-quart text-coachify-teal-500 underline hover:text-coachify-teal-400"
                    onClick={() => setIsCreator(true)}
                  >
                    Register a creator account
                  </button>
                </p>
              )}
              {isCreator && (
                <p className="text-sm text-white/75">
                  Are you a student?{' '}
                  <button
                    className="transition-200-out-quart text-coachify-teal-500 underline hover:text-coachify-teal-400"
                    onClick={() => setIsCreator(false)}
                  >
                    Register a student account
                  </button>
                </p>
              )}

              <Footer />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog.Root>
  );
};

const SignUpForm = ({
  isCreator,
  signUpWithEmail,
  isLoading,
}: {
  isCreator: boolean;
  signUpWithEmail: any;
  isLoading: boolean;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = isCreator ? 'creator' : 'student';

  return (
    <form id="signup" className="grid gap-3">
      <InputWithLabel
        id="Name"
        label="Full name"
        autoComplete="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputWithLabel
        type="email"
        id="email"
        label="Email address"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputWithLabel
        type="password"
        id="password"
        label="Password"
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        className="mt-1"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          signUpWithEmail(email, password, name, role);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <BiLoaderAlt className="-m-1 h-6 w-6 animate-spin" />
        ) : (
          'Create an account'
        )}
      </Button>
    </form>
  );
};

export default Signup;
