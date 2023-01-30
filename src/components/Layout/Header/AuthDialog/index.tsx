import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '@components/ui/Button';
import { FiMail, FiX } from 'react-icons/fi';
import { BsApple, BsGoogle } from 'react-icons/bs';
import Link from 'next/link';
import clsx from 'clsx';
import InputWithLabel from '@components/ui/InputWithLabel';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

type AuthDialogProps = {
  open: boolean;
  setIsOpen: any;
  intent: AuthIntent;
  setAuthIntent: any;
};

export type AuthIntent = 'login' | 'signup' | 'creator-signup';

// TODO: handle auth errors and form validation
const AuthDialog = ({
  open,
  setIsOpen,
  intent = 'signup',
  setAuthIntent,
}: AuthDialogProps) => {
  const supabaseClient = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
    isCreator: boolean
  ) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            isCreator: isCreator,
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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-coachify-teal-1300/75 backdrop-brightness-[.5]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-coachify-teal-1100 shadow-xl text-white transition-200-out-quart sm:my-8 w-full max-w-sm p-4 sm:p-6">
                <Button
                  fill="ghost"
                  icon="icon-only"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4"
                  aria-label="close-dialog-button"
                >
                  <FiX />
                </Button>
                {/* Title */}
                <div className="grid gap-6">
                  <div>
                    <Dialog.Title as="h3" className="text-xl font-medium">
                      {intent === 'signup' && 'We’re glad you’re here!'}
                      {intent === 'creator-signup' && 'We’re glad you’re here!'}
                      {intent === 'login' && 'Welcome back!'}
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-white/75">
                      {intent === 'signup' &&
                        'Create a free account and start learning today from world-class teachers!'}
                      {intent === 'creator-signup' &&
                        'Create a free account and start teaching today!'}
                      {intent === 'login' &&
                        'Please enter your credentials to log in.'}
                    </p>
                  </div>
                  {/* Form */}
                  {intent === 'signup' && (
                    <SignUpForm
                      isCreator={false}
                      signUpWithEmail={signUpWithEmail}
                      isLoading={isLoading}
                    />
                  )}
                  {intent === 'creator-signup' && (
                    <SignUpForm
                      isCreator={true}
                      signUpWithEmail={signUpWithEmail}
                      isLoading={isLoading}
                    />
                  )}
                  {intent === 'login' && (
                    <LogInForm
                      logInWithEmail={logInWithEmail}
                      isLoading={isLoading}
                    />
                  )}
                  {/* Intent changing links */}
                  <div className="grid gap-2">
                    {/* Sign Up */}
                    {intent != 'login' && (
                      <>
                        <p className="text-sm text-white/75">
                          Aleady have an account?{' '}
                          <button
                            className="underline text-coachify-teal-500 hover:text-coachify-teal-400 transition-200-out-quart"
                            onClick={() => setAuthIntent('login')}
                          >
                            Log In
                          </button>
                        </p>
                        {intent === 'signup' && (
                          <p className="text-sm text-white/75">
                            Are you a teacher?{' '}
                            <button
                              className="underline text-coachify-teal-500 hover:text-coachify-teal-400 transition-200-out-quart"
                              onClick={() => setAuthIntent('creator-signup')}
                            >
                              Register a creator account
                            </button>
                          </p>
                        )}
                        {intent === 'creator-signup' && (
                          <p className="text-sm text-white/75">
                            Are you a student?{' '}
                            <button
                              className="underline text-coachify-teal-500 hover:text-coachify-teal-400 transition-200-out-quart"
                              onClick={() => setAuthIntent('signup')}
                            >
                              Register a student account
                            </button>
                          </p>
                        )}
                      </>
                    )}
                    {/* Log In */}
                    {intent === 'login' && (
                      <p className="text-sm text-white/75">
                        Don&apos;t have an account yet?{' '}
                        <button
                          className="underline text-coachify-teal-500 hover:text-coachify-teal-400 transition-200-out-quart"
                          onClick={() => setAuthIntent('signup')}
                        >
                          Sign Up
                        </button>
                      </p>
                    )}
                  </div>
                  {/* Footer */}
                  <p className="text-xs text-white/50">
                    By continuing, you agree to our{' '}
                    <Link
                      href="/terms-of-use"
                      className="underline hover:text-white"
                    >
                      Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy-policy"
                      className="underline hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
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
        onClick={(e) => {
          e.preventDefault();
          signUpWithEmail(email, password, name, isCreator);
        }}
        disabled={isLoading}
      >
        Create an account
      </Button>
    </form>
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
        onClick={(e) => {
          e.preventDefault();
          logInWithEmail(email, password);
        }}
        disabled={isLoading}
      >
        Log In
      </Button>
      <button
        className="underline text-coachify-teal-500 hover:text-coachify-teal-400 transition-200-out-quart mr-auto text-sm"
        onClick={() => {}}
      >
        Restore password
      </button>
    </form>
  );
};

export default AuthDialog;
