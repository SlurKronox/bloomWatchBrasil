import { useState, useEffect } from 'react';
import { Leaf, BarChart3, Map as MapIcon, Satellite, Image, ImageIcon } from 'lucide-react';
import SearchAndFilter from './components/SearchAndFilter.jsx';
import ExportButtons from './components/ExportButtons.jsx';
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';
import NASADashboard from './components/NASADashboard.jsx';
import SatelliteGallery from './components/SatelliteGallery.jsx';
// REMOVIDO: import Galeria from './components/Galeria.jsx';
import MapView from './components/MapView.jsx';
import QuickStats from './components/QuickStats.jsx';
import RegionComparison from './components/RegionComparison.jsx';
import PlantDetailModal from './components/PlantDetailModal.jsx';
import { supabase } from './lib/supabaseClient.js';

function AppV2() {
  const [plants, setPlants] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [{ data: plantsData, error: plantsError }, { data: regionsData, error: regionsError }] =
        await Promise.all([
          supabase.from('plantas').select('*'),
          supabase.from('regioes').select('*')
        ]);

      if (plantsError) throw plantsError;
      if (regionsError) throw regionsError;

      setPlants(plantsData || []);
      setFilteredPlants(plantsData || []);
      setRegions(regionsData || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl text-gray-700">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Erro: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">BloomWatch Brasil</h1>
                <p className="text-green-100 text-sm">
                  Monitoramento de Plantas Nativas v2.0
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'browse'
                    ? 'bg-white text-green-700'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                <Leaf className="w-5 h-5 inline mr-2" />
                Explorar
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'map'
                    ? 'bg-white text-green-700'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                <MapIcon className="w-5 h-5 inline mr-2" />
                Mapa
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-white text-green-700'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                <BarChart3 className="w-5 h-5 inline mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('nasa')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'nasa'
                    ? 'bg-white text-red-700'
                    : 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                }`}
              >
                <Satellite className="w-5 h-5 inline mr-2" />
                NASA
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-white text-cyan-700'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700'
                }`}
              >
                <Image className="w-5 h-5 inline mr-2" />
                Galeria
              </button>
              {/* O botão "Galeria 2" foi removido */}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'map' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mapa Interativo do Brasil</h2>
              <p className="text-gray-600 mb-4">Clique em uma região para ver as plantas nativas da área</p>
              <MapView
                regions={regions}
                onRegionClick={(id) => {
                  setSelectedRegionId(id);
                  const regionPlants = plants.filter(p => p.regiao_id === id);
                  setFilteredPlants(regionPlants);
                }}
                selectedRegionId={selectedRegionId}
              />
            </div>

            {selectedRegionId && filteredPlants.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Plantas da Região: {regions.find(r => r.id === selectedRegionId)?.nome}
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedRegionId(null);
                      setFilteredPlants(plants);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Limpar Seleção
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlants.map(plant => {
                    const region = regions.find(r => r.id === plant.regiao_id);
                    return (
                      <div
                        key={plant.id}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 shadow hover:shadow-lg transition-shadow border border-green-200"
                      >
                        {plant.image_url && (
                          <img
                            src={plant.image_url}
                            alt={plant.nome}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{plant.nome}</h3>
                          <span className="text-2xl">{plant.cor_flor || '🌸'}</span>
                        </div>
                        <p className="text-sm italic text-green-700 mb-3">{plant.nome_cientifico}</p>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{plant.descricao}</p>

                        <div className="space-y-2 text-sm">
                          {plant.family && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Família:</span>
                              <span className="font-medium text-gray-800">{plant.family}</span>
                            </div>
                          )}
                          {plant.conservation_status && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Conservação:</span>
                              <span className={`font-medium px-2 py-1 rounded ${
                                plant.conservation_status === 'LC' ? 'bg-green-200 text-green-800' :
                                plant.conservation_status === 'NT' ? 'bg-yellow-200 text-yellow-800' :
                                plant.conservation_status === 'EN' ? 'bg-red-200 text-red-800' :
                                'bg-gray-200 text-gray-800'
                              }`}>
                                {plant.conservation_status}
                              </span>
                            </div>
                          )}
                          {plant.bloom_start && plant.bloom_end && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Floração:</span>
                              <span className="font-medium text-gray-800">
                                {getMonthName(plant.bloom_start)} - {getMonthName(plant.bloom_end)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'browse' ? (
          <div className="space-y-6">
            <QuickStats plants={plants} />

            <SearchAndFilter
              plants={plants}
              regions={regions}
              onFilteredResults={setFilteredPlants}
            />

            <ExportButtons plants={filteredPlants} regions={regions} />

            <RegionComparison plants={plants} regions={regions} />

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Plantas Nativas do Brasil
                </h2>
                <span className="text-gray-600">
                  {filteredPlants.length} de {plants.length} plantas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.map(plant => {
                  const region = regions.find(r => r.id === plant.regiao_id);
                  return (
                    <div
                      key={plant.id}
                      onClick={() => setSelectedPlant(plant)}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 shadow hover:shadow-lg transition-all border border-green-200 cursor-pointer hover:scale-105"
                    >
                      {plant.image_url && (
                        <img
                          src={plant.image_url}
                          alt={plant.nome}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{plant.nome}</h3>
                        <span className="text-2xl">{plant.cor_flor || '🌸'}</span>
                      </div>
                      <p className="text-sm italic text-green-700 mb-3">{plant.nome_cientifico}</p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{plant.descricao}</p>

                      <div className="space-y-2 text-sm">
                        {plant.family && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Família:</span>
                            <span className="font-medium text-gray-800">{plant.family}</span>
                          </div>
                        )}
                        {region && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Região:</span>
                            <span className="font-medium text-gray-800">{region.nome}</span>
                          </div>
                        )}
                        {plant.conservation_status && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Conservação:</span>
                            <span className={`font-medium px-2 py-1 rounded ${
                              plant.conservation_status === 'LC' ? 'bg-green-200 text-green-800' :
                              plant.conservation_status === 'NT' ? 'bg-yellow-200 text-yellow-800' :
                              plant.conservation_status === 'EN' ? 'bg-red-200 text-red-800' :
                              'bg-gray-200 text-gray-800'
                            }`}>
                              {plant.conservation_status}
                            </span>
                          </div>
                        )}
                        {plant.bloom_start && plant.bloom_end && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Floração:</span>
                            <span className="font-medium text-gray-800">
                              {getMonthName(plant.bloom_start)} - {getMonthName(plant.bloom_end)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPlants.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Nenhuma planta encontrada com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'nasa' ? (
          <NASADashboard />
        ) : activeTab === 'gallery' ? (
          <SatelliteGallery />
        ) : (
          <AnalyticsDashboard plants={plants} regions={regions} />
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">BloomWatch Brasil v2.0</p>
            <p className="text-gray-400 text-sm">
              Sistema completo de monitoramento de plantas nativas brasileiras
            </p>
            <p className="text-gray-500 text-xs mt-4">
              {plants.length} plantas | {regions.length} regiões | Integração NASA APIs
            </p>
          </div>
        </div>
      </footer>

      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          region={regions.find(r => r.id === selectedPlant.regiao_id)}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
}

function getMonthName(month) {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  return months[month - 1] || '';
}

export default AppV2;