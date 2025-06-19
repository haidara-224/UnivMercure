import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Welcome back"
            description="Log in to access your personalized dashboard"

        >
            <Head title="Log in" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {/* Effets décoratifs */}
                <div className="absolute -inset-4 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-200/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-50/50 to-transparent dark:via-blue-900/10" />
                </div>

                <form
                    className="flex flex-col gap-6 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50"
                    onSubmit={submit}
                >
                    <motion.div
                        className="flex justify-center mb-2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6 text-white"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-center text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome back
                    </motion.h2>

                    <motion.p
                        className="text-center text-gray-600 dark:text-gray-300 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Log in to access your account
                    </motion.p>

                    <div className="grid gap-6">
                        <motion.div
                            className="grid gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.email} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            className="grid gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={route('password.request')}
                                        className="ml-auto text-sm"
                                        tabIndex={5}

                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <AnimatePresence>
                                {errors.password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.password} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Checkbox
                                id="remember"
                                name="remember"
                                tabIndex={3}
                                className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <Label htmlFor="remember" className="text-gray-700 dark:text-gray-300">Remember me</Label>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button
                                type="submit"
                                className="mt-2 w-full py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all"
                                tabIndex={4}
                                disabled={processing}

                            >
                                {processing ? (
                                    <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <span className="font-semibold">Log in</span>
                                )}
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="text-center text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        Don't have an account?{' '}
                        <TextLink
                            href={route('verifcation.verif')}
                            tabIndex={5}

                        >
                            Sign up
                        </TextLink>
                    </motion.div>
                </form>

                <AnimatePresence>
                    {status && (
                        <motion.div
                            className="mt-4 text-center text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 py-2 px-4 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            {status}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AuthLayout>
    );
}
