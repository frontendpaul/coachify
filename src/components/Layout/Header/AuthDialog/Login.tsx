import { useEffect, useState } from 'react';
import Button from '@components/ui/Button';
import { FiX } from 'react-icons/fi';
import InputWithLabel from '@components/ui/Inputs/InputWithLabel';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { BiLoaderAlt } from 'react-icons/bi';
import * as Dialog from '@radix-ui/react-dialog';
import DialogContent from '@components/ui/Dialog/DialogContent';
import { atom, useAtom } from 'jotai';
import Footer from './Footer';
import { isSignupDialogOpenAtom } from './Signup';

export const isLoginDialogOpenAtom = atom<boolean>(false);

// TODO: handle auth errors and form validation
const Login = () => {
  const supabaseClient = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useAtom(
    isLoginDialogOpenAtom
  );
  const [_, setIsSignupDialogOpen] = useAtom(isSignupDialogOpenAtom);

  const logInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
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
    if (user) setIsLoginDialogOpen(false);
  }, [user, setIsLoginDialogOpen]);

  return (
    <Dialog.Root open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
      <Dialog.Trigger asChild>
        <Button fill="ghost" className="hidden lg:flex">
          Log In
        </Button>
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
              Welcome back!
            </Dialog.Title>
            <Dialog.Description className="text-coachify-gray-200">
              Please enter your credentials to log in.
            </Dialog.Description>

            {/* Form */}
            <LogInForm logInWithEmail={logInWithEmail} isLoading={isLoading} />

            {/* Intent changing links */}
            <div className="grid gap-2">
              <p className="text-sm text-white/75">
                Don&apos;t have an account yet?{' '}
                <button
                  className="transition-200-out-quart text-coachify-teal-500 underline hover:text-coachify-teal-400"
                  onClick={() => {
                    setIsSignupDialogOpen(true);
                    setIsLoginDialogOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </p>

              <Footer />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog.Root>
  );
};

const LogInForm = ({
  isLoading,
  logInWithEmail,
}: {
  isLoading: boolean;
  logInWithEmail: any;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form id="login" className="grid gap-3" onSubmit={() => {}}>
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
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        className="mt-1"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          logInWithEmail(email, password);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <BiLoaderAlt className="-m-1 h-6 w-6 animate-spin" />
        ) : (
          'Log In'
        )}
      </Button>
      <button
        className="transition-200-out-quart mr-auto text-sm text-coachify-teal-500 underline hover:text-coachify-teal-400"
        onClick={() => {}}
      >
        Restore password
      </button>
    </form>
  );
};

export default Login;
