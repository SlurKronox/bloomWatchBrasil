import { afterEach, describe, expect, it, vi } from 'vitest';

describe('api client (legacy)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('fetches regions', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        regioes: [{ id: 'r1', nome: 'Sertao', latitude: -9.1, longitude: -40.3 }],
      }),
    });

    vi.stubGlobal('fetch', fetchMock);

    const { fetchRegioes } = await import('../api.js');
    const data = await fetchRegioes();

    expect(data).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.supabase.co/functions/v1/bloomwatch-api/regioes',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer anon-key' }),
      })
    );
  });

  it('throws when region request fails', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const { fetchFloradaPorRegiao } = await import('../api.js');

    await expect(fetchFloradaPorRegiao('r1')).rejects.toThrow(/Erro ao buscar dados de flora/);
  });
});