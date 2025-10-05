import { Download, FileJson, FileSpreadsheet, FileText } from 'lucide-react';
import { ExportService } from '../services/exportService.js';

export default function ExportButtons({ plants, regions }) {
  const handleExportCSV = () => {
    ExportService.downloadCSV(plants, regions);
  };

  const handleExportPDF = async () => {
    await ExportService.exportToPDF(plants, regions);
  };

  const handleExportJSON = () => {
    ExportService.downloadJSON({ plants, regions }, 'bloomwatch-complete-data.json');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-green-600" />
        Exportar Dados
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Exportar CSV
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-5 h-5" />
          Exportar PDF
        </button>
        <button
          onClick={handleExportJSON}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FileJson className="w-5 h-5" />
          Exportar JSON
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Exportando {plants.length} plantas de {regions.length} regiões
      </p>
    </div>
  );
}