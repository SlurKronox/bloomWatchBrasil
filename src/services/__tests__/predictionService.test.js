import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const insertMock = vi.fn();
const orderMock = vi.fn();
const eqMock = vi.fn();
const selectMock = vi.fn();
const fromMock = vi.fn();

vi.mock('../nasaService.js', () => ({
  NASADataService: {
    getEnvironmentalData: vi.fn(),
  },
}));

vi.mock('../../lib/supabaseClient.js', () => ({
  supabase: {
    from: (...args) => fromMock(...args),
  },
}));

import { PredictionService } from '../predictionService.js';
import { NASADataService } from '../nasaService.js';

describe('PredictionService (legacy)', () => {
  beforeEach(() => {
    insertMock.mockResolvedValue({ error: null });
    orderMock.mockResolvedValue({ data: [{ id: '1' }], error: null });
    eqMock.mockReturnValue({ order: orderMock });
    selectMock.mockReturnValue({ eq: eqMock, order: orderMock });
    fromMock.mockReturnValue({ insert: insertMock, select: selectMock });

    vi.spyOn(Math, 'random').mockReturnValue(0);
    vi.spyOn(Date, 'now').mockReturnValue(new Date('2026-01-10T00:00:00.000Z').getTime());

    vi.mocked(NASADataService.getEnvironmentalData).mockResolvedValue({
      ndvi: [
        { date: '2026-01-01', value: 0.7, quality: 'good' },
        { date: '2026-01-08', value: 0.8, quality: 'good' },
      ],
      temperature: [
        { date: '2026-01-01', value: 24, quality: 'good' },
        { date: '2026-01-02', value: 25, quality: 'good' },
        { date: '2026-01-03', value: 26, quality: 'good' },
        { date: '2026-01-04', value: 25, quality: 'good' },
      ],
      precipitation: [
        { date: '2026-01-01', value: 300, quality: 'good' },
        { date: '2026-01-02', value: 300, quality: 'good' },
        { date: '2026-01-03', value: 300, quality: 'good' },
        { date: '2026-01-04', value: 300, quality: 'good' },
      ],
      humidity: [{ date: '2026-01-01', value: 0.5, quality: 'good' }],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('predicts and persists bloom date', async () => {
    const plant = {
      id: 'plant-1',
      nome: 'Umbuzeiro',
      nome_cientifico: 'Spondias tuberosa',
      descricao: 'Planta nativa da Caatinga',
      bloom_start: 1,
      bloom_end: 3,
      optimal_conditions: {
        temperature: [20, 30],
        rainfall: [200, 400],
      },
    };

    const result = await PredictionService.predictBloomDate(plant, 'region-1', -9.5, -40.2);

    expect(result.plantId).toBe('plant-1');
    expect(result.predictedDate).toBe('2026-01-17');
    expect(insertMock).toHaveBeenCalledTimes(1);
  });

  it('returns region predictions', async () => {
    const result = await PredictionService.getPredictionsForRegion('region-1');

    expect(result).toHaveLength(1);
    expect(eqMock).toHaveBeenCalledWith('regiao_id', 'region-1');
  });
});