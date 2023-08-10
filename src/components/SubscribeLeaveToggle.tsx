import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/Button';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import axios, { AxiosError } from 'axios';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { toast } from '@/hooks/use-toast';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

interface SubscribeLeaveToggleProps {
  subredditId: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle = ({
  subredditId,
  isSubscribed,
}: SubscribeLeaveToggleProps) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter();
  const { mutate: subscribe, isLoading: isSubscribedLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post('/api/subreddit/subscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
        return toast({
          title: 'Something went wrong',
          description: 'Try again later',
          variant: 'destructive',
        });
      }
    },
    onSuccess: (data) => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: 'Subscribed!',
        description:
          'You will now see posts from this community on your home page',
      });
    },
  });
  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave Community</Button>
  ) : (
    <Button
      onClick={() => subscribe()}
      isLoading={isSubscribedLoading}
      className="w-full mt-1 mb-4"
    >
      Join to post!
    </Button>
  );
};

export default SubscribeLeaveToggle;
