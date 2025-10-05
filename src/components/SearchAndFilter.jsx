import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function SearchAndFilter({ plants, regions, onFilteredResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [bloomMonth, setBloomMonth] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const families = Array.from(new Set(plants.map(p => p.family).filter(Boolean)));
  const statuses = ['LC', 'NT', 'EN', 'CR', 'VU'];
  const months = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  const applyFilters = () => {
    let filtered = [...plants];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.nome.toLowerCase().includes(lower) ||
          p.nome_cientifico.toLowerCase().includes(lower) ||
          p.descricao.toLowerCase().includes(lower)
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(p => p.regiao_id === selectedRegion);
    }

    if (selectedFamily) {
      filtered = filtered.filter(p => p.family === selectedFamily);
    }

    if (selectedStatus) {
      filtered = filtered.filter(p => p.conservation_status === selectedStatus);
    }

    if (bloomMonth) {
      const month = parseInt(bloomMonth);
      filtered = filtered.filter(p => {
        const start = p.bloom_start || 1;
        const end = p.bloom_end || 12;
        if (start <= end) {
          return month >= start && month <= end;
        } else {
          return month >= start || month <= end;
        }
      });
    }

    onFilteredResults(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedFamily('');
    setSelectedStatus('');
    setBloomMonth('');
    onFilteredResults(plants);
  };

  const hasActiveFilters = searchTerm || selectedRegion || selectedFamily || selectedStatus || bloomMonth;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar plantas por nome, nome científico ou descrição..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setTimeout(applyFilters, 300);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filtros
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <X className="w-5 h-5" />
            Limpar
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Região</label>
            <select
              value={selectedRegion}
              onChange={e => {
                setSelectedRegion(e.target.value);
                setTimeout(applyFilters, 100);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todas as regiões</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Família Botânica</label>
            <select
              value={selectedFamily}
              onChange={e => {
                setSelectedFamily(e.target.value);
                setTimeout(applyFilters, 100);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todas as famílias</option>
              {families.map(family => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status de Conservação</label>
            <select
              value={selectedStatus}
              onChange={e => {
                setSelectedStatus(e.target.value);
                setTimeout(applyFilters, 100);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mês de Floração</label>
            <select
              value={bloomMonth}
              onChange={e => {
                setBloomMonth(e.target.value);
                setTimeout(applyFilters, 100);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todos os meses</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {plants.length} resultado(s)
        </div>
      )}
    </div>
  );
}