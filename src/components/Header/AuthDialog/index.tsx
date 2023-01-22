import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '@components/ui/Button';
import { FiMail, FiX } from 'react-icons/fi';
import { BsApple, BsGoogle } from 'react-icons/bs';
import Link from 'next/link';
import clsx from 'clsx';
import InputWithLabel from '@components/ui/InputWithLabel';

type AuthDialogProps = {
  open: boolean;
  setIsOpen: any;
  intent: AuthIntent;
  setAuthIntent: any;
};

export type AuthIntent = 'login' | 'signup' | 'creator-signup';

const AuthDialog = ({
  open,
  setIsOpen,
  intent,
  setAuthIntent,
}: AuthDialogProps) => {
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
          <div className="fixed inset-0 bg-coachify-teal-1000/75" />
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
              <Dialog.Panel className="overflow-hidden rounded-lg bg-coachify-teal-800 shadow-xl text-white transition-200-out-quart sm:my-8 w-full max-w-sm p-4 sm:p-6">
                <Button
                  fill="ghost"
                  icon="icon-only"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4"
                  aria-label="close-dialog-button"
                >
                  <FiX />
                </Button>
                {intent === 'signup' && (
                  <SignUp setAuthIntent={setAuthIntent} />
                )}
                {intent === 'creator-signup' && (
                  <CreatorSignUp setAuthIntent={setAuthIntent} />
                )}
                {intent === 'login' && <LogIn setAuthIntent={setAuthIntent} />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const SignUp = ({ setAuthIntent }: any) => {
  const [isEmail, setIsEmail] = useState(false);

  return (
    <div className="grid gap-6">
      <div>
        <Dialog.Title as="h3" className="text-xl font-medium">
          We’re glad you’re here!
        </Dialog.Title>
        <p className="mt-4 text-sm text-white/75">
          Create a free account and start learning today from world-class
          teachers!
        </p>
      </div>
      <div className="grid gap-3">
        {isEmail ? (
          <SignUpForm isCreator={false} />
        ) : (
          <>
            <Button fill="outline" icon="icon-left">
              <BsApple />
              Continue with Apple
            </Button>
            <Button fill="outline" icon="icon-left">
              <BsGoogle />
              Continue with Google
            </Button>
            <Button
              fill="outline"
              icon="icon-left"
              onClick={() => setIsEmail(true)}
            >
              <FiMail />
              Continue with Email
            </Button>
          </>
        )}
      </div>
      <div className="grid gap-3">
        <p className="text-sm text-white/75">
          Aleady have an account?{' '}
          <button
            className="underline text-coachify-cyan-700 hover:text-coachify-cyan-500 transition-200-out-quart"
            onClick={() => setAuthIntent('login')}
          >
            Log In
          </button>
        </p>
        <p className="text-sm text-white/75">
          Are you a teacher?{' '}
          <button
            className="underline text-coachify-cyan-700 hover:text-coachify-cyan-500 transition-200-out-quart"
            onClick={() => setAuthIntent('creator-signup')}
          >
            Register a creator account
          </button>
        </p>
      </div>
      <p className="text-xs text-white/50">
        By continuing, you agree to our{' '}
        <Link href="/terms-of-use" className="underline hover:text-white">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="underline hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

const CreatorSignUp = ({ setAuthIntent }: any) => {
  const [isEmail, setIsEmail] = useState(false);

  return (
    <div className="grid gap-6">
      <div>
        <Dialog.Title as="h3" className="text-xl font-medium">
          We’re glad you’re here!
        </Dialog.Title>
        <p className="mt-4 text-sm text-white/75">
          Create a free account and start teaching today!
        </p>
      </div>
      <div className="grid gap-3">
        {isEmail ? (
          <SignUpForm isCreator={true} />
        ) : (
          <>
            <Button fill="outline" icon="icon-left">
              <BsApple />
              Continue with Apple
            </Button>
            <Button fill="outline" icon="icon-left">
              <BsGoogle />
              Continue with Google
            </Button>
            <Button
              fill="outline"
              icon="icon-left"
              onClick={() => setIsEmail(true)}
            >
              <FiMail />
              Continue with Email
            </Button>
          </>
        )}
      </div>
      <div className="grid gap-3">
        <p className="text-sm text-white/75">
          Aleady have an account?{' '}
          <button
            className="underline text-coachify-cyan-700 hover:text-coachify-cyan-500 transition-200-out-quart"
            onClick={() => setAuthIntent('login')}
          >
            Log In
          </button>
        </p>
        <p className="text-sm text-white/75">
          Are you a student?{' '}
          <button
            className="underline text-coachify-cyan-700 hover:text-coachify-cyan-500 transition-200-out-quart"
            onClick={() => setAuthIntent('signup')}
          >
            Register a student account
          </button>
        </p>
      </div>
      <p className="text-xs text-white/50">
        By continuing, you agree to our{' '}
        <Link href="/terms-of-use" className="underline hover:text-white">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="underline hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

const SignUpForm = ({ isCreator }: { isCreator: boolean }) => {
  return (
    <form id="signup" className="grid gap-3" onSubmit={() => {}}>
      <InputWithLabel id="Name" label="Full name" autoComplete="name" />
      <InputWithLabel
        type="email"
        id="email"
        label="Email address"
        autoComplete="email"
      />
      <InputWithLabel
        type="password"
        id="password"
        label="Password"
        autoComplete="new-password"
      />
      <div className="flex gap-2">
        <label htmlFor="isCreator">isCreator (for test only)</label>
        <input type="checkbox" id="isCreator" checked={isCreator} />
      </div>
      <Button type="submit">Create an account</Button>
    </form>
  );
};

const LogInForm = () => {
  return (
    <form id="login" className="grid gap-3" onSubmit={() => {}}>
      <InputWithLabel
        type="email"
        id="email"
        label="Email address"
        autoComplete="email"
      />
      <InputWithLabel
        type="password"
        id="password"
        label="Password"
        autoComplete="current-password"
      />
      <Button type="submit" className="mt-2">
        Log In
      </Button>
      <button
        className="underline text-coachify-cyan-700 hover:text-coachify-cyan-500 transition-200-out-quart mr-auto text-sm"
        onClick={() => {}}
      >
        Restore password
      </button>
    </form>
  );
};

const LogIn = ({ setAuthIntent }: any) => {
  return (
    <div className="grid gap-6">
      <div>
        <Dialog.Title as="h3" className="text-xl font-medium">
          Welcome back!
        </Dialog.Title>
        <p className="mt-4 text-sm text-white/75">
          Please log in using one of the methods below.
        </p>
      </div>
      <div className="grid gap-3">
        <Button fill="outline" icon="icon-left">
          <BsApple />
          Continue with Apple
        </Button>
        <Button fill="outline" icon="icon-left">
          <BsGoogle />
          Continue with Google
        </Button>
        <div className="relative isolate flex">
          <p
            className={clsx(
              'mx-auto px-4 bg-coachify-teal-800 text-xs text-white/50',
              'before:absolute before:-z-10 before:left-0 before:top-1/2 before:h-px before:w-full before:bg-white/50'
            )}
          >
            OR
          </p>
        </div>
        <LogInForm />
      </div>
      <p className="text-sm text-white/75">
        Don&apos;t have an account yet?{' '}
        <button
          className="underline text-coachify-cyan-700 hover:text-coachify-cyan-500 transition-200-out-quart"
          onClick={() => setAuthIntent('signup')}
        >
          Sign Up
        </button>
      </p>
      <p className="text-xs text-white/50 mt-4">
        By continuing, you agree to our{' '}
        <Link href="/terms-of-use" className="underline hover:text-white">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="underline hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default AuthDialog;
