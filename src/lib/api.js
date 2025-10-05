// slurkronox/bloomwatch-brasil-techers/bloomwatch-brasil-techers-ac71067e3e30b0cb7c9e5e21329805911e61af62/src/lib/api.js
const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/bloomwatch-api`;

const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export async function fetchRegioes() {
  const response = await fetch(`${API_BASE_URL}/regioes`, { headers });

  if (!response.ok) {
    throw new Error('Erro ao buscar regiões');
  }

  const data = await response.json();
  return data.regioes;
}

export async function fetchFloradaPorRegiao(regiaoId) {
  const response = await fetch(`${API_BASE_URL}/florada/${regiaoId}`, { headers });

  if (!response.ok) {
    throw new Error('Erro ao buscar dados de floração');
  }

  return response.json();
}