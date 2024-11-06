import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { signInFlow } from '../types';
import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';

interface SignUpCardProps {
    setState: (state: signInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { signIn } = useAuthActions();

    const handleProviderSignIn = (value: 'github' | 'google') => {
        setPending(true);
        signIn(value).finally(() => {
            setPending(false);
        });
    };

    const passwordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        setPending(true);

        signIn('password', { name, email, password, flow: 'signUp' })
            .catch(() => {
                setError('Something went wrong!');
            })
            .finally(() => {
                setPending(false);
            });
    };

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Signup to continue</CardTitle>
                <CardDescription>
                    Use your email or other service to continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md text-sm text-destructive mb-6 flex items-center gap-x-2">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="px-0 pb-0 space-y-5">
                <form onSubmit={passwordSignUp} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        type="text"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        type="password"
                        required
                    />
                    <Button
                        type="submit"
                        size={'lg'}
                        className="w-full"
                        disabled={pending}
                    >
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        onClick={() => handleProviderSignIn('google')}
                        variant={'outline'}
                        size={'lg'}
                        className="w-full relative"
                    >
                        <FcGoogle className="absolute size-5 top-3 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => handleProviderSignIn('github')}
                        variant={'outline'}
                        size={'lg'}
                        className="w-full relative"
                    >
                        <FaGithub className="absolute size-5 top-3 left-2.5" />
                        Continue with GitHub
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already have an account?{' '}
                    <span
                        className="text-sky-700 hover:underline cursor-pointer"
                        onClick={() => setState('signIn')}
                    >
                        Sign in
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
