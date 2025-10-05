import { BarChart3, TrendingUp, Leaf, MapPin } from 'lucide-react';

export default function AnalyticsDashboard({ plants, regions }) {
  const getStatsByFamily = () => {
    const familyCount = {};
    plants.forEach(plant => {
      const family = plant.family || 'Unknown';
      familyCount[family] = (familyCount[family] || 0) + 1;
    });
    return Object.entries(familyCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const getStatsByConservation = () => {
    const statusCount = {};
    plants.forEach(plant => {
      const status = plant.conservation_status || 'LC';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    return statusCount;
  };

  const getStatsByClimate = () => {
    const climateCount = {};
    regions.forEach(region => {
      const climate = region.climate_zone || 'unknown';
      climateCount[climate] = (climateCount[climate] || 0) + 1;
    });
    return Object.entries(climateCount).sort((a, b) => b[1] - a[1]);
  };

  const getBloomingByMonth = () => {
    const monthCount = {};
    for (let i = 1; i <= 12; i++) {
      monthCount[i] = 0;
    }

    plants.forEach(plant => {
      const start = plant.bloom_start || 1;
      const end = plant.bloom_end || 12;

      if (start <= end) {
        for (let m = start; m <= end; m++) {
          monthCount[m]++;
        }
      } else {
        for (let m = start; m <= 12; m++) {
          monthCount[m]++;
        }
        for (let m = 1; m <= end; m++) {
          monthCount[m]++;
        }
      }
    });

    return monthCount;
  };

  const familyStats = getStatsByFamily();
  const conservationStats = getStatsByConservation();
  const climateStats = getStatsByClimate();
  const bloomingByMonth = getBloomingByMonth();

  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const avgBiodiversity = regions.reduce((sum, r) => sum + (r.biodiversity_index || 0), 0) / regions.length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'LC': return 'text-green-600 bg-green-100';
      case 'NT': return 'text-yellow-600 bg-yellow-100';
      case 'VU': return 'text-orange-600 bg-orange-100';
      case 'EN': return 'text-red-600 bg-red-100';
      case 'CR': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const maxBloomCount = Math.max(...Object.values(bloomingByMonth));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Dashboard de Análises
        </h2>
        <p className="text-green-100">Estatísticas e insights sobre a biodiversidade brasileira</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Plantas</p>
              <p className="text-3xl font-bold text-gray-800">{plants.length}</p>
            </div>
            <Leaf className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Regiões Monitoradas</p>
              <p className="text-3xl font-bold text-gray-800">{regions.length}</p>
            </div>
            <MapPin className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Famílias Botânicas</p>
              <p className="text-3xl font-bold text-gray-800">{new Set(plants.map(p => p.family)).size}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Biodiversidade Média</p>
              <p className="text-3xl font-bold text-gray-800">{avgBiodiversity.toFixed(1)}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-emerald-500 opacity-20" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Famílias Botânicas</h3>
          <div className="space-y-3">
            {familyStats.map(([family, count]) => (
              <div key={family}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{family}</span>
                  <span className="text-gray-600">{count} plantas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(count / plants.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status de Conservação</h3>
          <div className="space-y-2">
            {Object.entries(conservationStats).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                  {status}
                </span>
                <span className="text-gray-700 font-medium">{count} plantas</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Florações por Mês</h3>
        <div className="flex items-end justify-between h-48 gap-2">
          {Object.entries(bloomingByMonth).map(([month, count]) => (
            <div key={month} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-green-600 rounded-t transition-all hover:bg-green-700"
                style={{ height: `${(count / maxBloomCount) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-xs text-gray-600 mt-2">{monthNames[parseInt(month) - 1]}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Quantidade de espécies em floração por mês do ano
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Zonas Climáticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {climateStats.map(([climate, count]) => (
            <div key={climate} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 capitalize">{climate.replace(/_/g, ' ')}</p>
              <p className="text-2xl font-bold text-blue-700">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}