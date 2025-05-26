'use client';

import { motion } from 'framer-motion';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-3"
            >
                <div className="bg-primary flex hidden size-10 items-center justify-center rounded-lg text-white shadow-md sm:block dark:text-black">
                    <AppLogoIcon className="size-6 fill-current" />
                </div>
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-primary-dark font-almoni text-xl font-bold tracking-tight dark:text-white"
                    dir="rtl"
                >
                    נכסים<span className="text-blue-400"> +</span>
                </motion.span>
            </motion.div>
        </>
    );
}
