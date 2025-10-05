// slurkronox/bloomwatch-brasil-techers/bloomwatch-brasil-techers-ac71067e3e30b0cb7c9e5e21329805911e61af62/src/services/exportService.js
// Tipos removidos

export class ExportService {
  static exportToCSV(plants, regions) {
    const headers = [
      'Plant Name',
      'Scientific Name',
      'Family',
      'Conservation Status',
      'Bloom Start Month',
      'Bloom End Month',
      'Region',
      'State',
      'Climate Zone',
      'Biodiversity Index',
      'Description'
    ];

    const rows = plants.map(plant => {
      const region = regions.find(r => r.id === plant.regiao_id);
      return [
        plant.nome,
        plant.nome_cientifico,
        plant.family || '',
        plant.conservation_status || 'LC',
        plant.bloom_start || 1,
        plant.bloom_end || 12,
        region?.nome || '',
        region?.state || '',
        region?.climate_zone || '',
        region?.biodiversity_index || '',
        plant.descricao.replace(/"/g, '""')
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  static downloadCSV(plants, regions, filename = 'bloomwatch-data.csv') {
    const csvContent = this.exportToCSV(plants, regions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async exportToPDF(plants, regions) {
    const content = this.generatePDFContent(plants, regions);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export PDF');
      return;
    }

    printWindow.document.write(content);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  }

  static generatePDFContent(plants, regions) {
    const regionMap = new Map(regions.map(r => [r.id, r]));

    const plantsByRegion = plants.reduce((acc, plant) => {
      const regionId = plant.regiao_id || 'unknown';
      if (!acc[regionId]) acc[regionId] = [];
      acc[regionId].push(plant);
      return acc;
    }, {});

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>BloomWatch Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #059669;
              border-bottom: 3px solid #059669;
              padding-bottom: 10px;
            }
            h2 {
              color: #047857;
              margin-top: 30px;
              border-bottom: 2px solid #d1fae5;
              padding-bottom: 5px;
            }
            .plant {
              margin: 15px 0;
              padding: 15px;
              background: #f0fdf4;
              border-left: 4px solid #059669;
              page-break-inside: avoid;
            }
            .plant-name {
              font-size: 18px;
              font-weight: bold;
              color: #047857;
            }
            .scientific-name {
              font-style: italic;
              color: #059669;
              margin: 5px 0;
            }
            .plant-details {
              margin: 10px 0;
              line-height: 1.6;
            }
            .label {
              font-weight: bold;
              color: #065f46;
            }
            .region-info {
              background: #ecfdf5;
              padding: 10px;
              margin: 15px 0;
              border-radius: 5px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              border-top: 1px solid #d1d5db;
              padding-top: 20px;
            }
            @media print {
              body {
                padding: 15px;
              }
              .plant {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <h1>BloomWatch - Native Brazilian Plants Report</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString('pt-BR')} at ${new Date().toLocaleTimeString('pt-BR')}</p>
          <p><strong>Total Plants:</strong> ${plants.length} | <strong>Total Regions:</strong> ${regions.length}</p>

          ${Object.entries(plantsByRegion).map(([regionId, regionPlants]) => {
            const region = regionMap.get(regionId);
            if (!region) return '';

            return `
              <h2>${region.nome} - ${region.state}</h2>
              <div class="region-info">
                <p><span class="label">Climate Zone:</span> ${region.climate_zone}</p>
                <p><span class="label">Biodiversity Index:</span> ${region.biodiversity_index}/10</p>
                <p><span class="label">Description:</span> ${region.descricao}</p>
              </div>

              ${regionPlants.map(plant => `
                <div class="plant">
                  <div class="plant-name">${plant.nome}</div>
                  <div class="scientific-name">${plant.nome_cientifico}</div>
                  <div class="plant-details">
                    <p><span class="label">Family:</span> ${plant.family || 'N/A'}</p>
                    <p><span class="label">Conservation Status:</span> ${plant.conservation_status || 'LC'}</p>
                    <p><span class="label">Bloom Period:</span> ${this.getMonthName(plant.bloom_start || 1)} to ${this.getMonthName(plant.bloom_end || 12)}</p>
                    <p><span class="label">Description:</span> ${plant.descricao}</p>
                  </div>
                </div>
              `).join('')}
            `;
          }).join('')}

          <div class="footer">
            <p>BloomWatch - Monitoring Native Brazilian Plant Blooms</p>
            <p>Data generated from the BloomWatch database</p>
          </div>
        </body>
      </html>
    `;

    return htmlContent;
  }

  static getMonthName(month) {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[month - 1] || 'Unknown';
  }

  static exportRegionsToJSON(regions) {
    return JSON.stringify(regions, null, 2);
  }

  static exportPlantsToJSON(plants) {
    return JSON.stringify(plants, null, 2);
  }

  static downloadJSON(data, filename = 'bloomwatch-data.json') {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}