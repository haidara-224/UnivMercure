import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title="Verify Your Email"
            description="We've sent a verification link to your email address"

        >
            <Head title="Email verification" />

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

                <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50 text-center">
                    <motion.div
                        className="flex justify-center mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Verify Your Email
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 dark:text-gray-300 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Check your inbox for the verification link we just sent
                    </motion.p>

                    <AnimatePresence>
                        {status === 'verification-link-sent' && (
                            <motion.div
                                className="mb-6 p-4 text-sm font-medium text-green-600 bg-green-100/50 dark:bg-green-900/20 rounded-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                A new verification link has been sent to your email address
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={submit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button
                                className="w-full py-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/20 transition-all"
                                disabled={processing}

                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-5 h-5 mr-2" />
                                        <span className="font-semibold">Resend Verification Email</span>
                                    </>
                                )}
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <TextLink
                                href={route('logout')}
                                method="post"
                                className="text-sm inline-flex items-center"

                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Log out
                            </TextLink>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
