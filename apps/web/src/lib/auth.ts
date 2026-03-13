export function setToken(token: string) {
  localStorage.setItem('askbi_token', token);
}

export function getToken() {
  return localStorage.getItem('askbi_token');
}

export function clearToken() {
  localStorage.removeItem('askbi_token');
}
