import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    matriculeUser: string;
}

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    matricule: string;
}

export default function Register() {
    const { matricule } = usePage<CustomPageProps>().props;
    const [, setMat] = useState(matricule || '');
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        matriculeUser: localStorage.getItem('matricule') || ''
    });

    useEffect(() => {
        if (matricule) {
            localStorage.setItem('matricule', matricule);
            setMat(matricule);
        } else {
            const matLocal = localStorage.getItem('matricule');
            if (matLocal) setMat(matLocal);
        }
    }, [matricule]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Join our community"
            description="Create your account to get started"

        >
            <Head title="Register" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {/* Effets décoratifs */}
                <div className="absolute -inset-4 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-indigo-200/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-purple-50/50 to-transparent dark:via-purple-900/10" />
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
                        <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
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
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-center text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Create your account
                    </motion.h2>

                    <motion.p
                        className="text-center text-gray-600 dark:text-gray-300 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Join us today and start your journey
                    </motion.p>

                    <div className="grid gap-6">
                        <motion.div
                            className="grid gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Label htmlFor="matriculeUser" className="text-gray-700 dark:text-gray-300">Matricule</Label>
                            <Input
                                id="matriculeUser"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="matriculeUser"
                                value={data.matriculeUser}
                                onChange={(e) => setData('matriculeUser', e.target.value)}
                                disabled
                                placeholder="Your matricule"
                                className="py-6 px-4 bg-gray-100/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                            />
                            <AnimatePresence>
                                {errors.matriculeUser && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.matriculeUser} className="mt-2" />
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
                            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Username</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Choose a username"
                                className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                            />
                            <AnimatePresence>
                                {errors.name && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.name} className="mt-2" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            className="grid gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={3}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                                className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
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
                            transition={{ delay: 0.8 }}
                        >
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="••••••••"
                                className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
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
                            className="grid gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <Label htmlFor="password_confirmation" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={5}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="••••••••"
                                className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                            />
                            <AnimatePresence>
                                {errors.password_confirmation && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.password_confirmation} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                        >
                            <Button
                                type="submit"
                                className="mt-2 w-full py-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/20 transition-all"
                                tabIndex={6}
                                disabled={processing}


                            >
                                {processing ? (
                                    <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <span className="font-semibold">Create Account</span>
                                )}
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="text-center text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    >
                        Already have an account?{' '}
                        <TextLink
                            href={route('login')}
                            tabIndex={7}
                        >
                            Log in
                        </TextLink>
                    </motion.div>
                </form>
            </motion.div>
        </AuthLayout>
    );
}
