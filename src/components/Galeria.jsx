import { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

// Importação das Imagens
import al_08_29 from '../assets/Nor/AL/mapa_ndvi_AL_2025-08-29.png';
import al_09_14 from '../assets/Nor/AL/mapa_ndvi_AL_2025-09-14.png';
import ba_08_29 from '../assets/Nor/BA/mapa_ndvi_BA_2025-08-29.png';
import ba_09_14 from '../assets/Nor/BA/mapa_ndvi_BA_2025-09-14.png';
import ce_08_29 from '../assets/Nor/CE/mapa_ndvi_Ce_2025-08-29.png';
import ce_09_14 from '../assets/Nor/CE/mapa_ndvi_Ce_2025-09-14.png';
import ma_08_29 from '../assets/Nor/MA/mapa_ndvi_MA_2025-08-29.png';
import ma_09_14 from '../assets/Nor/MA/mapa_ndvi_MA_2025-09-14.png';
import pe_08_29 from '../assets/Nor/PE/mapa_ndvi_PE_2025-08-29.png';

export default function Galeria() {
  const [searchQuery, setSearchQuery] = useState('');

  // O valor da propriedade 'image' agora usa a variável importada.
  const images = [
    { id: 1, title: 'Alagoas 29/08', image: al_08_29, state: 'AL' },
    { id: 2, title: 'Alagoas 14/09', image: al_09_14, state: 'AL' },
    { id: 3, title: 'Bahia 29/08', image: ba_08_29, state: 'BA' },
    { id: 4, title: 'Bahia 14/09', image: ba_09_14, state: 'BA' },
    { id: 5, title: 'Ceará 29/08', image: ce_08_29, state: 'CE' },
    { id: 6, title: 'Ceará 14/09', image: ce_09_14, state: 'CE' },
    { id: 7, title: 'Maranhão 29/08', image: ma_08_29, state: 'MA' },
    { id: 8, title: 'Maranhão 14/09', image: ma_09_14, state: 'MA' },
    { id: 9, title: 'Pernambuco 29/08', image: pe_08_29, state: 'PE' }
  ];

  const filteredImages = images.filter(img =>
    img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="max-w-7xl mx-auto space-y-3">

        <header className="flex justify-end gap-3 items-center">
          <button className="w-9 h-9 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-9 h-9 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-9 h-9 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 min-h-[100px] flex items-end shadow-lg">
            <span className="text-white font-semibold text-lg">Total: {images.length}</span>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 min-h-[100px] flex items-end shadow-lg">
            <span className="text-white font-semibold text-lg">Estados: 5</span>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 min-h-[100px] flex items-end shadow-lg">
            <span className="text-white font-semibold text-lg">NASA MODIS</span>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 min-h-[100px] flex items-end shadow-lg">
            <span className="text-white font-semibold text-lg">Filtrados: {filteredImages.length}</span>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-6 min-h-[150px] flex flex-col items-center justify-center shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Imagens de Satélite</h3>
            <p className="text-gray-600 text-center">Dados NDVI do Nordeste Brasileiro</p>
          </div>
          <div className="bg-white rounded-xl p-6 min-h-[150px] flex flex-col items-center justify-center shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Resolução 250m</h3>
            <p className="text-gray-600 text-center">Atualização a cada 16 dias</p>
          </div>
        </section>

        <section className="w-full">
          <div className="w-full h-48 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">GALERIA NASA</h2>
              <p className="text-lg opacity-90">Monitoramento por Satélite</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gray-200 rounded-lg h-14 flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer">
            Terra
          </div>
          <div className="bg-gray-200 rounded-lg h-14 flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer">
            Aqua
          </div>
          <div className="bg-gray-200 rounded-lg h-14 flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer">
            NDVI
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg flex-shrink-0">
            S
          </div>
          <div className="flex-1 bg-white rounded-full shadow-md px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Pesquisar estados, datas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 outline-none text-sm bg-transparent"
            />
          </div>
          <button className="bg-gray-200 rounded-lg px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300 transition-colors">
            Filtrar
          </button>
          <button className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
            Download
          </button>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
              onClick={() => window.open(img.image, '_blank')}
            >
              <div className="relative">
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {img.state}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{img.title}</h3>
                <p className="text-sm text-gray-600">Clique para ampliar</p>
              </div>
            </div>
          ))}
        </section>

        {filteredImages.length === 0 && (
          <div className="bg-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-600 text-lg">Nenhuma imagem encontrada para &quot;{searchQuery}&quot;</p>
          </div>
        )}

        <footer className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          <div className="bg-gray-300 rounded-lg min-h-[80px] flex items-center justify-center font-semibold text-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600">BloomWatch Brasil</p>
              <p className="font-bold">Sistema de Monitoramento</p>
            </div>
          </div>
          <div className="bg-gray-300 rounded-lg min-h-[80px] flex items-center justify-center font-semibold text-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600">Dados NASA MODIS</p>
              <p className="font-bold">Atualização: 2025</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
