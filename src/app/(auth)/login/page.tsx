'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setToken } from '@/lib/auth';
import type { z } from 'zod';
import { signInSchema } from '@/lib/zod';

type LoginInputs = z.infer<typeof signInSchema>;

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: zodResolver(signInSchema),
    });

    const { mutateAsync: login } = trpc.auth.login.useMutation({
        onSuccess: (data) => {
            setToken(data.user.token);
            window.location.href = `/`;
            setLoading(false);
        },
        onError: (error) => {
            setError(error.message);
            setLoading(false);
        },
    });

    const onSubmit = async (data: LoginInputs) => {
        setLoading(true);
        login(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login App
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLoading ? 'Loading...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}