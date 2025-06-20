'use client';
import { Button } from '@/components/Buttons';
import { AuthContext } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  if (!user) {
    return;
  }

  return (
    <>
      <header className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-end space-x-4 py-4 px-8">
          <div>{`Bem vindo, ${user.name}!`}</div>
          <Button onClick={handleLogout}>Sair</Button>
        </div>
      </header>
      {children}
    </>
  );
}
