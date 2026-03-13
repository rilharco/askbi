'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push('/platform/login');
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await apiFetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, onboardingComplete: true })
    });
    router.push('/platform');
  };

  return (
    <div className="platform-panel">
      <h2>Onboarding</h2>
      <p>Define o teu nome para finalizar o acesso.</p>
      <form className="platform-form" onSubmit={submit}>
        <label>
          Nome completo
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? 'A guardar...' : 'Concluir'}
        </button>
      </form>
    </div>
  );
}
