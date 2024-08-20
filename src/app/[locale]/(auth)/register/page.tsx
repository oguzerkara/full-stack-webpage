// register/page.tsx
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

function Register() {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onRegister();
  };

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Register success", data);
      router.push("/login");
    } catch (error: any) {
      console.log("Register failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="grid place-items-center bg-white mt-20 lg:h-screen h-full lg:px-32 px-4 py-8">
      <div className="flex flex-col rounded py-16 px-6 md:px-16 justify-center items-start w-full gap-6 max-w-screen-2x1 shadow-md">
        <h2 className="text-center text-thd-blau py-3">{loading ? t('Processing') : t('Register')}</h2>
        <div className="mt-2"/>
        <div className="w-full mt-8 lg:m-0">
          <form onSubmit={handleSubmit} className="w-full flex flex-col text-darkgrey font-bold">
            <label htmlFor="username" className="mt-2 w-full text-thd-blau title">
              {t('fullName')}
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder= {t('yourFullName')}
                className="bg-light-grey-transparent1 text-thd-blau border-b py-3 mt-3 outline-none w-full"
              />
            </label>

            <label htmlFor="password" className="mt-6 w-full text-thd-blau title">
              Password
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="****"
                className="bg-light-grey-transparent1 text-thd-blau border-b py-3 mt-3 outline-none w-full"
              />
            </label>

            <label htmlFor="email" className="mt-6 w-full text-thd-blau title">
              E-mail
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder= {t('yourEmailAddress')}
                className="bg-light-grey-transparent1 text-thd-blau border-b py-3 mt-3 outline-none w-full"
              />
            </label>
            <div>
              <div className="mt-4"/>
              <button
                type="submit"
                className="bg-light-grey-transparent2 font-normal text-thd-blau py-2 px-4 rounded text-center hover:text-donau-blau"
                disabled={buttonDisabled}
                onClick={onRegister}
              >
                {buttonDisabled ? t('pleaseFill'): t('Register')}
              </button>
              <div className="mt-1"/>
              <Link href="/login" className="font-bold text-thd-blau">
                {t('LogIn')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
