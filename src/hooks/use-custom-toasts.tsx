import Link from 'next/link';
import { toast } from './use-toast';
import { buttonVariants } from '@/components/ui/Button';

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'You are not logged in',
      description: 'You need to be logged in.',
      variant: 'destructive',
      action: (
        <Link
          href="/sign-in"
          onClick={() => dismiss()}
          className={buttonVariants({
            variant: 'outline',
            className: 'text-zinc-500',
          })}
        >
          Login
        </Link>
      ),
    });
  };
  return { loginToast };
};
