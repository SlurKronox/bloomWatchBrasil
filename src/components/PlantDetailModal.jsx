import { X, MapPin, Calendar, Shield, Droplets, Thermometer, Info, Leaf, Users, Heart, BookOpen, Sparkles } from 'lucide-react';

export default function PlantDetailModal({ plant, region, onClose }) {
  const getMonthName = (month) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month - 1] || '';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'LC': { color: 'bg-green-100 text-green-800 border-green-300', label: 'Pouco Preocupante', icon: '✅' },
      'NT': { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Quase Ameaçada', icon: '⚠️' },
      'VU': { color: 'bg-orange-100 text-orange-800 border-orange-300', label: 'Vulnerável', icon: '🟠' },
      'EN': { color: 'bg-red-100 text-red-800 border-red-300', label: 'Em Perigo', icon: '🔴' },
      'CR': { color: 'bg-red-200 text-red-900 border-red-400', label: 'Criticamente em Perigo', icon: '🆘' }
    };
    return badges[status] || badges['LC'];
  };

  const statusInfo = getStatusBadge(plant.conservation_status || 'LC');
  const optimalConditions = plant.optimal_conditions;

  // Safely parse arrays
  const polinizadores = Array.isArray(plant.polinizadores) ? plant.polinizadores : [];
  const usos = Array.isArray(plant.usos) ? plant.usos : [];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-5 flex items-center justify-between z-10 shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">{plant.cor_flor || '🌸'}</span>
              {plant.nome}
            </h2>
            <p className="text-emerald-100 text-lg italic mt-1">{plant.nome_cientifico}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Fechar"
          >
            <X className="w-7 h-7 text-white" />
          </button>
        </div>

        <div className="p-6">
          {/* Image */}
          {plant.image_url && (
            <div className="relative group mb-6">
              <img
                src={plant.image_url}
                alt={plant.nome}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-semibold text-lg">{plant.nome} - {plant.nome_cientifico}</p>
              </div>
            </div>
          )}

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Conservation Status */}
            <div className={`${statusInfo.color} border-2 rounded-xl p-4 text-center`}>
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl mb-1">{statusInfo.icon}</div>
              <div className="font-bold">{statusInfo.label}</div>
              <div className="text-xs mt-1 opacity-75">Estado de Conservação</div>
            </div>

            {/* Family */}
            {plant.family && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-center text-purple-900">
                <Leaf className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold text-lg">{plant.family}</div>
                <div className="text-xs mt-1 opacity-75">Família Botânica</div>
              </div>
            )}

            {/* Bloom Period */}
            {plant.bloom_start && plant.bloom_end && (
              <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4 text-center text-pink-900">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold text-sm">
                  {getMonthName(plant.bloom_start)} - {getMonthName(plant.bloom_end)}
                </div>
                <div className="text-xs mt-1 opacity-75">Período de Floração</div>
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Descrição
                </h3>
                <p className="text-gray-700 leading-relaxed">{plant.descricao}</p>
              </div>

              {/* Location */}
              {region && (
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Localização
                  </h3>
                  <div className="space-y-2 text-blue-900">
                    <p className="font-semibold text-lg">{region.nome}</p>
                    <p className="text-sm">📍 {region.state || 'Brasil'}</p>
                    <p className="text-sm">🌡️ Clima: {region.climate_zone?.replace(/_/g, ' ')}</p>
                    {region.biodiversity_index && (
                      <p className="text-sm">🌿 Biodiversidade: {region.biodiversity_index.toFixed(1)}/10</p>
                    )}
                  </div>
                </div>
              )}

              {/* Optimal Conditions */}
              {optimalConditions && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-amber-600" />
                    Condições Ideais de Cultivo
                  </h3>
                  <div className="space-y-3">
                    {optimalConditions.temperature && (
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🌡️</span>
                          <span className="font-semibold text-gray-800">Temperatura</span>
                        </div>
                        <span className="text-red-700 font-bold">
                          {optimalConditions.temperature[0]}°C - {optimalConditions.temperature[1]}°C
                        </span>
                      </div>
                    )}

                    {optimalConditions.rainfall && (
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💧</span>
                          <span className="font-semibold text-gray-800">Precipitação</span>
                        </div>
                        <span className="text-blue-700 font-bold">
                          {optimalConditions.rainfall[0]} - {optimalConditions.rainfall[1]} mm/ano
                        </span>
                      </div>
                    )}

                    {optimalConditions.humidity && (
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💦</span>
                          <span className="font-semibold text-gray-800">Umidade</span>
                        </div>
                        <span className="text-cyan-700 font-bold">
                          {optimalConditions.humidity[0]}% - {optimalConditions.humidity[1]}%
                        </span>
                      </div>
                    )}

                    {optimalConditions.soil && (
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🌱</span>
                          <span className="font-semibold text-gray-800">Solo</span>
                        </div>
                        <span className="text-amber-700 font-bold capitalize">
                          {optimalConditions.soil.replace(/-/g, ' ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Pollinators */}
              {polinizadores.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-yellow-600" />
                    Polinizadores
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {polinizadores.map((pol, idx) => (
                      <span
                        key={idx}
                        className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        🐝 {pol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Uses */}
              {usos.length > 0 && (
                <div className="bg-green-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    Usos e Aplicações
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {usos.map((uso, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 border border-green-300 text-green-900 px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        ✨ {uso}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fruiting Season */}
              {plant.epoca_frutificacao && (
                <div className="bg-indigo-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Época de Frutificação
                  </h3>
                  <p className="text-indigo-800 font-semibold">🍎 {plant.epoca_frutificacao}</p>
                </div>
              )}

              {/* Ecological Importance */}
              {plant.importancia_ecologica && (
                <div className="bg-teal-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-teal-900 mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-teal-600" />
                    Importância Ecológica
                  </h3>
                  <p className="text-teal-800 leading-relaxed">{plant.importancia_ecologica}</p>
                </div>
              )}

              {/* Medicinal Use */}
              {plant.uso_medicinal && (
                <div className="bg-rose-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">💊</span>
                    Uso Medicinal
                  </h3>
                  <p className="text-rose-800 leading-relaxed">{plant.uso_medicinal}</p>
                </div>
              )}

              {/* Recipes */}
              {plant.receitas && (
                <div className="bg-orange-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🍽️</span>
                    Receitas e Usos Culinários
                  </h3>
                  <p className="text-orange-800 leading-relaxed">{plant.receitas}</p>
                </div>
              )}
            </div>
          </div>

          {/* Curiosities and Legends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {plant.curiosidade && (
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-violet-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  Curiosidades
                </h3>
                <p className="text-violet-800 leading-relaxed italic">{plant.curiosidade}</p>
              </div>
            )}

            {plant.lenda && (
              <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-fuchsia-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📖</span>
                  Lendas e Histórias
                </h3>
                <p className="text-fuchsia-800 leading-relaxed italic">{plant.lenda}</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border-2 border-emerald-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-emerald-700" />
                <div>
                  <p className="font-semibold text-emerald-900">BloomWatch Brasil</p>
                  <p className="text-sm text-emerald-700">Conservação da Biodiversidade Brasileira</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-emerald-700">Dados científicos validados</p>
                <p className="text-xs text-emerald-600">Flora do Brasil 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}