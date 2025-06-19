import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LockKeyhole, MailCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

interface ResetPasswordForm {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordForm>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Create New Password"
            description="Secure your account with a new password"

        >
            <Head title="Reset password" />

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
                    className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50"
                    onSubmit={submit}
                >
                    <motion.div
                        className="flex justify-center mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                            <LockKeyhole className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Reset Your Password
                    </motion.h2>

                    <motion.p
                        className="text-center text-gray-600 dark:text-gray-300 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Create a strong new password for your account
                    </motion.p>

                    <div className="grid gap-6">
                        <motion.div
                            className="grid gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={data.email}
                                    readOnly
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="py-6 px-4 bg-gray-100/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 pl-12"
                                />
                                <MailCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            </div>
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.email} className="mt-2" />
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
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    value={data.password}
                                    autoFocus
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Enter new password"
                                    className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 pl-12"
                                />
                                <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            </div>
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
                            transition={{ delay: 0.7 }}
                        >
                            <Label htmlFor="password_confirmation" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirm new password"
                                    className="py-6 px-4 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 pl-12"
                                />
                                <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            </div>
                            <AnimatePresence>
                                {errors.password_confirmation && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button
                                type="submit"
                                className="w-full py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all"
                                disabled={processing}

                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                                        Updating...
                                    </>
                                ) : (
                                    <span className="font-semibold">Reset Password</span>
                                )}
                            </Button>
                        </motion.div>
                    </div>
                </form>
            </motion.div>
        </AuthLayout>
    );
}
