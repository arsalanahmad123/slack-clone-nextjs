'use client';

import { signInFlow } from '../types';
import { useState } from 'react';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';

export const AuthScreen = () => {
    const [state, setState] = useState<signInFlow>('signIn');

    return (
        <div className="flex h-screen justify-center items-center bg-slackprimary">
            <div className="md:h-auto md:w-[420px]">
                {state === 'signIn' ? (
                    <SignInCard setState={setState} />
                ) : (
                    <SignUpCard setState={setState} />
                )}
            </div>
        </div>
    );
};
