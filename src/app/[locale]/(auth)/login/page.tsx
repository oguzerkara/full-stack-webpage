"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useTranslations } from "next-intl";

function Login() {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  const onLogin = async () => {
    try {
      setLoginFail(false);
      setLoading(true);
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success", data);
        router.push("/profile"); // Redirect to login page or another page after successful login
        router.refresh();
      } else {
        const errorData = await response.json();
        console.log("Login failed", errorData);
        setLoginFail(true);
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);


  return (
    <div className="grid place-items-center bg-white mt-20 lg:h-screen h-full lg:px-32 px-4 py-8">
      <div className="flex flex-col rounded py-16 px-6 md:px-16 justify-center items-start w-full gap-6 max-w-screen-2x1 shadow-md">
        <h2 className="text-center text-thd-blau py-3" 
        >{loading ? t('Processing'): t('Login')}</h2>
        <div className="mt-2"/>
        <div className="w-3/5: mt-8 lg:m-0">
          <form className="w-full flex flex-col text-darkgrey font-bold " onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="mt-6 w-full text-thd-blau title ">
              {t('Email')}
              <input 
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder= {t('yourEmail')}
                className="bg-light-grey-transparent1 text-thd-blau border-b py-3 mt-3 outline-none w-full"
              />
            </label>
            
            <label htmlFor="password" className="mt-6 w-full text-thd-blau title ">
              {t('Password')}
              <input 
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder={t('yourPassword')}
                className="bg-light-grey-transparent1 text-thd-blau border-b py-3 mt-3 outline-none w-full"
              />
            </label>

            <div>
              <div className="mt-4"/>
              <button onClick={onLogin} type="button"
                className="bg-light-grey-transparent2 font-normal text-thd-blau py-2 px-4 rounded text-center hover:text-donau-blau"
                disabled={buttonDisabled}
              >
                {loading ? t('Processing') : t('LogIn')}
              </button>
              <div className="mt-3"/>
              <div className={loginFail ? "text-donau-blau" : "text-light-grey-transparent6"}>{loginFail ?  t('loginFailed') : t('orRegister')}</div>
              <div className="mt-2" />
              <Link href="/register" className="font-bold text-thd-blau">{t('Register')}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
