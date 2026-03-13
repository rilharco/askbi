'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Template = { id: string; name: string; description?: string | null; status: string; content: any };

export default function TemplateEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [tpl, setTpl] = useState<Template | null>(null);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push('/platform/login');
    apiFetch<Template>(`/templates/${id}`).then((data) => {
      setTpl(data);
      setName(data.name);
      setDesc(data.description || '');
      setContent(JSON.stringify(data.content ?? {}, null, 2));
    });
  }, [id, router]);

  useEffect(() => {
    if (!tpl) return;
    const handle = setTimeout(async () => {
      setSaving(true);
      let parsed: any = tpl.content;
      try {
        parsed = JSON.parse(content || '{}');
      } catch {
        parsed = tpl.content;
      }
      await apiFetch(`/templates/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, description: desc, content: parsed })
      });
      setSaving(false);
    }, 700);
    return () => clearTimeout(handle);
  }, [tpl, content, name, desc, id]);

  const submit = async () => {
    await apiFetch(`/templates/${id}/submit`, { method: 'POST' });
    const updated = await apiFetch<Template>(`/templates/${id}`);
    setTpl(updated);
  };

  if (!tpl) return <div className="platform-panel">A carregar...</div>;

  return (
    <div className="platform-panel">
      <div className="panel-head">
        <h2>Template</h2>
        <span>{saving ? 'A guardar...' : tpl.status}</span>
      </div>
      <div className="platform-form">
        <label>
          Nome
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Descrição
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
      </div>
      <div className="platform-grid wide">
        <div className="platform-card">
          <div className="panel-head">
            <h3>Conteúdo (JSON)</h3>
            <button className="btn" onClick={submit}>Submeter</button>
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} />
        </div>
        <div className="platform-card">
          <div className="panel-head">
            <h3>Preview</h3>
          </div>
          <div className="template-preview">
            <h4>{name}</h4>
            <p>{desc}</p>
            <pre>{content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
