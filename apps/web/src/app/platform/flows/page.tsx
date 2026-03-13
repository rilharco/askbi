'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Flow = { id: string; name: string; description?: string | null; status: string; updatedAt: string };

export default function FlowsPage() {
  const router = useRouter();
  const [flows, setFlows] = useState<Flow[]>([]);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push('/platform/login');
    apiFetch<Flow[]>('/flows').then(setFlows).catch(() => {});
  }, [router]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const flow = await apiFetch<Flow>('/flows', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    setFlows((prev) => [flow, ...prev]);
    setName('');
    setBusy(false);
  };

  return (
    <div className="platform-panel">
      <div className="panel-head">
        <h2>Flows</h2>
        <span>Execução, histórico e autosave</span>
      </div>
      <form className="platform-form row" onSubmit={create}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do flow"
          required
        />
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? 'A criar...' : 'Criar flow'}
        </button>
      </form>
      <div className="platform-grid">
        {flows.map((flow) => (
          <Link key={flow.id} className="platform-card" href={`/platform/flows/${flow.id}`}>
            <h3>{flow.name}</h3>
            <p>{flow.description || 'Sem descrição'}</p>
            <span className="pill">{flow.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
