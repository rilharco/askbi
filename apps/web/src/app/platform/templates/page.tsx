'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Template = { id: string; name: string; description?: string | null; status: string; updatedAt: string };

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push('/platform/login');
    apiFetch<Template[]>('/templates').then(setTemplates).catch(() => {});
  }, [router]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const template = await apiFetch<Template>('/templates', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    setTemplates((prev) => [template, ...prev]);
    setName('');
    setBusy(false);
  };

  return (
    <div className="platform-panel">
      <div className="panel-head">
        <h2>Templates</h2>
        <span>Preview e submissão</span>
      </div>
      <form className="platform-form row" onSubmit={create}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do template"
          required
        />
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? 'A criar...' : 'Criar template'}
        </button>
      </form>
      <div className="platform-grid">
        {templates.map((tpl) => (
          <Link key={tpl.id} className="platform-card" href={`/platform/templates/${tpl.id}`}>
            <h3>{tpl.name}</h3>
            <p>{tpl.description || 'Sem descrição'}</p>
            <span className="pill">{tpl.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
