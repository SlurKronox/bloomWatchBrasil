export default function PlantCard({ planta }) {
  const getStatusIcon = () => {
    if (planta.status === 'florindo') return '🟢';
    if (planta.status === 'previsao') return '🟡';
    return '🔴';
  };

  const getStatusText = () => {
    if (planta.status === 'florindo') return 'Florindo AGORA';
    if (planta.status === 'previsao') {
      if (planta.dias_para_florada === 1) return `Previsão: ${planta.dias_para_florada} dia`;
      return `Previsão: ${planta.dias_para_florada} dias`;
    }
    if (planta.dias_para_florada > 30) return `Não florindo (${planta.dias_para_florada} dias)`;
    return 'Não florindo';
  };

  const getStatusColor = () => {
    if (planta.status === 'florindo') return '#2d5016';
    if (planta.status === 'previsao') return '#856404';
    return '#721c24';
  };

  const getProgressText = () => {
    if (planta.status === 'florindo') return '100% - Floração completa';
    if (planta.progresso >= 80) return `${planta.progresso}% - Próximo à floração`;
    if (planta.progresso >= 50) return `${planta.progresso}% - Em desenvolvimento`;
    return `${planta.progresso}% - Início do ciclo`;
  };

  return (
    <div className="plant-card">
      <div className="plant-header">
        <div className="flower-icon">{planta.cor}</div>
        <div className="status-indicator">
          <span className="status-icon">{getStatusIcon()}</span>
        </div>
      </div>

      <div className="plant-names">
        <h3 className="plant-name">{planta.nome}</h3>
        <p className="plant-scientific">{planta.nome_cientifico}</p>
      </div>

      <div className="status-badge" style={{ backgroundColor: getStatusColor() }}>
        {getStatusText()}
      </div>

      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${planta.progresso}%`,
              backgroundColor: planta.status === 'florindo' ? '#2d5016' :
                             planta.status === 'previsao' ? '#856404' : '#721c24'
            }}
          />
        </div>
        <span className="progress-text">{getProgressText()}</span>
      </div>

      <p className="plant-description">{planta.descricao}</p>

      {planta.status === 'florindo' && (
        <div className="flowering-badge">
          <span className="pulse-dot"></span>
          Período ideal para apicultura
        </div>
      )}
    </div>
  );
}