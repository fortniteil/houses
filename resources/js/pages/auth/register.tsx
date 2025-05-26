import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    username: string; // Add username field
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        username: '', // Initialize username
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.username) {
            setData('username', data.name.split(' ')[0]);
            return;
        }
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <AuthLayout title="ברוכים הבאים לקהילת HelpBnk!" description="התחל בהזנת הפרטים שלך כדי להירשם אצלנו.">
                <Head title="הרשמה" />
                <form className="space-y-3" onSubmit={submit}>
                    <div className="mt-4">
                        <Label htmlFor="name">שם מלא</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => {
                                const fullName = e.target.value.trim();
                                const firstName = fullName.split(' ')[0]; // Get only the first word
                                setData('name', fullName);
                                setData('username', firstName.toLowerCase()); // Convert to lowercase if needed
                            }}
                            disabled={processing}
                            placeholder="ארז עוזר"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="email">דואר אלקטרוני</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="example@helpbnk.app"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">סיסמה</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="להשתמש בלפחות 8 תווים"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">אישור סיסמה</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="אישור סיסמה"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        יצירת חשבון
                    </Button>
                </form>
                <div className="mt-12 flex w-full flex-row items-center justify-center">
                    <div className="text-center text-sm leading-tight font-normal text-gray-600">
                        יש ברשותך חשבון?{' '}
                        <TextLink href={route('login')} tabIndex={6}>
                            כניסה
                        </TextLink>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
