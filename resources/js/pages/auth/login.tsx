import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('email', 'remember'),
        });
    };

    return (
        <AuthLayout title="ברוכים הבאים" description="כניסה למערכת">
            <Head title="Log in" />

            <form className="space-y-3" onSubmit={submit}>
                <div className="mt-4">
                    <Label htmlFor="email">דואר אלקטרוני</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="example@helpbnk.app"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="mt-4 flex w-full flex-row justify-between">
                    <div className="flex items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">זכור אותי</Label>
                    </div>
                    {canResetPassword && (
                        <TextLink href={route('password.request')} className="mr-auto text-sm" tabIndex={5}>
                            שכחת/י סיסמה?
                        </TextLink>
                    )}
                </div>

                <Button type="submit" className="h-10 w-full px-4 py-2" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    כניסה
                </Button>

                <div className="text-muted-foreground text-center text-sm">
                    אין ברשותך חשבון?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        יצירת חשבון
                    </TextLink>
                </div>
            </form>
            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="bg-white px-2 text-gray-500">או כניסה באמצעות</span>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="flex flex-col gap-2">
                        <a
                            href="https://helpbnk.com/social-auth/linkedin"
                            class="touchable-opacity inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300"
                        >
                            <span class="sr-only">Sign in with LinkedIn</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
