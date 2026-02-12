import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ regions, onRegionClick, selectedRegionId }) {
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const [showLegend, setShowLegend] = useState(true);
  const [mapStyle, setMapStyle] = useState('streets');

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map-v2', {
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: true,
      }).setView([-15.0, -52.0], 4);

      // Add zoom control to top right
      L.control.zoom({ position: 'topright' }).addTo(mapRef.current);

      // Initial tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 3,
      }).addTo(mapRef.current);
    }

    const markers = markersRef.current;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers.clear();

    // Add markers for each region
    regions.forEach(region => {
      const isSelected = region.id === selectedRegionId;

      const getMarkerColor = (biodiversity) => {
        if (biodiversity >= 9.5) return '#065f46';
        if (biodiversity >= 9.0) return '#059669';
        if (biodiversity >= 8.5) return '#10b981';
        if (biodiversity >= 8.0) return '#34d399';
        if (biodiversity >= 7.5) return '#6ee7b7';
        return '#a7f3d0';
      };

      const getBiodiversityLabel = (biodiversity) => {
        if (biodiversity >= 9.5) return 'Excepcional';
        if (biodiversity >= 9.0) return 'Muito Alta';
        if (biodiversity >= 8.5) return 'Alta';
        if (biodiversity >= 8.0) return 'Boa';
        if (biodiversity >= 7.5) return 'Moderada';
        return 'Regular';
      };

      const biodiversityValue = region.biodiversity_index || 8.0;
      const marker = L.circleMarker([region.latitude, region.longitude], {
        radius: isSelected ? 18 : 14,
        fillColor: isSelected ? '#dc2626' : getMarkerColor(biodiversityValue),
        color: '#fff',
        weight: isSelected ? 4 : 2,
        opacity: 1,
        fillOpacity: isSelected ? 1 : 0.85,
      }).addTo(mapRef.current);

      // Enhanced popup content
      const popupContent = `
        <div style="min-width: 280px; max-width: 320px; font-family: system-ui;">
          <div style="
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            margin: -12px -12px 12px -12px;
            padding: 16px;
            border-radius: 8px 8px 0 0;
          ">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 24px;">📍</span>
              <strong style="font-size: 18px; color: white; flex: 1;">
                ${region.nome}
              </strong>
            </div>
            <div style="color: #d1fae5; font-size: 13px;">
              📌 ${region.state || 'Brasil'} • ${(region.climate_zone || 'tropical').replace(/_/g, ' ')}
            </div>
          </div>

          <div style="
            margin: 12px 0;
            padding: 12px;
            background: #f9fafb;
            border-radius: 8px;
            font-size: 13px;
            color: #374151;
            line-height: 1.6;
          ">
            ${region.descricao || 'Região monitorada do projeto BloomWatch Brasil'}
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0;">
            <div style="
              text-align: center;
              background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
              padding: 12px;
              border-radius: 8px;
              border: 2px solid #a7f3d0;
            ">
              <div style="color: #6b7280; font-size: 11px; margin-bottom: 4px;">BIODIVERSIDADE</div>
              <div style="color: #059669; font-weight: bold; font-size: 24px; margin-bottom: 2px;">
                ${biodiversityValue.toFixed(1)}
              </div>
              <div style="color: #047857; font-size: 10px; font-weight: 600;">
                ${getBiodiversityLabel(biodiversityValue)}
              </div>
            </div>

            <div style="
              text-align: center;
              background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
              padding: 12px;
              border-radius: 8px;
              border: 2px solid #bfdbfe;
            ">
              <div style="color: #6b7280; font-size: 11px; margin-bottom: 4px;">COORDENADAS</div>
              <div style="color: #1e40af; font-size: 11px; font-weight: 600; margin-bottom: 2px;">
                ${region.latitude.toFixed(4)}°
              </div>
              <div style="color: #1e40af; font-size: 11px; font-weight: 600;">
                ${region.longitude.toFixed(4)}°
              </div>
            </div>
          </div>

          <div style="
            display: flex;
            gap: 6px;
            margin: 12px 0;
            font-size: 11px;
            justify-content: space-between;
          ">
            <div style="
              flex: 1;
              text-align: center;
              padding: 8px 4px;
              background: #fef3c7;
              border-radius: 6px;
            ">
              <div style="color: #92400e;">🌡️ Clima</div>
              <div style="font-weight: bold; color: #78350f; margin-top: 2px;">
                ${(region.climate_zone || 'tropical').substring(0, 8)}
              </div>
            </div>
            <div style="
              flex: 1;
              text-align: center;
              padding: 8px 4px;
              background: #e0e7ff;
              border-radius: 6px;
            ">
              <div style="color: #3730a3;">🌿 Bioma</div>
              <div style="font-weight: bold; color: #312e81; margin-top: 2px;">
                Principal
              </div>
            </div>
            <div style="
              flex: 1;
              text-align: center;
              padding: 8px 4px;
              background: #fce7f3;
              border-radius: 6px;
            ">
              <div style="color: #9f1239;">📊 Status</div>
              <div style="font-weight: bold; color: #881337; margin-top: 2px;">
                Ativa
              </div>
            </div>
          </div>

          <button
            onclick="window.selectRegionV2('${region.id}')"
            style="
              width: 100%;
              background: linear-gradient(135deg, #059669 0%, #047857 100%);
              color: white;
              border: none;
              padding: 12px 16px;
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
              font-weight: 700;
              margin-top: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              transition: all 0.2s;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            "
            onmouseover="
              this.style.transform='translateY(-2px)';
              this.style.boxShadow='0 6px 12px rgba(5, 150, 105, 0.3)';
              this.style.background='linear-gradient(135deg, #10b981 0%, #059669 100%)';
            "
            onmouseout="
              this.style.transform='translateY(0)';
              this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)';
              this.style.background='linear-gradient(135deg, #059669 0%, #047857 100%)';
            "
          >
            <span style="font-size: 18px;">🌺</span>
            <span>VER PLANTAS DA REGIÃO</span>
          </button>

          <div style="
            text-align: center;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            font-size: 10px;
            color: #9ca3af;
          ">
            Clique no marcador para mais detalhes • BloomWatch Brasil 🇧🇷
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 340,
        className: 'custom-popup-v2',
        closeButton: true,
        autoPan: true,
        autoPanPadding: [50, 50]
      });

      marker.on('click', () => {
        onRegionClick(region.id);
        marker.openPopup();
      });

      // Hover effects
      marker.on('mouseover', function() {
        if (!isSelected) {
          this.setStyle({
            fillOpacity: 1,
            radius: 16,
            weight: 3
          });
        }
      });

      marker.on('mouseout', function() {
        if (!isSelected) {
          this.setStyle({
            fillOpacity: 0.85,
            radius: 14,
            weight: 2
          });
        }
      });

      markers.set(region.id, marker);
    });

    // Setup window callback
    window.selectRegionV2 = (id) => {
      onRegionClick(id);
    };

    return () => {
      markers.forEach(marker => marker.remove());
      markers.clear();
      delete window.selectRegionV2;
    };
  }, [regions, onRegionClick, selectedRegionId]);

  // Fly to selected region
  useEffect(() => {
    if (mapRef.current && selectedRegionId) {
      const selectedRegion = regions.find(r => r.id === selectedRegionId);
      if (selectedRegion) {
        mapRef.current.flyTo(
          [selectedRegion.latitude, selectedRegion.longitude],
          8,
          { duration: 1.5 }
        );
      }
    }
  }, [selectedRegionId, regions]);

  // Change map style
  const changeMapStyle = (style) => {
    if (!mapRef.current) return;

    // Remove existing tile layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Add new tile layer based on style
    let tileUrl = '';
    let attribution = '';

    switch (style) {
      case 'satellite':
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = '© Esri';
        break;
      case 'terrain':
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        attribution = '© OpenTopoMap contributors';
        break;
      default:
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        attribution = '© OpenStreetMap contributors';
    }

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
      minZoom: 3,
    }).addTo(mapRef.current);

    setMapStyle(style);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      {/* Map Container */}
      <div
        id="map-v2"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      />

      {/* Map Controls Overlay */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Style Selector */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '4px'
        }}>
          <button
            onClick={() => changeMapStyle('streets')}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              background: mapStyle === 'streets' ? '#059669' : '#f3f4f6',
              color: mapStyle === 'streets' ? 'white' : '#374151',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Mapa de Ruas"
          >
            🗺️ Ruas
          </button>
          <button
            onClick={() => changeMapStyle('satellite')}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              background: mapStyle === 'satellite' ? '#059669' : '#f3f4f6',
              color: mapStyle === 'satellite' ? 'white' : '#374151',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Visão Satélite"
          >
            🛰️ Satélite
          </button>
          <button
            onClick={() => changeMapStyle('terrain')}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              background: mapStyle === 'terrain' ? '#059669' : '#f3f4f6',
              color: mapStyle === 'terrain' ? 'white' : '#374151',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Terreno/Relevo"
          >
            ⛰️ Relevo
          </button>
        </div>

        {/* Info Box */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxWidth: '200px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#059669', marginBottom: '6px' }}>
            📊 Estatísticas do Mapa
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.5' }}>
            <div>🗺️ {regions.length} regiões monitoradas</div>
            <div>🌺 Biodiversidade em tempo real</div>
            <div>📍 Clique nos marcadores</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '16px',
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
          minWidth: '220px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <strong style={{ fontSize: '14px', color: '#111827' }}>
              🎨 Legenda - Biodiversidade
            </strong>
            <button
              onClick={() => setShowLegend(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '0',
                opacity: 0.6
              }}
              title="Fechar legenda"
            >
              ✕
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { color: '#065f46', label: '≥ 9.5 - Excepcional' },
              { color: '#059669', label: '≥ 9.0 - Muito Alta' },
              { color: '#10b981', label: '≥ 8.5 - Alta' },
              { color: '#34d399', label: '≥ 8.0 - Boa' },
              { color: '#6ee7b7', label: '≥ 7.5 - Moderada' },
              { color: '#a7f3d0', label: '< 7.5 - Regular' }
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
                <span style={{ fontSize: '12px', color: '#374151' }}>{label}</span>
              </div>
            ))}
            <div style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#dc2626',
                border: '2px solid white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
              <span style={{ fontSize: '12px', color: '#374151', fontWeight: '600' }}>
                Região Selecionada
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Show Legend Button (when hidden) */}
      {!showLegend && (
        <button
          onClick={() => setShowLegend(true)}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '16px',
            background: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            color: '#059669',
            zIndex: 1000,
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🎨 Mostrar Legenda
        </button>
      )}

      {/* CSS for custom popup */}
      <style>{`
        .custom-popup-v2 .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        .custom-popup-v2 .leaflet-popup-content {
          margin: 12px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .custom-popup-v2 .leaflet-popup-tip-container {
          display: none;
        }
      `}</style>
    </div>
  );
}
