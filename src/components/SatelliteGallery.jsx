import { useState } from 'react';
import { Satellite, Calendar, Download, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function SatelliteGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // O valor da propriedade 'image' agora usa a variável importada.
  const images = [
    { id: '1', state: 'Alagoas', stateCode: 'AL', date: '29/08/2025', image: al_08_29, satellite: 'Terra' },
    { id: '2', state: 'Alagoas', stateCode: 'AL', date: '14/09/2025', image: al_09_14, satellite: 'Aqua' },
    { id: '3', state: 'Bahia', stateCode: 'BA', date: '29/08/2025', image: ba_08_29, satellite: 'Terra' },
    { id: '4', state: 'Bahia', stateCode: 'BA', date: '14/09/2025', image: ba_09_14, satellite: 'Aqua' },
    { id: '5', state: 'Ceará', stateCode: 'CE', date: '29/08/2025', image: ce_08_29, satellite: 'Terra' },
    { id: '6', state: 'Ceará', stateCode: 'CE', date: '14/09/2025', image: ce_09_14, satellite: 'Aqua' },
    { id: '7', state: 'Maranhão', stateCode: 'MA', date: '29/08/2025', image: ma_08_29, satellite: 'Terra' },
    { id: '8', state: 'Maranhão', stateCode: 'MA', date: '14/09/2025', image: ma_09_14, satellite: 'Aqua' },
    { id: '9', state: 'Pernambuco', stateCode: 'PE', date: '29/08/2025', image: pe_08_29, satellite: 'Terra' }
  ];

  const openImage = (img, idx) => {
    setSelectedImage(img);
    setCurrentIndex(idx);
  };

  const nextImage = () => {
    const newIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(newIdx);
    setSelectedImage(images[newIdx]);
  };

  const prevImage = () => {
    const newIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIdx);
    setSelectedImage(images[newIdx]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-lg shadow-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Satellite className="w-12 h-12 animate-bounce" />
          <h1 className="text-4xl font-bold">Galeria Satélite</h1>
        </div>
        <p className="text-xl">9 Imagens NDVI</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div key={img.id} onClick={() => openImage(img, idx)}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group">
            <div className="relative">
              <img src={img.image} alt={img.state} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100" />
              </div>
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{img.stateCode}</div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{img.state}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{img.date}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); window.open(img.image, '_blank'); }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 bg-white/10 text-white p-3 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 bg-white/10 text-white p-3 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 bg-white/10 text-white p-3 rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-6xl w-full bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <img src={selectedImage.image} alt={selectedImage.state} className="w-full h-full object-contain bg-gray-900" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedImage.state}</h2>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Data</p>
                    <p className="text-lg font-bold">{selectedImage.date}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Satélite</p>
                    <p className="text-lg font-bold">{selectedImage.satellite}</p>
                  </div>
                </div>
                <button onClick={() => window.open(selectedImage.image, '_blank')}
                  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <p className="text-xs text-gray-600 text-center mt-4">Imagem {currentIndex + 1} de {images.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}