const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('askbi_token') : null;
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    if (res.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('askbi_token');
      window.location.href = '/platform/login';
      throw new Error('Sessão expirada. Por favor, faz login novamente.');
    }
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Typed CRUD helpers ───────────────────────────────────────────

function req<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  return apiFetch<T>(path, init);
}

export const api = {
  atletas: {
    list: (params?: Record<string, string>) =>
      req(`/atletas${params ? '?' + new URLSearchParams(params) : ''}`),
    get: (id: string) => req(`/atletas/${id}`),
    create: (body: unknown) => req('/atletas', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => req(`/atletas/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => req(`/atletas/${id}`, { method: 'DELETE' }),
  },
  clubes: {
    list: () => req('/clubes'),
    get: (id: string) => req(`/clubes/${id}`),
    create: (body: unknown) => req('/clubes', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => req(`/clubes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id: string) => req(`/clubes/${id}`, { method: 'DELETE' }),
  },
  treinadores: {
    list: () => req('/treinadores'),
    get: (id: string) => req(`/treinadores/${id}`),
    create: (body: unknown) => req('/treinadores', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => req(`/treinadores/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  competicoes: {
    list: () => req('/competicoes'),
    get: (id: string) => req(`/competicoes/${id}`),
    create: (body: unknown) => req('/competicoes', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => req(`/competicoes/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  arbitros: {
    list: () => req('/arbitros'),
    get: (id: string) => req(`/arbitros/${id}`),
    create: (body: unknown) => req('/arbitros', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => req(`/arbitros/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  },
  financeiro: {
    pagamentos: (params?: Record<string, string>) =>
      req(`/financeiro/pagamentos${params ? '?' + new URLSearchParams(params) : ''}`),
    criarPagamento: (body: unknown) => req('/financeiro/pagamentos', { method: 'POST', body: JSON.stringify(body) }),
    atualizarPagamento: (id: string, body: unknown) =>
      req(`/financeiro/pagamentos/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    resumo: (ano?: number) => req(`/financeiro/resumo${ano ? `?ano=${ano}` : ''}`),
  },
};
