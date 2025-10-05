import { useState } from 'react';
import { BarChart3, MapPin, Leaf, TrendingUp } from 'lucide-react';

export default function RegionComparison({ plants, regions }) {
  const [selectedRegion1, setSelectedRegion1] = useState('');
  const [selectedRegion2, setSelectedRegion2] = useState('');

  const getRegionStats = (regionId) => {
    const region = regions.find(r => r.id === regionId);
    const regionPlants = plants.filter(p => p.regiao_id === regionId);

    const families = new Set(regionPlants.map(p => p.family).filter(Boolean)).size;
    const threatened = regionPlants.filter(p =>
      ['VU', 'EN', 'CR'].includes(p.conservation_status || '')
    ).length;

    return {
      region,
      totalPlants: regionPlants.length,
      families,
      threatened,
      biodiversity: region?.biodiversity_index || 0
    };
  };

  const region1Stats = selectedRegion1 ? getRegionStats(selectedRegion1) : null;
  const region2Stats = selectedRegion2 ? getRegionStats(selectedRegion2) : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Comparar Regiões</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Região 1</label>
          <select
            value={selectedRegion1}
            onChange={(e) => setSelectedRegion1(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecione uma região</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.nome} ({region.state})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Região 2</label>
          <select
            value={selectedRegion2}
            onChange={(e) => setSelectedRegion2(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecione uma região</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.nome} ({region.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {region1Stats && region2Stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-700" />
              <h3 className="text-lg font-bold text-green-900">{region1Stats.region?.nome}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total de Plantas:</span>
                <span className="text-2xl font-bold text-green-700">{region1Stats.totalPlants}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Famílias Botânicas:</span>
                <span className="text-xl font-bold text-green-700">{region1Stats.families}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Ameaçadas:</span>
                <span className={`text-xl font-bold ${
                  region1Stats.threatened > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {region1Stats.threatened}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-green-300">
                <span className="text-gray-700 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Biodiversidade:
                </span>
                <span className="text-2xl font-bold text-green-700">
                  {region1Stats.biodiversity.toFixed(1)}/10
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-blue-900">{region2Stats.region?.nome}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total de Plantas:</span>
                <span className="text-2xl font-bold text-blue-700">{region2Stats.totalPlants}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Famílias Botânicas:</span>
                <span className="text-xl font-bold text-blue-700">{region2Stats.families}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Ameaçadas:</span>
                <span className={`text-xl font-bold ${
                  region2Stats.threatened > 0 ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {region2Stats.threatened}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-blue-300">
                <span className="text-gray-700 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Biodiversidade:
                </span>
                <span className="text-2xl font-bold text-blue-700">
                  {region2Stats.biodiversity.toFixed(1)}/10
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {region1Stats && region2Stats && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Análise Comparativa:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <Leaf className="w-4 h-4 inline mr-2 text-green-600" />
              <span className="font-medium">{region1Stats.region?.nome}</span> tem{' '}
              {region1Stats.totalPlants > region2Stats.totalPlants ? 'mais' : 'menos'}{' '}
              plantas catalogadas
            </li>
            <li>
              <TrendingUp className="w-4 h-4 inline mr-2 text-green-600" />
              Biodiversidade mais alta:{' '}
              <span className="font-medium">
                {region1Stats.biodiversity > region2Stats.biodiversity
                  ? region1Stats.region?.nome
                  : region2Stats.region?.nome}
              </span>
            </li>
            <li>
              <BarChart3 className="w-4 h-4 inline mr-2 text-green-600" />
              Maior diversidade de famílias:{' '}
              <span className="font-medium">
                {region1Stats.families > region2Stats.families
                  ? region1Stats.region?.nome
                  : region2Stats.families > region1Stats.families
                  ? region2Stats.region?.nome
                  : 'Empate'}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}