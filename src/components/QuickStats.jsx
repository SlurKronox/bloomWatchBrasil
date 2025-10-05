import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function QuickStats({ plants }) {
  const totalPlants = plants.length;
  const familiesCount = new Set(plants.map(p => p.family).filter(Boolean)).size;

  const conservationCounts = plants.reduce((acc, plant) => {
    const status = plant.conservation_status || 'LC';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const threatenedCount = (conservationCounts['VU'] || 0) +
                          (conservationCounts['EN'] || 0) +
                          (conservationCounts['CR'] || 0);

  const currentMonth = new Date().getMonth() + 1;
  const bloomingNow = plants.filter(plant => {
    const start = plant.bloom_start || 1;
    const end = plant.bloom_end || 12;
    if (start <= end) {
      return currentMonth >= start && currentMonth <= end;
    } else {
      return currentMonth >= start || currentMonth <= end;
    }
  }).length;

  const stats = [
    {
      label: 'Total de Espécies',
      value: totalPlants,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: `${familiesCount} famílias`
    },
    {
      label: 'Em Floração Agora',
      value: bloomingNow,
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: 'no mês atual'
    },
    {
      label: 'Ameaçadas',
      value: threatenedCount,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'VU, EN, CR'
    },
    {
      label: 'Conservação OK',
      value: conservationCounts['LC'] || 0,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: 'Pouco preocupante'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-5 border-l-4"
            style={{ borderColor: stat.color.replace('text-', '') }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</h3>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}