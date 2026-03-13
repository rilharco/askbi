'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    clearToken();
    router.push('/platform/login');
  }, [router]);
  return <div className="platform-panel">A terminar sessão...</div>;
}
