'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Flow = { id: string; name: string; description?: string | null; status: string; steps: any[] };
type Run = { id: string; status: string; startedAt: string; logs?: any };

const stepTypes = ['VALIDATE', 'ROUTE', 'NOTIFY'] as const;

export default function FlowEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [flow, setFlow] = useState<Flow | null>(null);
  const [draftSteps, setDraftSteps] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [inputJson, setInputJson] = useState('{"type":"demo"}');
  const [runs, setRuns] = useState<Run[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const draftKey = useMemo(() => `flow-draft-${id}`, [id]);

  useEffect(() => {
    if (!getToken()) router.push('/platform/login');
    apiFetch<Flow>(`/flows/${id}`).then((data) => {
      setFlow(data);
      setName(data.name);
      setDesc(data.description || '');
      const stored = localStorage.getItem(draftKey);
      const steps = stored ? JSON.parse(stored) : data.steps;
      const withText = (steps || []).map((step: any) => ({
        ...step,
        configText: JSON.stringify(step.config ?? {}, null, 2)
      }));
      setDraftSteps(withText);
    });
    apiFetch<Run[]>(`/flows/${id}/runs`).then(setRuns).catch(() => {});
  }, [id, router, draftKey]);

  useEffect(() => {
    if (!flow) return;
    const handle = setTimeout(async () => {
      setSaving(true);
      const cleanSteps = draftSteps.map(({ configText, ...rest }) => rest);
      localStorage.setItem(draftKey, JSON.stringify(cleanSteps));
      await apiFetch(`/flows/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, description: desc, steps: cleanSteps })
      });
      setSaving(false);
    }, 700);
    return () => clearTimeout(handle);
  }, [draftSteps, name, desc, id, flow, draftKey]);

  const addStep = () => {
    setDraftSteps((prev) => [
      ...prev,
      { type: 'VALIDATE', config: { requiredFields: [] }, configText: JSON.stringify({ requiredFields: [] }, null, 2) }
    ]);
  };

  const updateStep = (index: number, patch: any) => {
    setDraftSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const removeStep = (index: number) => {
    setDraftSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const runFlow = async () => {
    setError('');
    try {
      const input = JSON.parse(inputJson);
      const run = await apiFetch<Run>(`/flows/${id}/run`, {
        method: 'POST',
        body: JSON.stringify({ input })
      });
      setRuns((prev) => [run, ...prev]);
    } catch (err) {
      setError('JSON inválido ou falha na execução.');
    }
  };

  if (!flow) return <div className="platform-panel">A carregar...</div>;

  return (
    <div className="platform-panel">
      <div className="panel-head">
        <h2>Flow Editor</h2>
        <span>{saving ? 'A guardar...' : 'Autosave ativo'}</span>
      </div>
      <div className="platform-form">
        <label>
          Nome do flow
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
            <h3>Steps</h3>
            <button className="btn" onClick={addStep}>Adicionar step</button>
          </div>
          <div className="steps">
            {draftSteps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-head">
                  <select
                    value={step.type}
                    onChange={(e) => updateStep(idx, { type: e.target.value })}
                  >
                    {stepTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <button className="link" onClick={() => removeStep(idx)}>Remover</button>
                </div>
                <textarea
                  value={step.configText || ''}
                  onChange={(e) => {
                    const text = e.target.value;
                    let parsed = step.config;
                    try {
                      parsed = JSON.parse(text || '{}');
                    } catch {
                      parsed = step.config;
                    }
                    updateStep(idx, { configText: text, config: parsed });
                  }}
                  rows={5}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="platform-card">
          <div className="panel-head">
            <h3>Executar</h3>
            <button className="btn primary" onClick={runFlow}>Executar</button>
          </div>
          <textarea value={inputJson} onChange={(e) => setInputJson(e.target.value)} rows={8} />
          {error && <div className="platform-error">{error}</div>}
          <div className="panel-head">
            <h3>Histórico</h3>
          </div>
          <div className="history">
            {runs.map((run) => (
              <div key={run.id} className="history-item">
                <div><strong>{run.status}</strong> • {new Date(run.startedAt).toLocaleString()}</div>
                <pre>{JSON.stringify(run.logs, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
