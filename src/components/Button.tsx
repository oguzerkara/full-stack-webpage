// /components/Button.tsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  LinkText?: string;
  LinkTo: string;
  LinkClassName?: string;
}

const Button = ({ LinkText, LinkTo, LinkClassName }: Props) => {
  const router = useRouter();
  const navigate = (page: string) => {
    router.push(page);
  };

  return (
    <button className={LinkClassName} onClick={() => navigate(LinkTo)}>
      {LinkText}
    </button>
  );
}

export default Button